### Supabase setup for ReactOne

1. Create a project in the Supabase dashboard.
2. In **Project Settings → API**, copy:
   - `Project URL` → use as `SUPABASE_URL` / `VITE_SUPABASE_URL`
   - `anon` public key → use as `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `service_role` key → use as `SUPABASE_SERVICE_ROLE_KEY` in `server/.env` only.
3. In **Authentication → Providers**, enable:
   - Email/password (required)
   - Google (optional; you can later switch from Express Google OAuth to Supabase OAuth).
4. In the SQL editor, run [`schema.sql`](./schema.sql) to create the `profiles` table and RLS policies.
5. Ensure these env vars exist:
   - In `client/.env`:
     - `VITE_SUPABASE_URL=...`
     - `VITE_SUPABASE_PUBLISHABLE_KEY=...`
   - In `server/.env`:
     - `SUPABASE_URL=...`
     - `SUPABASE_SERVICE_ROLE_KEY=...`

