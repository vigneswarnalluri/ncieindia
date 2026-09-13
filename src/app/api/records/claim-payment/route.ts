import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";

function getSupabase() {
  return createClient(supabaseUrl, supabaseKey);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      paymentId,
      regId,
      fullName,
      mobile,
      orgName,
      course,
      sop,
      department,
      regNumber,
    } = body;

    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanPaymentId = (paymentId || "").trim();

    if (!cleanPaymentId) {
      return NextResponse.json(
        { success: false, error: "Razorpay Payment ID is required (e.g. pay_...)" },
        { status: 400 }
      );
    }

    if (!cleanPaymentId.startsWith("pay_") && cleanPaymentId.length < 8) {
      return NextResponse.json(
        { success: false, error: "Invalid Razorpay Payment ID format." },
        { status: 400 }
      );
    }

    if (!cleanEmail) {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      );
    }

    const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_SECRET;

    if (!razorpayKeyId || !razorpayKeySecret) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Live Gateway Verification is mandatory, but RAZORPAY_KEY_SECRET is not configured on the server. Please configure RAZORPAY_KEY_SECRET in .env.local to enable live verification.",
        },
        { status: 500 }
      );
    }

    // Mandatory Live Gateway Verification via Razorpay REST API
    let rzpPaymentData: any = null;
    try {
      const authHeader = "Basic " + Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString("base64");
      const rzpRes = await fetch(`https://api.razorpay.com/v1/payments/${cleanPaymentId}`, {
        method: "GET",
        headers: { Authorization: authHeader },
      });

      if (!rzpRes.ok) {
        if (rzpRes.status === 404) {
          return NextResponse.json(
            { success: false, error: "Payment ID not found on Razorpay. Please verify your transaction ID." },
            { status: 400 }
          );
        }
        const errData = await rzpRes.json().catch(() => ({}));
        return NextResponse.json(
          {
            success: false,
            error: errData.error?.description || "Failed to verify transaction with Razorpay Gateway.",
          },
          { status: 400 }
        );
      }

      rzpPaymentData = await rzpRes.json();
    } catch (gateErr: any) {
      return NextResponse.json(
        { success: false, error: `Razorpay Gateway connection error: ${gateErr.message}` },
        { status: 502 }
      );
    }

    // 1. Verify Payment Status
    if (rzpPaymentData.status !== "captured" && rzpPaymentData.status !== "authorized") {
      return NextResponse.json(
        {
          success: false,
          error: `Payment verification failed: Transaction status on Razorpay is "${rzpPaymentData.status}" (must be "captured").`,
        },
        { status: 400 }
      );
    }

    // 2. Verify Amount (₹700 / 70000 paise)
    if (rzpPaymentData.amount < 70000) {
      return NextResponse.json(
        {
          success: false,
          error: `Payment verification failed: Amount paid is ₹${(rzpPaymentData.amount / 100).toFixed(
            2
          )}, but the required course fee is ₹700.00.`,
        },
        { status: 400 }
      );
    }

    // 3. Verify Currency
    if (rzpPaymentData.currency !== "INR") {
      return NextResponse.json(
        {
          success: false,
          error: `Payment verification failed: Currency is ${rzpPaymentData.currency} instead of INR.`,
        },
        { status: 400 }
      );
    }

    // 4. Verify Payer Email Match
    const rzpEmail = (rzpPaymentData.email || "").toLowerCase().trim();
    if (rzpEmail && cleanEmail && rzpEmail !== cleanEmail) {
      const notesEmail = (rzpPaymentData.notes?.email || "").toLowerCase().trim();
      if (notesEmail && notesEmail !== cleanEmail) {
        return NextResponse.json(
          {
            success: false,
            error: `Payment verification mismatch: This payment ID is associated with "${rzpEmail}" on Razorpay. Please enter the email address used during payment.`,
          },
          { status: 400 }
        );
      }
    }

    const supabase = getSupabase();

    // 0. Anti-fraud check: Prevent duplicate claims by other students
    const { data: duplicateCheck } = await supabase
      .from("registrations")
      .select("id, reg_id, email, full_name, proposal")
      .ilike("proposal", `%${cleanPaymentId}%`);

    if (duplicateCheck && duplicateCheck.length > 0) {
      const alreadyClaimed = duplicateCheck.find(
        (r) => r.email && r.email.toLowerCase() !== cleanEmail
      );
      if (alreadyClaimed) {
        return NextResponse.json(
          {
            success: false,
            error: `This Payment ID has already been claimed for registration ${alreadyClaimed.reg_id}.`,
          },
          { status: 400 }
        );
      }
    }

    // 1. Check if record exists by regId or email
    let query = supabase.from("registrations").select("*");
    if (regId && regId.trim()) {
      query = query.eq("reg_id", regId.trim());
    } else {
      query = query.ilike("email", cleanEmail);
    }

    const { data: existingRecords, error: fetchErr } = await query;
    if (fetchErr) {
      return NextResponse.json(
        { success: false, error: `Database query failed: ${fetchErr.message}` },
        { status: 500 }
      );
    }

    let targetRecord = existingRecords && existingRecords.length > 0 ? existingRecords[0] : null;

    if (targetRecord) {
      // Update existing record
      let existingProposal = targetRecord.proposal || "";
      let courseName = course;
      let existingSop = sop;

      if (!courseName) {
        const courseMatch = existingProposal.match(/Course:\s*([^|\n]+)/i);
        if (courseMatch) courseName = courseMatch[1].trim();
      }

      if (!existingSop) {
        const sopMatch = existingProposal.match(/SOP:\s*([\s\S]+)$/i);
        if (sopMatch) existingSop = sopMatch[1].trim();
        else existingSop = existingProposal;
      }

      const updatedProposal = `Payment ID: ${cleanPaymentId} | Course: ${
        courseName || "Viksit Bharat @2047 Innovation Leadership Programme"
      } | SOP: ${existingSop || ""}`;

      const updatePayload: any = {
        proposal: updatedProposal,
        status: targetRecord.status === "approved" ? "approved" : "pending",
        submitted_at: targetRecord.submitted_at || new Date().toISOString(),
      };

      const verifiedPhone = (mobile || rzpPaymentData?.contact || "").replace(/^\+91/, "").trim();

      if (fullName && !targetRecord.full_name) updatePayload.full_name = fullName.trim();
      if (verifiedPhone && !targetRecord.mobile) updatePayload.mobile = verifiedPhone;
      if (orgName && !targetRecord.org_name) updatePayload.org_name = orgName.trim();
      if (regNumber && !targetRecord.reg_number) updatePayload.reg_number = regNumber.trim();

      const { error: updateErr } = await supabase
        .from("registrations")
        .update(updatePayload)
        .eq("id", targetRecord.id);

      if (updateErr) {
        return NextResponse.json(
          { success: false, error: `Failed to update record: ${updateErr.message}` },
          { status: 500 }
        );
      }

      // Trigger confirmation email
      try {
        const origin = req.nextUrl.origin || "https://ncieindia.org";
        await fetch(`${origin}/api/send-confirmation-letter`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: targetRecord.email,
            fullName: targetRecord.full_name || fullName || "Student",
            regId: targetRecord.reg_id,
            course: courseName || "Viksit Bharat @2047 Innovation Leadership Programme",
            orgName: targetRecord.org_name || orgName || "Institution",
            paymentId: cleanPaymentId,
            date: new Date().toISOString(),
          }),
        });
      } catch (mailErr) {
        console.warn("Could not dispatch confirmation email in claim-payment:", mailErr);
      }

      return NextResponse.json({
        success: true,
        action: "updated",
        regId: targetRecord.reg_id,
        fullName: targetRecord.full_name || fullName,
        email: targetRecord.email,
        course: courseName,
        message: "Payment successfully linked to your existing registration.",
      });
    } else {
      // No existing record found. If sufficient details are provided, create one now!
      const effectiveFullName = fullName || rzpPaymentData?.notes?.fullName || "";
      const effectiveOrgName = orgName || rzpPaymentData?.notes?.orgName || "";
      const effectiveMobile = (mobile || rzpPaymentData?.contact || "").replace(/^\+91/, "").trim();

      if (!effectiveFullName || !effectiveOrgName) {
        return NextResponse.json({
          success: false,
          notFound: true,
          message:
            "No prior registration was found with this email. Please provide your Full Name and College to finalize your registration.",
        });
      }

      const generatedId = `REG-2026-${Math.floor(Math.random() * 9000) + 1000}`;
      const courseName = course || rzpPaymentData?.notes?.course || "Viksit Bharat @2047 Innovation Leadership Programme";
      const finalProposal = `Payment ID: ${cleanPaymentId} | Course: ${courseName} | SOP: ${
        sop || "Self-verified payment registration"
      }`;

      const { error: insertErr } = await supabase.from("registrations").insert([
        {
          reg_id: generatedId,
          role: "internship",
          full_name: effectiveFullName.trim(),
          email: cleanEmail,
          org_name: effectiveOrgName.trim(),
          proposal: finalProposal,
          designation: "Student",
          mobile: effectiveMobile,
          department: department ? department.trim() : "Computer Science & Engineering",
          reg_number: regNumber ? regNumber.trim() : "",
          website_url: JSON.stringify({ consentForm: null, idCard: null, proposalRoster: null }),
          status: "pending",
          submitted_at: new Date().toISOString(),
        },
      ]);

      if (insertErr) {
        return NextResponse.json(
          { success: false, error: `Failed to create registration: ${insertErr.message}` },
          { status: 500 }
        );
      }

      // Trigger confirmation email
      try {
        const origin = req.nextUrl.origin || "https://ncieindia.org";
        await fetch(`${origin}/api/send-confirmation-letter`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: cleanEmail,
            fullName: fullName.trim(),
            regId: generatedId,
            course: courseName,
            orgName: orgName.trim(),
            paymentId: cleanPaymentId,
            date: new Date().toISOString(),
          }),
        });
      } catch (mailErr) {
        console.warn("Could not dispatch confirmation email in claim-payment:", mailErr);
      }

      return NextResponse.json({
        success: true,
        action: "created",
        regId: generatedId,
        fullName: fullName.trim(),
        email: cleanEmail,
        course: courseName,
        message: "New registration created and payment linked successfully.",
      });
    }
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
