import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase configuration. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in your environment variables."
  );
}

/**
 * Cookie-based storage adapter for Supabase auth.
 * By default, @supabase/supabase-js stores sessions in localStorage.
 * The Next.js middleware (proxy.ts) runs server-side and can ONLY read cookies,
 * not localStorage. This adapter writes the session token as a cookie so the
 * middleware can see it and allow access to /dashboard/* routes.
 */
const COOKIE_KEY = "sb-ssbrskimmwetnuydduaa-auth-token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const cookieStorage = {
  getItem: (key: string): string | null => {
    if (typeof document === "undefined") return null;
    const match = document.cookie.split("; ").find((row) => row.startsWith(`${key}=`));
    return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
  },
  setItem: (key: string, value: string): void => {
    if (typeof document === "undefined") return;
    document.cookie = `${key}=${encodeURIComponent(value)}; path=/; SameSite=Lax; max-age=${COOKIE_MAX_AGE}`;
  },
  removeItem: (key: string): void => {
    if (typeof document === "undefined") return;
    document.cookie = `${key}=; path=/; max-age=0`;
  },
};

// Singleton Supabase browser client — session stored in cookie for SSR middleware compatibility
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: cookieStorage,
    storageKey: COOKIE_KEY,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

