import { createClient } from "@supabase/supabase-js";
import storageUrls from "@/data/storageUrls.json";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "placeholder-key";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
  console.warn(
    "Warning: Missing Supabase environment variables. Using placeholder values for build-time compatibility."
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

// Utility to resolve local assets to Supabase Storage public URLs
export function getStorageUrl(pathOrUrl: string | undefined | null): string {
  if (!pathOrUrl) return "/Circular_Guidelines_2026.pdf";
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  
  // Extract filename
  const filename = pathOrUrl.split("/").pop() || "";
  
  // Try loading storageUrls mapping
  try {
    const mappedUrl = (storageUrls as Record<string, string>)[filename];
    if (mappedUrl) {
      return mappedUrl;
    }
    const cleanFilename = filename.replace(/\s+/g, '_');
    const cleanMappedUrl = (storageUrls as Record<string, string>)[cleanFilename];
    if (cleanMappedUrl) {
      return cleanMappedUrl;
    }
  } catch (e) {
    console.warn("Failed to load storage mapping", e);
  }
  
  return pathOrUrl;
}


