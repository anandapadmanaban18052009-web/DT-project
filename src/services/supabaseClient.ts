import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Read environment variables (Vite exposes VITE_* through import.meta.env)
const metaEnv = (import.meta as any).env || {};
const supabaseUrl = (metaEnv.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (metaEnv.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project-id') &&
    supabaseAnonKey.length > 20 &&
    !supabaseAnonKey.includes('your-anon-key')
  );
};

export const getSupabaseConfigStatus = () => {
  return {
    isConfigured: isSupabaseConfigured(),
    hasUrl: Boolean(supabaseUrl),
    hasAnonKey: Boolean(supabaseAnonKey),
    urlPreview: supabaseUrl ? supabaseUrl.replace(/https:\/\/(.{4}).*(\..*)/, 'https://$1***$2') : 'Missing',
  };
};

// Singleton Supabase Client
export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: window.localStorage
      }
    })
  : null;
