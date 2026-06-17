import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

/**
 * useAuthGuard — call this at the top of any protected page component.
 * Supports both:
 *  1. Real Supabase sessions (OTP login)
 *  2. Demo sessions (stored in localStorage as "ncie_demo_session")
 * Redirects to /login if neither is found.
 */
export function useAuthGuard() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [demoSession, setDemoSession] = useState<{ email: string; role: string; name?: string; org?: string; } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check for demo session first (instant, no network)
    try {
      const raw = localStorage.getItem("ncie_demo_session");
      if (raw) {
        const parsed = JSON.parse(raw);
        setDemoSession(parsed);
        setLoading(false);
        return; // demo session is valid — no need to check Supabase
      }
    } catch {
      localStorage.removeItem("ncie_demo_session");
    }

    // 2. Check real Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/login");
      } else {
        setSession(session);
        const email = session.user.email || "";
        const isOfficial = email.endsWith(".gov.in");
        const pathname = window.location.pathname;
        if (isOfficial && pathname.startsWith("/dashboard/institution")) {
          router.replace("/dashboard/official");
        } else if (!isOfficial && pathname.startsWith("/dashboard/official")) {
          router.replace("/dashboard/institution");
        }
      }
      setLoading(false);
    });

    // 3. Subscribe to auth state changes (logout / token refresh)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      // Don't redirect if demo session is active
      const demoRaw = localStorage.getItem("ncie_demo_session");
      if (demoRaw) return;

      if (!session) {
        router.replace("/login");
      } else {
        setSession(session);
        const email = session.user.email || "";
        const isOfficial = email.endsWith(".gov.in");
        const pathname = window.location.pathname;
        if (isOfficial && pathname.startsWith("/dashboard/institution")) {
          router.replace("/dashboard/official");
        } else if (!isOfficial && pathname.startsWith("/dashboard/official")) {
          router.replace("/dashboard/institution");
        }
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  return { session, demoSession, loading };
}
