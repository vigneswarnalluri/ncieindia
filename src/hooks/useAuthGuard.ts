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
    // 1. Check local demo session first
    if (typeof window !== "undefined") {
      const localDemo = localStorage.getItem("ncie_demo_session");
      if (localDemo) {
        try {
          const parsed = JSON.parse(localDemo);
          setDemoSession(parsed);
          setLoading(false);
          return;
        } catch (e) {
          console.warn("Invalid demo session in localStorage", e);
        }
      }
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

    // Subscribe to auth state changes (logout / token refresh)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (typeof window !== "undefined" && localStorage.getItem("ncie_demo_session")) {
        return;
      }
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
