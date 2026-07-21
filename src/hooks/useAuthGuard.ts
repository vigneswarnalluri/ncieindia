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
    let isMounted = true;

    const handleRoleVerification = (email: string, sessionRole?: string) => {
      const emailLower = email.toLowerCase();
      const isOfficial = ALLOWED_OFFICIAL_EMAILS.some(e => e.toLowerCase() === emailLower);
      const isInstitution = ALLOWED_INSTITUTION_EMAILS.some(e => e.toLowerCase() === emailLower);
      const pathname = typeof window !== "undefined" ? window.location.pathname : "";

      if (!isOfficial && !isInstitution) {
        supabase.auth.signOut().then(() => {
          localStorage.removeItem("ncie_demo_session");
          document.cookie = "ncie_demo_session=; path=/; max-age=0";
          if (isMounted) router.replace("/login");
        });
        return false;
      }

      // If user is currently on official dashboard, allow if they are an official
      if (pathname.startsWith("/dashboard/official")) {
        if (!isOfficial) {
          if (isMounted) router.replace("/dashboard/institution");
          return false;
        }
        return true;
      }

      // If user is currently on institution dashboard, allow if they are an institution
      if (pathname.startsWith("/dashboard/institution")) {
        if (!isInstitution) {
          if (isMounted) router.replace("/dashboard/official");
          return false;
        }
        return true;
      }

      // Default redirect if on generic /dashboard path
      if (sessionRole === "institution" && isInstitution) {
        if (isMounted) router.replace("/dashboard/institution");
        return false;
      } else if (sessionRole === "official" && isOfficial) {
        if (isMounted) router.replace("/dashboard/official");
        return false;
      } else if (isOfficial) {
        if (isMounted) router.replace("/dashboard/official");
        return false;
      } else if (isInstitution) {
        if (isMounted) router.replace("/dashboard/institution");
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
          if (handleRoleVerification(email, parsed.role)) {
            if (isMounted) {
              setDemoSession(parsed);
              setLoading(false);
            }
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
      if (!isMounted) return;
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
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;
      if (typeof window !== "undefined" && localStorage.getItem("ncie_demo_session")) {
        return;
      }

      // Avoid premature redirect on INITIAL_SESSION event while getSession() is handling initial auth check
      if (event === "INITIAL_SESSION") {
        if (session) {
          setSession(session);
          handleRoleVerification(session.user.email || "");
          setLoading(false);
        }
        return;
      }

      if (event === "SIGNED_OUT" || !session) {
        router.replace("/login");
      } else if (session) {
        setSession(session);
        handleRoleVerification(session.user.email || "");
      }
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [router]);

  return { session, demoSession, loading };
}
