import dns from "node:dns";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

try {
  dns.setDefaultResultOrder("ipv4first");
} catch {
  // Ignore in environments where dns configuration is unsupported
}

let cachedPublicClient: SupabaseClient | null = null;

export function createPublicClient(): SupabaseClient {
  if (cachedPublicClient) return cachedPublicClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment variables"
    );
  }

  cachedPublicClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      fetch: (url, options?: RequestInit) => {
        return fetch(url, {
          ...options,
          signal: options?.signal || AbortSignal.timeout(8000),
        });
      },
    },
  });

  return cachedPublicClient;
}
