import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ShieldCheck, Zap, UserCircle, Key, ArrowRight, Code,
  Globe, Settings, KeyRound, Copy, CheckCircle2, AlertTriangle,
  ExternalLink, Terminal, Lock, ChevronDown, ChevronUp, FileCode,
  Database, Server, Layout, Calendar
} from 'lucide-react';

// ━━━ STEP 1 DATA: Credential Setup Steps ━━━
interface Instruction {
  text: string;
  link?: string;
  label?: string;
}

interface StepData {
  id: string;
  stepNumber: string;
  title: string;
  icon: any;
  accent: string;
  image: string;
  instructions: Instruction[];
  warning?: string;
  tip?: string;
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  codeSnippet?: string;
}

const setupSteps: StepData[] = [
  {
    id: 'create-project', stepNumber: '01', title: 'Create a Google Cloud Project',
    icon: Globe, accent: 'blue', image: '/images/blog/step1-create-project.png',
    instructions: [
      { text: 'Go to the', link: 'https://console.cloud.google.com/', label: 'Google Cloud Console' },
      { text: 'Click the project dropdown at the top navigation bar' },
      { text: 'Click "NEW PROJECT" (top-right corner)' },
      { text: 'Enter a Project Name (e.g., ReactOne Auth) → "CREATE"' },
      { text: 'Select the project from the dropdown after creation' },
    ],
    warning: 'Make sure the correct project is selected (visible in the top bar) before proceeding.',
  },
  {
    id: 'consent-screen', stepNumber: '02', title: 'Configure OAuth Consent Screen',
    icon: Settings, accent: 'emerald', image: '/images/blog/step2-consent-screen.png',
    instructions: [
      { text: 'Navigate to APIs & Services → OAuth consent screen' },
      { text: 'Select User Type: "External" → click "CREATE"' },
      { text: 'Fill in: App name, User support email, Developer contact email' },
      { text: 'On Scopes page, add: openid, email, profile' },
      { text: 'Click "SAVE AND CONTINUE" through remaining steps' },
    ],
    tip: 'While in "Testing" mode, only test users you add can log in. Add your Gmail to Test users, or publish the app.',
    tableData: { headers: ['Field', 'Value'], rows: [['App name', 'ReactOne'], ['Support email', 'you@gmail.com'], ['Developer contact', 'you@gmail.com']] }
  },
  {
    id: 'create-credentials', stepNumber: '03', title: 'Create OAuth 2.0 Client Credentials',
    icon: KeyRound, accent: 'violet', image: '/images/blog/step3-create-credentials.png',
    instructions: [
      { text: 'Navigate to APIs & Services → Credentials' },
      { text: 'Click "+ CREATE CREDENTIALS" → "OAuth client ID"' },
      { text: 'Application type: "Web application"' },
      { text: 'Add JS Origins: http://localhost:5173' },
      { text: 'Add Redirect URIs: http://localhost:3000/api/v1/auth/google/callback' },
      { text: 'Click "CREATE"' },
    ],
    warning: 'The redirect URI must exactly match your .env REDIRECT_URI — including protocol, port, and path.',
  },
  {
    id: 'copy-credentials', stepNumber: '04', title: 'Copy Credentials to .env',
    icon: FileCode, accent: 'amber', image: '/images/blog/step4-copy-credentials.png',
    instructions: [
      { text: 'Google displays your Client ID and Client Secret after creation' },
      { text: 'Client ID: 123456789-abc123.apps.googleusercontent.com' },
      { text: 'Client Secret: GOCSPX-AbCdEfGhIjKlMnOpQr' },
      { text: 'Copy both into your server/.env file' },
      { text: 'Generate secrets with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"' },
    ],
    warning: 'Never commit .env to Git! Use .env.template as reference.',
    codeSnippet: `# ─── Google OAuth Credentials ─────────────────
CLIENT_ID=your_client_id.apps.googleusercontent.com
CLIENT_SECRET=GOCSPX-your_client_secret
REDIRECT_URI=http://localhost:3000/api/v1/auth/google/callback

# ─── Security Secrets ─────────────────────────
COOKIE_SECRET=generate_random_hex
JWT_SECRET=generate_random_hex

# ─── Config ───────────────────────────────────
PORT=3000
FRONTEND_URL=http://localhost:5173`
  },
];

// ━━━ STEP 2 DATA: Backend Code Snippets ━━━
type BackendSnippetKey = 'oauthClient' | 'initiateLogin' | 'handleCallback' | 'userModel' | 'routes';

interface BackendSnippet {
  title: string;
  filename: string;
  code: string;
}

const backendSnippets: Record<BackendSnippetKey, BackendSnippet> = {
  oauthClient: {
    title: 'OAuth Client Setup', filename: 'authController.js',
    code: `const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');
const axios = require('axios');
const { generateToken } = require('../utils/jwt');

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const PORT = process.env.PORT || 3000;

// Lazy-init OAuth client
let _oauth2Client = null;
const getOAuthClient = () => {
  if (!_oauth2Client) {
    _oauth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
        || \`http://localhost:\${PORT}/api/v1/auth/google/callback\`
    );
  }
  return _oauth2Client;
};` },
  initiateLogin: {
    title: 'Initiate Google Login', filename: 'authController.js',
    code: `exports.initiateGoogleLogin = (req, res) => {
  // Generate CSRF state token
  const state = crypto.randomBytes(32).toString('hex');

  // Store in signed HttpOnly cookie
  res.cookie('oauth_state', state, {
    maxAge: 1000 * 60 * 10,
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV === 'production'
  });

  // Redirect to Google consent screen
  const authorizeUrl = getOAuthClient().generateAuthUrl({
    access_type: 'offline',
    scope: ['openid', 'email', 'profile'],
    state, prompt: 'consent'
  });
  res.redirect(authorizeUrl);
};` },
  handleCallback: {
    title: 'Handle Callback + DB Store', filename: 'authController.js',
    code: `exports.handleGoogleCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    const cookieState = req.signedCookies.oauth_state;

    // CSRF validation
    if (!state || state !== cookieState) {
      return res.status(403).json({
        error: 'CSRF validation failed.'
      });
    }
    res.clearCookie('oauth_state');

    // Exchange code for tokens
    const { tokens } = await getOAuthClient().getToken(code);

    // Fetch user profile from Google
    const { data } = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: \`Bearer \${tokens.access_token}\` } }
    );
    const { sub, name, email, picture } = data;

    // ─── DATABASE STORAGE ─────────────────────────
    // Upsert user record (create or update)
    let user = await User.findOne({ googleId: sub });
    if (!user) {
      user = await User.create({
        googleId: sub,
        name, email, picture,
        provider: 'google',
        refreshToken: tokens.refresh_token,
        lastLogin: new Date()
      });
    } else {
      user.name = name;
      user.picture = picture;
      user.lastLogin = new Date();
      if (tokens.refresh_token) {
        user.refreshToken = tokens.refresh_token;
      }
      await user.save();
    }
    // ──────────────────────────────────────────────

    // Issue JWT with DB user ID
    const token = generateToken({
      id: user._id, name, email, picture
    });

    res.cookie('access_token', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production'
        ? 'none' : 'lax',
    });

    res.redirect(FRONTEND_URL);
  } catch (error) {
    console.error('Auth Error:', error.message);
    res.redirect(\`\${FRONTEND_URL}/login?error=auth_failed\`);
  }
};` },
  userModel: {
    title: 'User Model (MongoDB)', filename: 'models/User.js',
    code: `const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true,  // Allows null for non-Google users
  },
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  picture:  { type: String },
  provider: {
    type: String,
    enum: ['google', 'local'],
    default: 'local'
  },
  password: {
    type: String,
    // Only required for local auth users
    required: function() { return this.provider === 'local'; }
  },
  refreshToken: { type: String, select: false },
  lastLogin:    { type: Date, default: Date.now },
}, { timestamps: true });

// Never return sensitive fields
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshToken;
  return obj;
};

module.exports = mongoose.model('User', userSchema);` },
  routes: {
    title: 'Auth Routes', filename: 'routes/auth.js',
    code: `const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const logout = require('../controllers/authLogout');

router.get('/google', auth.initiateGoogleLogin);
router.get('/google/callback', auth.handleGoogleCallback);
router.post('/login', auth.mockLogin);
router.post('/register', auth.mockRegister);
router.get('/profile', auth.getProfile);
router.post('/logout', logout.logout);

module.exports = router;` },
};

// ━━━ STEP 3 DATA: React / Next.js Frontend Code ━━━
type FrontendSnippetKey = 'useAuth' | 'loginPage' | 'protectedRoute' | 'appRouter' | 'profilePage';

interface FrontendSnippet {
  title: string;
  filename: string;
  code: string;
}

const frontendSnippets: Record<FrontendSnippetKey, FrontendSnippet> = {
  useAuth: {
    title: 'useAuth Hook', filename: 'hooks/useAuth.js',
    code: `import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);
const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check session on mount
  useEffect(() => {
    axios.get(\`\${API}/api/v1/auth/profile\`, {
      withCredentials: true
    })
    .then(res => setUser(res.data))
    .catch(() => setUser(null))
    .finally(() => setLoading(false));
  }, []);

  const loginWithGoogle = () => {
    window.location.href =
      \`\${API}/api/v1/auth/google\`;
  };

  const logout = async () => {
    await axios.post(\`\${API}/api/v1/auth/logout\`, {},
      { withCredentials: true }
    );
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{
      user, loading, loginWithGoogle, logout, isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);` },
  loginPage: {
    title: 'Login Page', filename: 'pages/Login.jsx',
    code: `import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { loginWithGoogle, loading } = useAuth();

  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>
      <p>Sign in to continue to your account</p>

      {/* TODO: Developer - Style this container */}
      <button
        onClick={loginWithGoogle}
        disabled={loading}
        className="google-btn"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>
    </div>
  );
};

export default Login;` },
  protectedRoute: {
    title: 'Protected Route', filename: 'components/ProtectedRoute.jsx',
    code: `import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8
          border-2 border-white/20
          border-t-white rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;` },
  appRouter: {
    title: 'App Router Setup', filename: 'App.jsx',
    code: `import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;` },
  profilePage: {
    title: 'Profile Page', filename: 'pages/Profile.jsx',
    code: `import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="profile-container">
      {/* Google profile picture */}
      <img
        src={user?.picture}
        alt={user?.name}
        className="w-20 h-20 rounded-full"
      />

      <h2>{user?.name}</h2>
      <p>{user?.email}</p>

      <button onClick={logout}>
        Sign Out
      </button>
    </div>
  );
};

export default Profile;` },
};

// ━━━ Troubleshooting Data ━━━
const troubleshootingData = [
  { error: 'redirect_uri_mismatch', cause: 'URI doesn\'t match Google Console', fix: 'Ensure .env URI exactly matches Authorized redirect URIs' },
  { error: 'invalid_client', cause: 'Wrong CLIENT_ID / SECRET', fix: 'Re-copy from Google Console' },
  { error: 'access_denied', cause: 'App in Testing mode', fix: 'Add user email in OAuth consent → Test users' },
  { error: 'CSRF validation failed', cause: 'Stale state cookie', fix: 'Clear cookies and retry' },
];

// ━━━ Accent color helper ━━━
const accentMap: Record<string, { gradient: string; border: string; bg: string; text: string }> = {
  blue: { gradient: 'from-blue-500 to-cyan-500', border: 'border-blue-500/20', bg: 'bg-blue-500/10', text: 'text-blue-400' },
  emerald: { gradient: 'from-emerald-500 to-green-500', border: 'border-emerald-500/20', bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  violet: { gradient: 'from-violet-500 to-purple-500', border: 'border-violet-500/20', bg: 'bg-violet-500/10', text: 'text-violet-400' },
  amber: { gradient: 'from-amber-500 to-orange-500', border: 'border-amber-500/20', bg: 'bg-amber-500/10', text: 'text-amber-400' },
};

// ━━━ Reusable Sub-components ━━━
const CodeBlock = ({ filename, code, onCopy, copied }: { filename: string, code: string, onCopy: (text: string) => void, copied: boolean }) => (
  <div className="bg-[#0f172a] rounded-xl border border-white/10 overflow-hidden not-prose">
    <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-[#1e293b]">
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500" /><div className="w-3 h-3 rounded-full bg-yellow-500" /><div className="w-3 h-3 rounded-full bg-green-500" /></div>
        <span className="text-xs text-slate-400 font-mono ml-2">{filename}</span>
      </div>
      <button onClick={() => onCopy(code)} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs transition-colors">
        {copied ? <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
      </button>
    </div>
    <div className="p-4 overflow-x-auto"><pre className="text-sm font-mono text-slate-300 leading-relaxed m-0"><code>{code}</code></pre></div>
  </div>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const TABS = [
  { key: 'credentials', label: 'Credentials Setup', icon: Key, step: '1' },
  { key: 'backend', label: 'Backend & Security', icon: Server, step: '2' },
  { key: 'frontend', label: 'React / Next.js Code', icon: Layout, step: '3' },
];

const GoogleAuth: React.FC = () => {
  const [activeTab, setActiveTab] = useState('credentials');
  const [activeCodeTab, setActiveCodeTab] = useState('oauthClient');
  const [activeFrontendTab, setActiveFrontendTab] = useState('useAuth');
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0f18] text-slate-200 font-sans pb-24 selection:bg-rose-500/30">

      {/* ── Hero Banner ── */}
      <div className="container mx-auto px-4 max-w-5xl pt-32 pb-16">
        <div className="w-full h-64 md:h-72 bg-gradient-to-br from-rose-900 via-red-900 to-[#0a0f18] rounded-3xl mb-10 overflow-hidden relative flex items-center justify-center border border-white/10">
          <div className="absolute inset-0 opacity-40 mix-blend-screen" style={{ background: `radial-gradient(circle at 50% 120%, rgba(244,63,94,0.4), transparent 50%), radial-gradient(circle at 10% 20%, rgba(251,146,60,0.3), transparent 30%)` }} />
          <div className="z-10 text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 mb-4 font-medium text-xs"><ShieldCheck className="w-3.5 h-3.5" /><span>Complete Setup Guide</span></div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-2xl tracking-tight"><span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">Google OAuth 2.0</span></h1>
            <p className="text-rose-300/70 mt-3 text-sm md:text-base font-medium">Credentials • Backend • React Integration</p>
            {/* ── Author & Date ── */}
            <div className="flex items-center justify-center gap-4 mt-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 p-[1.5px] overflow-hidden">
                  <img src="/images/author/hasmat-patel.jpg" alt="Hasmat Patel" className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="text-left">
                  <p className="text-white text-sm font-semibold m-0 leading-tight">Hasmat Patel</p>
                  <p className="text-rose-300/60 text-xs m-0">UI Developer</p>
                </div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex items-center gap-1.5 text-rose-300/60 text-xs">
                <Calendar className="w-3.5 h-3.5" />
                <span>March 4, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3 Main Step Tabs ── */}
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`flex-1 flex items-center gap-3 px-5 py-4 rounded-2xl transition-all font-medium text-left border ${isActive
                  ? 'bg-rose-500/10 text-white border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.15)]'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border-white/5'
                  }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isActive ? 'bg-gradient-to-br from-rose-500 to-orange-500' : 'bg-white/5'}`}>
                  <span className="text-white text-sm font-bold">{tab.step}</span>
                </div>
                <div>
                  <div className={`text-xs ${isActive ? 'text-rose-400' : 'text-slate-500'} font-bold`}>STEP {tab.step}</div>
                  <div className="text-sm">{tab.label}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════════════
            TAB 1: Credentials Setup
            ═══════════════════════════════════════════════════ */}
        {activeTab === 'credentials' && (
          <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold text-white mb-4">🔑 Creating Your Google OAuth Credentials</h2>
            <p className="text-slate-300 mb-8 text-lg">Follow these 4 steps to get your <code className="text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded text-sm">CLIENT_ID</code> and <code className="text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded text-sm">CLIENT_SECRET</code>.</p>

            {/* Flow Overview Image */}
            <div className="rounded-2xl overflow-hidden border border-white/10 mb-10">
              <img src="/images/blog/oauth-flow-overview.png" alt="OAuth Flow" className="w-full h-auto" />
            </div>

            <div className="space-y-4">
              {setupSteps.map((step) => {
                const StepIcon = step.icon;
                const a = accentMap[step.accent];
                if (!a) return null;
                const isOpen = expandedStep === step.id;
                return (
                  <div key={step.id} className={`bg-[#111827] rounded-2xl border ${a.border} overflow-hidden transition-all duration-300`}>
                    <button onClick={() => setExpandedStep(isOpen ? null : step.id)} className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/[0.02] transition-colors">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${a.gradient} flex items-center justify-center shrink-0`}><StepIcon className="w-6 h-6 text-white" /></div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-bold ${a.text} mb-0.5`}>STEP {step.stepNumber}</div>
                        <h3 className="text-lg font-bold text-white m-0 truncate">{step.title}</h3>
                      </div>
                      <div className={`w-8 h-8 rounded-full ${a.bg} flex items-center justify-center shrink-0`}>
                        {isOpen ? <ChevronUp className={`w-5 h-5 ${a.text}`} /> : <ChevronDown className={`w-5 h-5 ${a.text}`} />}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5">
                        <div className="rounded-xl overflow-hidden border border-white/5 mb-5"><img src={step.image} alt={step.title} className="w-full h-auto" /></div>
                        <div className="space-y-2.5 mb-5">
                          {step.instructions.map((inst, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${a.gradient} flex items-center justify-center shrink-0 mt-0.5`}><span className="text-white text-xs font-bold">{idx + 1}</span></div>
                              <p className="text-slate-300 m-0 text-sm leading-relaxed">
                                {inst.text}
                                {inst.link && (
                                  <a href={inst.link} target="_blank" rel="noopener noreferrer" className={`${a.text} hover:underline ml-1 inline-flex items-center gap-1`}>
                                    {inst.label} <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                              </p>
                            </div>
                          ))}
                        </div>
                        {step.tableData && (
                          <div className="rounded-xl overflow-hidden border border-white/5 mb-5">
                            <table className="w-full text-sm">
                              <thead><tr className="bg-white/5">{step.tableData.headers.map((h, i) => <th key={i} className="px-4 py-2.5 text-left font-bold text-white border-b border-white/5 text-xs">{h}</th>)}</tr></thead>
                              <tbody>{step.tableData.rows.map((row, i) => <tr key={i} className="border-b border-white/5 last:border-none">{row.map((cell, j) => <td key={j} className={`px-4 py-2.5 ${j === 0 ? 'font-mono text-rose-400 text-xs' : 'text-slate-300 text-sm'}`}>{cell}</td>)}</tr>)}</tbody>
                            </table>
                          </div>
                        )}
                        {step.codeSnippet && <div className="mb-5"><CodeBlock filename=".env" code={step.codeSnippet} onCopy={handleCopy} copied={copied} /></div>}
                        {step.warning && <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20"><AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" /><p className="text-amber-200/90 text-sm m-0">{step.warning}</p></div>}
                        {step.tip && <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 mt-3"><Zap className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /><p className="text-emerald-200/90 text-sm m-0">{step.tip}</p></div>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════
            TAB 2: Backend & Security
            ═══════════════════════════════════════════════════ */}
        {activeTab === 'backend' && (
          <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold text-white mb-4">⚙️ Backend Code — How It Works</h2>
            <p className="text-slate-300 mb-8 text-lg">Express.js OAuth logic, database storage, security layers, and troubleshooting.</p>

            {/* Code Explorer */}
            <div className="flex flex-col lg:flex-row gap-6 mb-12">
              <div className="lg:w-1/4">
                <div className="sticky top-24 space-y-2">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-3">Code Files</h3>
                  {Object.entries(backendSnippets).map(([key, data]) => {
                    const snippetKey = key as BackendSnippetKey;
                    return (
                      <button key={key} onClick={() => setActiveCodeTab(key)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all font-medium text-left text-sm ${activeCodeTab === key ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'text-slate-400 hover:bg-white/5 border border-transparent'}`}
                      >
                        {key === 'userModel' ? <Database className="w-4 h-4 shrink-0" /> : <Code className="w-4 h-4 shrink-0" />}
                        <span className="truncate">{data.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="lg:w-3/4">
                <CodeBlock filename={backendSnippets[activeCodeTab as BackendSnippetKey].filename} code={backendSnippets[activeCodeTab as BackendSnippetKey].code} onCopy={handleCopy} copied={copied} />
              </div>
            </div>

            {/* Security Features */}
            <h3 className="text-2xl font-bold text-white mb-6">🛡️ Security Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {[
                { icon: Lock, title: 'CSRF Protection', color: 'text-blue-400', bg: 'from-blue-500/20 to-cyan-500/20', items: ['Random 32-byte state token', 'Signed HttpOnly cookie', 'Validated on callback'] },
                { icon: Key, title: 'HttpOnly JWT Cookies', color: 'text-emerald-400', bg: 'from-emerald-500/20 to-green-500/20', items: ['Can\'t be read by JS (XSS safe)', 'Secure flag in production', 'SameSite: lax for CSRF'] },
                { icon: ShieldCheck, title: 'Helmet.js Headers', color: 'text-violet-400', bg: 'from-violet-500/20 to-purple-500/20', items: ['X-Frame-Options', 'Content Security Policy', 'X-XSS-Protection'] },
                { icon: Database, title: 'DB Upsert Pattern', color: 'text-amber-400', bg: 'from-amber-500/20 to-orange-500/20', items: ['findOne + create/update', 'Stores refresh token securely', 'Tracks lastLogin timestamp'] },
              ].map((f, i) => (
                <div key={i} className="bg-[#111827] border border-white/5 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${f.bg} flex items-center justify-center`}><f.icon className={`w-4 h-4 ${f.color}`} /></div>
                    <h4 className="text-base font-bold text-white m-0">{f.title}</h4>
                  </div>
                  <ul className="space-y-1.5">{f.items.map((item, j) => <li key={j} className="flex items-center gap-2 text-slate-400 text-sm"><CheckCircle2 className={`w-3.5 h-3.5 ${f.color} shrink-0`} />{item}</li>)}</ul>
                </div>
              ))}
            </div>

            {/* Troubleshooting */}
            <h3 className="text-2xl font-bold text-white mb-4">🔧 Troubleshooting</h3>
            <div className="rounded-2xl overflow-hidden border border-white/10 mb-12">
              <table className="w-full text-sm">
                <thead><tr className="bg-white/5"><th className="px-4 py-2.5 text-left font-bold text-white border-b border-white/5 text-xs">Error</th><th className="px-4 py-2.5 text-left font-bold text-white border-b border-white/5 text-xs">Cause</th><th className="px-4 py-2.5 text-left font-bold text-white border-b border-white/5 text-xs">Fix</th></tr></thead>
                <tbody>{troubleshootingData.map((r, i) => <tr key={i} className="border-b border-white/5 last:border-none"><td className="px-4 py-2.5 font-mono text-rose-400 text-xs">{r.error}</td><td className="px-4 py-2.5 text-slate-400 text-xs">{r.cause}</td><td className="px-4 py-2.5 text-slate-300 text-xs">{r.fix}</td></tr>)}</tbody>
              </table>
            </div>

            {/* Conclusion */}
            <h3 className="text-2xl font-bold text-white mb-3">✅ Conclusion</h3>
            <p className="text-slate-300 leading-relaxed text-base">
              Your Express.js backend now handles the full OAuth lifecycle — from CSRF-protected redirect to Google, through token exchange,
              to <strong className="text-white">upserting user records in MongoDB</strong> and issuing secure HttpOnly JWT cookies.
              Combined with Helmet.js headers and rate limiting, this is an enterprise-grade auth backend.
            </p>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════
            TAB 3: React / Next.js Code
            ═══════════════════════════════════════════════════ */}
        {activeTab === 'frontend' && (
          <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold text-white mb-4">⚛️ React / Next.js Project Code</h2>
            <p className="text-slate-300 mb-8 text-lg">Drop-in React components for authentication — hook, login page, protected routes, and profile.</p>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/4">
                <div className="sticky top-24 space-y-2">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-3">Components</h3>
                  {Object.entries(frontendSnippets).map(([key, data]) => {
                    const snippetKey = key as FrontendSnippetKey;
                    return (
                      <button key={key} onClick={() => setActiveFrontendTab(key)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all font-medium text-left text-sm ${activeFrontendTab === key ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'text-slate-400 hover:bg-white/5 border border-transparent'}`}
                      >
                        <Code className={`w-4 h-4 shrink-0 ${activeFrontendTab === key ? 'text-sky-400' : 'text-slate-500'}`} />
                        <span className="truncate">{data.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="lg:w-3/4">
                <CodeBlock filename={frontendSnippets[activeFrontendTab as FrontendSnippetKey].filename} code={frontendSnippets[activeFrontendTab as FrontendSnippetKey].code} onCopy={handleCopy} copied={copied} />
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════
            SECTION: The Perfect Prompt Structure
            ═══════════════════════════════════════════════════ */}
        <div className="mt-20 border-t border-white/5 pt-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 mb-4 font-medium text-xs">
              <Layout className="w-3.5 h-3.5" /><span>React Prompt Engineering</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">The Perfect Prompt Structure</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Building React auth components with AI? A well-structured prompt is the difference between generic boilerplate and drop-in, production-ready hooks and components.
            </p>
          </div>

          {/* Prompt Formula Visual */}
          <div className="bg-[#111827] rounded-2xl border border-white/10 p-6 md:p-8 mb-10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at 20% 50%, rgba(139,92,246,0.15), transparent 40%), radial-gradient(circle at 80% 50%, rgba(14,165,233,0.1), transparent 40%)` }} />
            <h3 className="text-xl font-bold text-white mb-6 relative z-10">📐 The Prompt Formula</h3>
            <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
              {[
                { label: 'Role', color: 'from-violet-500 to-purple-500', desc: 'Who is the AI?' },
                { label: '+', color: null },
                { label: 'Context', color: 'from-sky-500 to-cyan-500', desc: 'What\'s the project?' },
                { label: '+', color: null },
                { label: 'Task', color: 'from-emerald-500 to-green-500', desc: 'What to build?' },
                { label: '+', color: null },
                { label: 'Constraints', color: 'from-amber-500 to-orange-500', desc: 'Rules & limits' },
                { label: '=', color: null },
                { label: 'Result', color: 'from-rose-500 to-pink-500', desc: 'Production code' },
              ].map((item, i) => (
                item.color ? (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div className={`px-4 py-2.5 rounded-xl bg-gradient-to-br ${item.color} text-white font-bold text-sm shadow-lg`}>{item.label}</div>
                    <span className="text-slate-500 text-xs">{item.desc}</span>
                  </div>
                ) : (
                  <span key={i} className="text-2xl font-bold text-slate-500">{item.label}</span>
                )
              ))}
            </div>
          </div>

          {/* Numbered Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              { num: '01', title: 'Define the Role', icon: UserCircle, color: 'violet', desc: 'Start by telling the AI who it is. "You are a senior React developer" gives far better results than a generic request for a login page.', example: '"Act as a senior React developer specializing in authentication UI, Context API, and custom hooks"' },
              { num: '02', title: 'Set the Context', icon: Globe, color: 'blue', desc: 'Provide project context — React version, routing library, state management, and how the backend API is structured.', example: '"I have a React 18 + Vite app using react-router-dom v6. My backend auth API is at /api/v1/auth/* with HttpOnly cookie sessions"' },
              { num: '03', title: 'Specify the Task', icon: Code, color: 'emerald', desc: 'Be explicit about the component or hook you need. Break UI features into focused pieces — a hook, a page, a route guard.', example: '"Create a useAuth custom hook with AuthContext that checks user session on mount via /api/v1/auth/profile and provides loginWithGoogle, logout, and user state"' },
              { num: '04', title: 'Add Constraints', icon: Lock, color: 'amber', desc: 'Define UX patterns, error handling, loading states, and integration rules to prevent the AI from generating incomplete components.', example: '"Include loading spinner during session check, redirect unauthenticated users to /login, and use withCredentials: true for all axios calls"' },
            ].map((card) => {
              const cardAccent = accentMap[card.color];
              if (!cardAccent) return null;
              return (
                <div key={card.num} className="bg-[#111827] rounded-2xl border border-white/5 p-5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cardAccent.gradient} flex items-center justify-center shrink-0`}>
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${cardAccent.text}`}>STEP {card.num}</div>
                      <h4 className="text-white font-bold text-base m-0">{card.title}</h4>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3 m-0">{card.desc}</p>
                  <div className="bg-[#0a0f18] rounded-lg p-3 border border-white/5">
                    <p className="text-xs font-mono text-slate-300 m-0 leading-relaxed italic">"{card.example}"</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Example Prompt Code Block — StitchGuide style */}
          <h3 className="text-xl font-bold text-white mb-4">💡 Example: Full React Auth Prompt</h3>
          <p className="text-slate-400 mb-6 text-base">Here's a complete, well-structured prompt for generating a React authentication integration:</p>
          <div className="bg-[#111827] rounded-xl border border-white/10 overflow-hidden mb-10 shadow-xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1a2333] border-b border-white/5 text-xs text-slate-400 font-mono">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" /><div className="w-3 h-3 rounded-full bg-yellow-500" /><div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="ml-2 pl-2 border-l border-white/10">react-auth-prompt.txt</span>
            </div>
            <div className="p-6 font-mono text-sm md:text-base text-slate-300 leading-loose overflow-x-auto">
              <span className="text-violet-400 font-semibold">Role:</span> You are a senior React developer with expertise<br />
              in authentication UI patterns and Context API.<br />
              <br />
              <span className="text-sky-400 font-semibold">Context:</span> I have a React 18 + Vite app using<br />
              <span className="text-emerald-400">react-router-dom v6</span>. My Express backend handles<br />
              Google OAuth at <span className="text-emerald-400">/api/v1/auth/*</span> with HttpOnly cookie sessions.<br />
              <br />
              <span className="text-emerald-400 font-semibold">Task:</span> Generate the full React auth layer including:<br />
              <span className="text-slate-500 ml-4">1.</span> A <span className="text-sky-400">useAuth</span> custom hook with <span className="text-sky-400">AuthContext</span> provider<br />
              <span className="text-slate-500 ml-4">2.</span> Auto-check session on mount via <span className="text-sky-400">/api/v1/auth/profile</span><br />
              <span className="text-slate-500 ml-4">3.</span> <span className="text-sky-400">loginWithGoogle()</span> that redirects to backend OAuth route<br />
              <span className="text-slate-500 ml-4">4.</span> A <span className="text-sky-400">ProtectedRoute</span> wrapper component with loading state<br />
              <span className="text-slate-500 ml-4">5.</span> A <span className="text-sky-400">Profile</span> page that displays user.name, email, picture<br />
              <br />
              <span className="text-amber-400 font-semibold">Constraints:</span><br />
              <span className="text-slate-500 ml-4">•</span> Use <span className="text-rose-400">axios</span> with <span className="text-rose-400">withCredentials: true</span> for all API calls<br />
              <span className="text-slate-500 ml-4">•</span> Show a <span className="text-rose-400">loading spinner</span> while checking auth state<br />
              <span className="text-slate-500 ml-4">•</span> Redirect to <span className="text-rose-400">/login</span> if session expires or is invalid<br />
              <span className="text-slate-500 ml-4">•</span> Keep components clean — all logic in the hook, UI stays pure
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            SECTION: Crafting the Perfect Prompt
            ═══════════════════════════════════════════════════ */}
        <div className="mt-16 border-t border-white/5 pt-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 mb-4 font-medium text-xs">
              <Zap className="w-3.5 h-3.5" /><span>Advanced Techniques</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Crafting the Perfect Prompt</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Learn the difference between prompts that produce fragile React components and ones that generate clean, reusable auth integrations.
            </p>
          </div>

          {/* Do vs Don't Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Don't */}
            <div className="bg-[#111827] rounded-2xl border border-red-500/20 overflow-hidden">
              <div className="px-5 py-3 bg-red-500/5 border-b border-red-500/10 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-red-400 text-sm font-bold">❌ Weak Prompt</span>
              </div>
              <div className="p-5 space-y-4">
                {[
                  '"Add Google login to my React app"',
                  '"Make a login component"',
                  '"I need auth context for my app"',
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-red-400 text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-slate-400 text-sm m-0 font-mono italic">{text}</p>
                  </div>
                ))}
                <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10 mt-4">
                  <p className="text-red-300/80 text-xs m-0"><strong>Result:</strong> Incomplete hooks, missing loading states, no error handling, and won't integrate with your router or existing components.</p>
                </div>
              </div>
            </div>

            {/* Do */}
            <div className="bg-[#111827] rounded-2xl border border-emerald-500/20 overflow-hidden">
              <div className="px-5 py-3 bg-emerald-500/5 border-b border-emerald-500/10 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-sm font-bold">✅ Strong Prompt</span>
              </div>
              <div className="p-5 space-y-4">
                {[
                  '"Create a useAuth hook using React Context + axios that auto-checks /api/v1/auth/profile on mount with withCredentials: true"',
                  '"Build a ProtectedRoute wrapper using react-router-dom v6 that shows a spinner while loading and redirects to /login if not authenticated"',
                  '"Generate a Google Login button component with SVG icon, loading state, and onClick that redirects to the backend OAuth endpoint"',
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-emerald-400 text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-slate-400 text-sm m-0 font-mono italic">{text}</p>
                  </div>
                ))}
                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 mt-4">
                  <p className="text-emerald-300/80 text-xs m-0"><strong>Result:</strong> Clean, reusable React components that integrate seamlessly with your router, handle edge cases, and follow modern React patterns.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview Mockup — StitchGuide inspired */}
          <div className="w-full bg-[#111827] rounded-2xl border border-white/10 mb-12 overflow-hidden shadow-2xl relative">
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs px-3 py-1.5 rounded-full z-10 flex items-center gap-2 font-mono">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Prompt → Output Preview
            </div>
            <div className="aspect-[16/10] sm:aspect-video w-full bg-[#0d131f] bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] p-6 sm:p-10 flex items-center justify-center">
              <div className="w-full h-full max-w-3xl flex gap-4">
                {/* Left: Prompt Input */}
                <div className="flex-1 bg-[#0a0f18] rounded-2xl border border-white/10 flex flex-col overflow-hidden">
                  <div className="h-10 border-b border-white/5 flex items-center px-4 bg-[#111827]">
                    <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500" /><div className="w-2.5 h-2.5 rounded-full bg-green-500" /></div>
                    <span className="text-[10px] text-slate-500 font-mono ml-3">prompt-input</span>
                  </div>
                  <div className="flex-1 p-4 flex flex-col gap-2">
                    <div className="h-2.5 w-4/5 bg-violet-500/20 rounded" />
                    <div className="h-2.5 w-full bg-sky-500/15 rounded" />
                    <div className="h-2.5 w-3/4 bg-sky-500/15 rounded" />
                    <div className="h-2.5 w-full bg-emerald-500/15 rounded mt-2" />
                    <div className="h-2.5 w-2/3 bg-emerald-500/15 rounded" />
                    <div className="h-2.5 w-full bg-amber-500/15 rounded mt-2" />
                    <div className="h-2.5 w-1/2 bg-amber-500/15 rounded" />
                    <div className="mt-auto w-24 h-8 rounded-lg bg-gradient-to-r from-rose-500 to-orange-500" />
                  </div>
                </div>
                {/* Right: Output */}
                <div className="flex-1 bg-[#0a0f18] rounded-2xl border border-emerald-500/20 flex flex-col overflow-hidden">
                  <div className="h-10 border-b border-emerald-500/10 flex items-center px-4 bg-emerald-500/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-2" />
                    <span className="text-[10px] text-emerald-400 font-mono">generated-output</span>
                  </div>
                  <div className="flex-1 p-4 flex flex-col gap-1.5">
                    <div className="h-2 w-1/3 bg-violet-400/30 rounded" />
                    <div className="h-2 w-full bg-white/10 rounded" />
                    <div className="h-2 w-full bg-white/10 rounded" />
                    <div className="h-2 w-2/3 bg-emerald-400/20 rounded mt-1" />
                    <div className="h-2 w-full bg-white/10 rounded" />
                    <div className="h-2 w-4/5 bg-white/10 rounded" />
                    <div className="h-2 w-full bg-sky-400/15 rounded mt-1" />
                    <div className="h-2 w-3/4 bg-white/10 rounded" />
                    <div className="h-2 w-full bg-white/10 rounded" />
                    <div className="h-2 w-1/2 bg-amber-400/15 rounded mt-1" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#111827] text-center text-sm text-slate-400 border-t border-white/5">
              A structured React prompt (left) produces clean, reusable components (right) that drop directly into your project.
            </div>
          </div>

          {/* Best Practices Grid */}
          <h3 className="text-2xl font-bold text-white mb-6">🎯 Prompt Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { icon: ShieldCheck, title: 'Handle Auth States', color: 'text-rose-400', bg: 'from-rose-500/20 to-pink-500/20', tips: ['Specify loading, error & authenticated states', 'Mention withCredentials for cookie auth', 'Request redirect on session expiry'] },
              { icon: Layout, title: 'Be React-Specific', color: 'text-sky-400', bg: 'from-sky-500/20 to-blue-500/20', tips: ['Name hooks (useAuth, useSession)', 'Specify react-router-dom version', 'Reference Context API patterns'] },
              { icon: Zap, title: 'Component by Component', color: 'text-amber-400', bg: 'from-amber-500/20 to-orange-500/20', tips: ['Prompt for hook first, then UI', 'Build ProtectedRoute separately', 'Test each component in isolation'] },
            ].map((practice, i) => (
              <div key={i} className="bg-[#111827] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${practice.bg} flex items-center justify-center`}>
                    <practice.icon className={`w-4 h-4 ${practice.color}`} />
                  </div>
                  <h4 className="text-base font-bold text-white m-0">{practice.title}</h4>
                </div>
                <ul className="space-y-2">{practice.tips.map((tip, j) => (
                  <li key={j} className="flex items-center gap-2 text-slate-400 text-sm">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${practice.color} shrink-0`} />{tip}
                  </li>
                ))}</ul>
              </div>
            ))}
          </div>

          {/* Author byline for sections */}
          <div className="flex items-center gap-4 text-sm border-t border-white/5 pt-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 p-[1.5px] overflow-hidden">
              <img src="/images/author/hasmat-patel.jpg" alt="Hasmat Patel" className="w-full h-full rounded-full object-cover" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Hasmat Patel</div>
              <div className="text-slate-500 text-xs">UI Developer • March 4, 2026</div>
            </div>
          </div>
        </div>

        {/* ── API Routes Reference (always visible) ── */}
        <div className="mt-16 rounded-2xl overflow-hidden border border-white/10">
          <div className="px-4 py-3 bg-white/5 border-b border-white/5"><h4 className="text-sm font-bold text-white m-0">📡 API Routes Reference</h4></div>
          <table className="w-full text-sm">
            <thead><tr className="bg-white/[0.02]"><th className="px-4 py-2 text-left font-bold text-slate-400 text-xs border-b border-white/5">Method</th><th className="px-4 py-2 text-left font-bold text-slate-400 text-xs border-b border-white/5">Route</th><th className="px-4 py-2 text-left font-bold text-slate-400 text-xs border-b border-white/5">Description</th></tr></thead>
            <tbody>
              {[['GET', '/api/v1/auth/google', 'Initiates Google login'], ['GET', '/api/v1/auth/google/callback', 'Handles Google redirect'], ['POST', '/api/v1/auth/login', 'Email/password login'], ['GET', '/api/v1/auth/profile', 'Get user from JWT cookie'], ['POST', '/api/v1/auth/logout', 'Clear auth cookie']].map((r, i) => (
                <tr key={i} className="border-b border-white/5 last:border-none"><td className="px-4 py-2 font-mono text-emerald-400 text-xs">{r[0]}</td><td className="px-4 py-2 font-mono text-rose-400 text-xs">{r[1]}</td><td className="px-4 py-2 text-slate-300 text-xs">{r[2]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Author Bio Card ── */}
        <div className="mt-12 bg-[#111827] rounded-2xl border border-white/10 p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 p-[2px] shrink-0 shadow-lg shadow-rose-500/20 overflow-hidden">
              <img src="/images/author/hasmat-patel.jpg" alt="Hasmat Patel" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-white font-bold text-base m-0">Hasmat Patel</h4>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">UI Developer</span>
              </div>
              <p className="text-slate-400 text-sm mt-1 m-0">Building modern, secure authentication flows with React and Node.js. Passionate about creating developer-friendly guides and best practices.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span className="text-slate-500 text-xs">Published on March 4, 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuth;
