import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * proxy.ts — Next.js 16 route guard.
 * Protects /dashboard/* routes.
 * Allows access if:
 *  1. A real Supabase auth token cookie is present (sb-*-auth-token), OR
 *  2. A demo session cookie is present (ncie_demo_session) — for testing.
 * Full JWT verification is done client-side by useAuthGuard.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard dashboard routes
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const allCookies = request.cookies.getAll();

  // Check for real Supabase auth cookie
  const hasSupabaseCookie = allCookies.some(
    (c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token")
  );

  // Check for demo session cookie (set by handleDemoLogin via document.cookie)
  const hasDemoCookie = allCookies.some((c) => c.name === "ncie_demo_session");

  if (!hasSupabaseCookie && !hasDemoCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirected", "1");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
