import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=sso_missing_code", request.url));
  }

  try {
    const clientId = process.env.NEXT_PUBLIC_MERIPEHCHAAN_CLIENT_ID;
    const clientSecret = process.env.MERIPEHCHAAN_CLIENT_SECRET;
    const tokenUrl = process.env.MERIPEHCHAAN_TOKEN_URL;
    const redirectUri = process.env.NEXT_PUBLIC_MERIPEHCHAAN_REDIRECT_URI;

    if (!clientId || !clientSecret || !tokenUrl || !redirectUri) {
      console.error("SSO callback configuration error: Missing environment variables.");
      return NextResponse.redirect(new URL("/login?error=sso_configuration_error", request.url));
    }

    // Live OIDC/OAuth2 Token Exchange
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SSO token exchange failed:", errorText);
      return NextResponse.redirect(new URL("/login?error=sso_token_exchange_failed", request.url));
    }

    const tokenData = await response.json();
    const idToken = tokenData.id_token;
    let email = "";
    let name = "";
    let org = "";

    if (idToken) {
      // Decode ID Token JWT payload
      const parts = idToken.split(".");
      if (parts.length === 3) {
        const payload = Buffer.from(parts[1], "base64").toString("utf-8");
        const parsedPayload = JSON.parse(payload);
        email = parsedPayload.email || parsedPayload.sub || "";
        name = parsedPayload.name || parsedPayload.preferred_username || "";
        org = parsedPayload.org || "";
      }
    }

    // If email wasn't found in id_token, try userinfo endpoint
    if (!email && tokenData.access_token) {
      const userinfoUrl = process.env.MERIPEHCHAAN_USERINFO_URL;
      if (userinfoUrl) {
        const userinfoRes = await fetch(userinfoUrl, {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        });
        if (userinfoRes.ok) {
          const userinfo = await userinfoRes.json();
          email = userinfo.email || userinfo.sub || "";
          name = userinfo.name || userinfo.preferred_username || "";
          org = userinfo.org || "";
        }
      }
    }

    if (!email) {
      return NextResponse.redirect(new URL("/login?error=sso_profile_failed", request.url));
    }

    // Route mapping based on email domain
    const isOfficial = email.endsWith(".gov.in");
    const sessionData = {
      role: isOfficial ? "official" : "institution",
      email,
      name: name || "SSO User",
      org,
    };

    // Redirect to frontend to save session to localStorage and finalize login
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("sso_session", JSON.stringify(sessionData));
    
    // Set response redirect
    const res = NextResponse.redirect(redirectUrl);

    // Also write cookie so middleware handles page guards instantly
    res.cookies.set("ncie_demo_session", JSON.stringify(sessionData), {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (error) {
    console.error("SSO callback processing error:", error);
    return NextResponse.redirect(new URL("/login?error=sso_callback_error", request.url));
  }
}
