### Security & testing checklist for Supabase integration

1. **Secrets**
   - Confirm `SUPABASE_SERVICE_ROLE_KEY` exists only in `server/.env` and never in `client/.env`.
   - Confirm client only uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.

2. **RLS**
   - After running `schema.sql`, in the Supabase dashboard:
     - Try selecting from `profiles` as an authenticated user and verify you only see your own row.
     - Try updating another user’s profile and confirm it is rejected.

3. **Auth & API**
   - With the React app running:
     - Sign up and sign in with Supabase (email/password).
     - Hit `/chat` and confirm requests include `Authorization: Bearer <supabase_jwt>` and succeed.
     - Clear local storage and confirm `/chat` returns 401.

4. **Smoke page**
   - Visit the `SupabaseStatus` page in the client to confirm:
     - It can read the current Supabase user via `supabase.auth.getUser`.
     - It shows the email when signed in and “ok” status.

