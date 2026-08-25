import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_key";

/**
 * Creates an isolated Supabase client with a dedicated storageKey in localStorage.
 * This prevents auth state / tokens from clashing across different portals
 * (Admin, Business, Darkstore, Promoter) open in multiple browser tabs or windows.
 */
function createPortalSupabaseClient(storageKey: string) {
  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      storageKey,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

// 1. Admin Console Portal (/admin/*)
export const adminSupabase = createPortalSupabaseClient("riksho_admin_auth_token");

// 2. B2B Corporate / Business Portal (/business/*)
export const businessSupabase = createPortalSupabaseClient("riksho_business_auth_token");

// 3. Darkstore / Store Ops Portal (/darkstore/*)
export const darkstoreSupabase = createPortalSupabaseClient("riksho_darkstore_auth_token");

// 4. Brand Promoter Portal (/refer-earn/*)
export const promoterSupabase = createPortalSupabaseClient("riksho_promoter_auth_token");

// Default export (defaults to adminSupabase for existing admin modules)
export const supabaseAdminClient = adminSupabase;
