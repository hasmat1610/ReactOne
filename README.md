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

### Backend (`/server`)
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express](https://expressjs.com/)
- **Language:** TypeScript (via `tsx`)
- **Auth:** [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2) & JWT
- **Database:** [Supabase](https://supabase.com/)

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
├── supabase/        # Database migrations and schema
└── .gitignore       # Root ignore rules
```

---

## ✨ Key Features

- **Google OAuth Integration:** Secure login using Google accounts.
- **Interactive Roadmap:** Guides for Figma to React conversion, Axios, Redux Toolkit, etc.
- **Modern UI/UX:** High-performance animations and glassmorphic designs.
- **Supabase Backend:** Real-time database and storage capabilities.
- **Chatbot UI:** Integrated AI-ready chat interface.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/hasmat1610/ReactOne.git
cd ReactOne
```

### 2. Environment Setup
Create `.env` files based on the `.env.example` templates provided in both `client` and `server` directories.

**Server (`/server/.env`):**
```env
PORT=3000
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

**Client (`/client/.env`):**
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```

### 3. Installation & Development

Available scripts from the root (depending on your task runner) or navigate to subfolders:

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

Sensitive credentials and `node_modules` are excluded from Git tracking via a comprehensive root `.gitignore`. Always use `.env.example` to document required environment variables without exposing secrets.

---

## 📄 License
This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
