# ReactOne 🚀

ReactOne is a modern, full-stack learning and documentation platform for React developers. It features a robust frontend built with React 19 and Vite, a TypeScript-powered Express backend, and seamless integration with Supabase.

---

## 🛠 Tech Stack

### Frontend (`/client`)
- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)
- **State Management:** [TanStack Query (React Query) v5](https://tanstack.com/query/latest)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Components:** [Radix UI](https://www.radix-ui.com/) + [Lucide Icons](https://lucide.dev/)
- **Animation:** Spline, Aurora, and Sparkles effects.

### Backend (`/server` & `/supabase`)
- **Runtime:** [Node.js](https://nodejs.org/) (v20+)
- **Framework:** [Express](https://expressjs.com/)
- **Edge Functions:** [Supabase Edge Functions](https://supabase.com/docs/guides/functions) (Deno)
- **Email Service:** [Resend](https://resend.com/)
- **Auth:** Google OAuth 2.0 & Custom Email Verification
- **Database:** [Supabase (PostgreSQL)](https://supabase.com/)

---

## 📂 Project Structure

```text
ReactOne/
├── client/          # Vite + React Frontend
│   ├── src/         # Source code (components, pages, hooks, api)
│   └── public/      # Static assets
├── server/          # Node.js + Express Backend
│   ├── routes/      # API Endpoints
│   ├── controllers/ # Business logic
│   └── middleware/  # Auth & Security
├── supabase/        # Supabase Configuration
│   ├── functions/   # Edge Functions (Signup, Verification, Password Reset)
│   └── schema.sql   # Database migrations and schema
└── .gitignore       # Root ignore rules
```

---

## ✨ Key Features

- **Google OAuth Integration:** Secure login using Google accounts.
- **Advanced Email Auth:** Custom signup flow with email verification via Resend and Supabase Edge Functions.
- **Supabase MCP:** Agentic backend management guide featuring the Model Context Protocol.
- **Dynamic Blog System:** PostgreSQL-powered blog with Markdown support and RLS.
- **Interactive Roadmap:** Guides for Figma to React conversion, Axios, Redux Toolkit, etc.
- **Modern UI/UX:** High-performance animations and glassmorphic designs.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v20.19+ or v22.12+)
- [npm](https://www.npmjs.com/)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (for Edge Functions)

### 1. Clone the Repository
```bash
git clone https://github.com/hasmat1610/ReactOne.git
cd ReactOne
```

### 🌍 Environment Variable Guide

To run this project, you need to configure several environment variables. Follow these steps to generate them:

#### 1. Google OAuth 2.0 (Auth)
- Go to the [Google Cloud Console](https://console.cloud.google.com/).
- Create a new project and navigate to **APIs & Services > Credentials**.
- Create an **OAuth 2.0 Client ID** (Web Application).
- Add `http://localhost:3000/auth/google/callback` (for local) and your production URL to **Authorized redirect URIs**.
- **Result:** `CLIENT_ID`, `CLIENT_SECRET`, and `REDIRECT_URI`.

#### 2. Supabase (Database & Edge Functions)
- Create a project on [Supabase](https://supabase.com/).
- Go to **Project Settings > API**.
- **Result:** `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (anon key).

#### 3. Resend (Email)
- Create an account on [Resend](https://resend.com/).
- Generate an API Key under **API Keys**.
- **Result:** `RESEND_API_KEY` (Used in Supabase Secrets).

#### 4. Security Secrets (JWT & Cookies)
Generate secure random strings for your secrets using your terminal:
```bash
# Generate a 64-character secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
- **Result:** `JWT_SECRET`, `COOKIE_SECRET`, and `VITE_AUTH_API_KEY`.

---

### 2. Environment Setup

Copy the appropriate template files to create your active `.env` files.

#### **Local Development**
1. Copy `client/.env.local.example` ➔ `client/.env`
2. Copy `server/.env.local.example` ➔ `server/.env`
3. Fill in your local Google OAuth and Supabase credentials.

#### **Production Hosting (Vercel/Render)**
1. Use `client/.env.production.example` and `server/.env.production.example` as a reference.
2. Add these variables directly to your hosting provider's (Vercel/Render) dashboard.

#### **Supabase Edge Functions**
```bash
# Production keys (Deno)
supabase secrets set RESEND_API_KEY=re_...
supabase secrets set PUBLIC_SITE_URL=https://your-domain.vercel.app
```

---

### 3. Deployment Points (Vercel & Render)
- **Frontend (Vercel):** Add all `client/.env` variables to Vercel's Environment Variables settings.
- **Backend (Render):** Add all `server/.env` variables to Render's Environment Variables settings.
- Ensure `FRONTEND_URL` and `REDIRECT_URI` are updated to your production domains.

### 3. Installation & Development

#### **Run Server**
```bash
cd server
npm install
npm run dev
```

#### **Run Client**
```bash
cd client
npm install
npm run dev
```

---

## 🛡 Security Note

Sensitive credentials and `node_modules` are excluded from Git tracking. Always use Supabase Secrets for production Edge Function keys.

---

## 📄 License
This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
