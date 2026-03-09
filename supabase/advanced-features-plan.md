### Future Supabase features for ReactOne

- **Storage**
  - Use Supabase Storage for user avatars and any uploaded assets.
  - Store public URLs in the `profiles.avatar_url` column.
  - In React, render avatars from `avatar_url` with fallbacks when not set.

- **Realtime**
  - For collaborative or live experiences (e.g., GenCodeLab activity), subscribe to channel updates using `supabase.channel(...)`.
  - Maintain a lightweight `activity` table and broadcast inserts to connected clients.

- **Edge Functions**
  - For small, self-contained server tasks (e.g., webhook handlers, small transformations), move logic from Express routes into Supabase Edge Functions.
  - Call them from the client using the Supabase client or from Express as needed.

- **Analytics**
  - Create Postgres views for high-level product metrics (e.g., daily active users, completion rates).
  - Use Supabase dashboard or external BI tool to visualize those views.

