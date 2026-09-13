import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

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
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Verify webhook signature if secret is configured
    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      if (expectedSignature !== signature) {
        console.warn("[RAZORPAY_WEBHOOK] Invalid webhook signature received.");
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;

    console.log(`[RAZORPAY_WEBHOOK] Received event: ${event}`);

    if (event === "payment.captured" || event === "order.paid") {
      const payment = payload.payload?.payment?.entity;
      if (!payment) {
        return NextResponse.json({ error: "No payment entity found" }, { status: 400 });
      }

      const paymentId = payment.id;
      const notes = payment.notes || {};
      const regId = notes.reg_id || notes.regId;
      const email = (payment.email || notes.email || "").toLowerCase();
      const course = notes.course || "Viksit Bharat @2047 Innovation Leadership Programme";

      const supabase = getSupabase();

      // Find matching registration
      let query = supabase.from("registrations").select("*");
      if (regId) {
        query = query.eq("reg_id", regId);
      } else if (email) {
        query = query.ilike("email", email);
      } else {
        console.warn("[RAZORPAY_WEBHOOK] Neither reg_id nor email found in payment entity.");
        return NextResponse.json({ status: "skipped_no_identifiers" });
      }

      const { data: records, error: fetchErr } = await query;
      if (fetchErr) {
        console.error("[RAZORPAY_WEBHOOK] DB fetch error:", fetchErr);
        return NextResponse.json({ error: fetchErr.message }, { status: 500 });
      }

      if (records && records.length > 0) {
        const rec = records[0];
        const existingProposal = rec.proposal || "";
        
        // If payment ID is not yet attached
        if (!existingProposal.includes(paymentId)) {
          let updatedProposal = existingProposal;
          if (existingProposal.includes("Payment ID:")) {
            updatedProposal = existingProposal.replace(/Payment ID:\s*[^|]+/i, `Payment ID: ${paymentId}`);
          } else {
            updatedProposal = `Payment ID: ${paymentId} | ${existingProposal}`;
          }

          const { error: updateErr } = await supabase
            .from("registrations")
            .update({
              proposal: updatedProposal,
              status: rec.status === "approved" ? "approved" : "pending",
              submitted_at: rec.submitted_at || new Date().toISOString(),
            })
            .eq("id", rec.id);

          if (updateErr) {
            console.error("[RAZORPAY_WEBHOOK] Error updating record:", updateErr);
          } else {
            console.log(`[RAZORPAY_WEBHOOK] Successfully synced payment ${paymentId} to reg ${rec.reg_id}`);
          }
        }
      } else {
        console.log(`[RAZORPAY_WEBHOOK] No registration found matching regId=${regId} or email=${email}`);
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (err: any) {
    console.error("[RAZORPAY_WEBHOOK] Error processing webhook:", err);
    return NextResponse.json({ error: err?.message || "Webhook processing error" }, { status: 500 });
  }
}
