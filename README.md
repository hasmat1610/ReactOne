# ReactOne 🚀

ReactOne is a modern, full-stack learning and documentation platform for React developers. Built with high-performance animations and a developer-first approach, it serves as both a reference and a sandbox for modern web technologies.

---

## 🛠 Tech Stack

### Frontend (`/client`)
- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** **Strict TypeScript** (100% TS/TSX coverage)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)
- **State Management:** [TanStack Query v5](https://tanstack.com/query/latest) & [Zustand](https://zustand-demo.pmnd.rs/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Components:** Radix UI, Lucide Icons, and custom Glassmorphic elements.
- **Visuals:** [Spline](https://spline.design/), Canvas-based Aurora, and Sparkles effects.

### Backend (`/server` & `/supabase`)
- **Runtime:** [Node.js](https://nodejs.org/) (v20+) + Express (TypeScript)
- **Edge Functions:** [Supabase Edge Functions](https://supabase.com/docs/guides/functions) (Deno)
- **Email Service:** [Resend](https://resend.com/) for transactional emails.
- **Auth:** Google OAuth 2.0 & Custom flow via Edge Functions.
- **Database:** [Supabase (PostgreSQL)](https://supabase.com/) with RLS.

---

## ✨ Features & Modules

### 📚 Learning Guides
Interactive documentation with live code snippets and best practices:
- **State Management:** Deep dives into **Zustand**, **Redux Toolkit**, and **React Context**.
- **Data Fetching:** Comprehensive guides for **TanStack Query** and **Axios**.
- **Form Handling:** Master **React Hook Form** and **Formik** with **Zod** validation.

### 🤖 AI & Special Tools

- **Figma MCP:** Documentation and strategies for the Figma to React pipeline.
- **Stitch Mentor:** Specialized guide for advanced code stitching and component architecture.

### � Advanced Authentication
- **Custom Flow:** Registration and login handled via Supabase Edge Functions.
- **Email Verification:** Robust transactional email system using Resend.
- **OAuth:** One-click login with Google.

---

## 📂 Project Structure

```text
ReactOne/
├── client/              # Vite + React (Strict TypeScript)
│   ├── src/
│   │   ├── api/         # Axios instance & API hooks
│   │   ├── components/  # Atomic UI & Landing fragments
│   │   ├── context/     # Auth & Theme providers
│   │   ├── constants/   # Configuration & Snippets
│   │   ├── lib/         # Third-party initializations (Supabase, etc.)
│   │   └── pages/       # 25+ Feature-rich pages
├── server/              # Express API (TypeScript)
│   ├── routes/          # Typed Express routers
│   ├── controllers/     # Handlers for CRM & App logic
│   └── middleware/      # Auth guards & security
└── supabase/            # Managed Backend
    ├── functions/       # Edge Functions (resend-signup, etc.)
    └── schema.sql       # SQL Migrations & Policies
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v20+)
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- [Resend Account](https://resend.com/)

### 1. Installation
```bash
# Clone and install dependencies
git clone https://github.com/hasmat1610/ReactOne.git
cd ReactOne
npm install # in both client and server
```

### 2. Environment Variables
Ensure the following files are created based on the `.example` templates:
- `client/.env`
- `server/.env`

#### Key Variables:
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY`
- `RESEND_API_KEY` (Set in Supabase Secrets)
- `CLIENT_ID` / `CLIENT_SECRET` (Google Console)

---

## 📄 License
This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

