import { supabaseAdminClient } from "./supabaseAdminClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://riksho-backend.onrender.com";

/**
 * Authenticated fetch for all portal types (admin, business, store-ops).
 * Uses the current Supabase session token — the backend determines
 * the caller's role from the JWT.
 */
export async function portalFetch(endpoint: string, options: RequestInit = {}) {
  const { data: { session } } = await supabaseAdminClient.auth.getSession();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (session?.access_token) {
    headers["Authorization"] = `Bearer ${session.access_token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errMessage = `Error ${response.status}`;
    try {
      const err = await response.json();
      errMessage = err.message || err.error || errMessage;
    } catch (e) {
      // Ignore parse error
    }
    throw new Error(errMessage);
  }

  return response.json();
}
