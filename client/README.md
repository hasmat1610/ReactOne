# ReactOne Frontend 🎨

The ReactOne frontend is a high-performance, strictly typed React application built with **Vite** and **React 19**. It serves as an interactive documentation hub and learning platform.

## 🚀 Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Environment Setup:**
    Create a `.env` file in this directory with the following variables:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
    VITE_AUTH_API_KEY=your_internal_api_key
    ```
3.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## 🏗 Key Components & Pages

### Authentication
- `Signup.tsx` & `Login.tsx`: Custom flows powered by Supabase Edge Functions.
- `Profile.tsx`: User dashboard with learning progress tracking and email resend capabilities.

### Learning Guides (25+ Pages)
- **State Management:** `ZustandGuide.tsx`, `ReduxToolkit.tsx`.
- **Forms:** `ReactHookFormGuide.tsx`, `FormikGuide.tsx`.
- **Queries:** `ReactQueryGuide.tsx`, `TanStackQuery.tsx`.
- **Backend:** `AxiosReact.tsx`, `SupabaseGuide.tsx`.

### Advanced Labs
- `GenCodeLab.tsx`: AI-powered code generation interface.
- `FigmaMCP.tsx`: Guide for Design-to-Code automation.

## 🛠 Tech Stack Details
- **Styling:** Tailwind CSS v4 with custom glassmorphism utilities.
- **Animations:** Framer Motion for smooth transitions and Lucide for iconography.
- **Type Safety:** 100% TypeScript coverage with strict mode enabled in `tsconfig.json`.
