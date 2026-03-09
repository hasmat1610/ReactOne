import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn('Supabase URL or anon key is missing; check your VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY env vars.')
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')

