### Data alignment between ReactOne and Supabase

- **Auth & profiles**
  - Supabase `auth.users` is the source of truth for user identity.
  - The `profiles` table (see `schema.sql`) stores UI-facing metadata: `full_name`, `avatar_url`.
  - The React auth context currently derives `name`/`picture` from `user_metadata`; you can later sync those from `profiles`.

- **Static guides & articles**
  - Content in `client/src/pages` (guides like Formik, Google Auth, etc.) can remain static React pages; no Supabase storage is required.

- **Potential future tables**
  - Saved snippets / labs results: `snippets(user_id, title, code, created_at)`.
  - Learning progress: `tutorial_progress(user_id, module_id, completed_at)`.
  - Favorite guides: `favorites(user_id, slug, created_at)`.

At this point there is no existing database to migrate, so no live migration scripts are required. New features that need persistence can add tables like the above in Supabase using the same RLS pattern as `profiles`.

