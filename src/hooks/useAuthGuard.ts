import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { ALLOWED_OFFICIAL_EMAILS, ALLOWED_INSTITUTION_EMAILS } from "@/lib/allowedEmails";

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
    const handleRoleVerification = (email: string) => {
      const isOfficial = ALLOWED_OFFICIAL_EMAILS.some(e => e.toLowerCase() === email.toLowerCase());
      const isInstitution = ALLOWED_INSTITUTION_EMAILS.some(e => e.toLowerCase() === email.toLowerCase());
      const pathname = window.location.pathname;

      if (!isOfficial && !isInstitution) {
        supabase.auth.signOut().then(() => {
          localStorage.removeItem("ncie_demo_session");
          document.cookie = "ncie_demo_session=; path=/; max-age=0";
          router.replace("/login");
        });
        return false;
      }

      if (isOfficial && pathname.startsWith("/dashboard/institution")) {
        router.replace("/dashboard/official");
        return false;
      } else if (isInstitution && pathname.startsWith("/dashboard/official")) {
        router.replace("/dashboard/institution");
        return false;
      }
      return true;
    };

    // 1. Check local demo session first
    if (typeof window !== "undefined") {
      const localDemo = localStorage.getItem("ncie_demo_session");
      if (localDemo) {
        try {
          const parsed = JSON.parse(localDemo);
          const email = parsed.email || "";
          if (handleRoleVerification(email)) {
            setDemoSession(parsed);
            setLoading(false);
            return;
          } else {
            return;
          }
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
        handleRoleVerification(email);
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
        handleRoleVerification(email);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  return { session, demoSession, loading };
}
