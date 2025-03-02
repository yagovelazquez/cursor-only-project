'use client';

import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://scudnkwivhrjdqqhfbbp.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjdWRua3dpdmhyamRxcWhmYmJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5Mzc4ODMsImV4cCI6MjA1NjUxMzg4M30.telQ6SKwbbzJiSjSZMfLafTghDlQlzfNxRv6ykTL5Ec';

// Create client with anonymous key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Hook to use Supabase client in components
export function useSupabase() {
  return supabase;
} 