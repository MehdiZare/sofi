import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      waitlist_entries: {
        Row: {
          id: string;
          clerk_user_id: string;
          email: string;
          full_name: string | null;
          referral_code: string;
          referred_by: string | null;
          referral_count: number;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          joined_at: string;
          waitlist_position: number;
        };
        Insert: {
          id?: string;
          clerk_user_id: string;
          email: string;
          full_name?: string | null;
          referral_code: string;
          referred_by?: string | null;
          referral_count?: number;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          joined_at?: string;
          waitlist_position: number;
        };
        Update: {
          id?: string;
          clerk_user_id?: string;
          email?: string;
          full_name?: string | null;
          referral_code?: string;
          referred_by?: string | null;
          referral_count?: number;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          joined_at?: string;
          waitlist_position?: number;
        };
        Relationships: [];
      };
      analytics_events: {
        Row: {
          id: string;
          event: string;
          section: string | null;
          locale: string;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          event: string;
          section?: string | null;
          locale?: string;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          event?: string;
          section?: string | null;
          locale?: string;
          metadata?: Json | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

export function createSupabasePublicClient(): SupabaseClient<Database> | null {
  const url = getEnv("NEXT_PUBLIC_SUPABASE_URL");
  const anonKey = getEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!url || !anonKey) {
    return null;
  }

  return createClient<Database>(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export function createSupabaseServiceRoleClient(): SupabaseClient<Database> | null {
  const url = getEnv("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = getEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
