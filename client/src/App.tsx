import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Helmet } from 'react-helmet-async'
import LandingPage from './pages/LandingPage'
import StitchGuide from './pages/posts/StitchGuide'
import Header from './components/landing/Header'
import Footer from './components/landing/Footer'

import GoogleAuth from './pages/posts/GoogleAuth'
import AuthFlowCode from './pages/posts/AuthFlowCode'
import FigmaMCP from './pages/posts/FigmaMCP'
import AxiosReact from './pages/posts/AxiosReact'
import TanStackQuery from "./pages/posts/TanStackQuery";
import ReduxToolkit from "./pages/posts/ReduxToolkit";
import ZustandGuide from "./pages/posts/ZustandGuide";
import ReactQueryGuide from "./pages/posts/ReactQueryGuide";
import ReactHookFormGuide from "./pages/posts/ReactHookFormGuide";
import FormikGuide from './pages/posts/FormikGuide'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import OtpVerification from './pages/OtpVerification'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import SupabaseMasterGuide from './pages/posts/SupabaseMasterGuide'
import MongoVsPostgres from './pages/posts/MongoVsPostgres'
import { getRouteSeo } from './seo/routesSeo'
import AdminDashboard from './pages/AdminDashboard'
import { AdminRoute } from './components/auth/AdminRoute'
import Dashboard from './pages/Dashboard'
import AxiosPostGuide from './pages/posts/AxiosPostGuide'
import BackendIntegration from './pages/posts/BackendIntegration'

function AppContent() {
  const location = useLocation()
  const isAuthPage = ['/login', '/signup', '/forgot-password', '/otp-verification'].includes(
    location.pathname,
  )
  const seo = getRouteSeo(location.pathname)

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-primary/30 antialiased relative overflow-hidden">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {!isAuthPage && <Header />}
        <main id="main" className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/stitch-guide" element={<StitchGuide />} />
            <Route path="/google-auth" element={<GoogleAuth />} />
            <Route path="/auth-flow-code" element={<AuthFlowCode />} />
            <Route path="/figma-mcp" element={<FigmaMCP />} />
            <Route path="/axios-react" element={<AxiosReact />} />
            <Route path="/tanstack-query" element={<TanStackQuery />} />
            <Route path="/redux-toolkit" element={<ReduxToolkit />} />
            <Route path="/zustand" element={<ZustandGuide />} />
            <Route path="/react-query" element={<ReactQueryGuide />} />
            <Route path="/react-hook-form" element={<ReactHookFormGuide />} />
            <Route path="/formik" element={<FormikGuide />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route path="/backend-integration" element={<BackendIntegration />} />

            <Route path="/supabase-guide" element={<SupabaseMasterGuide />} />
            <Route path="/mongo-vs-postgres" element={<MongoVsPostgres />} />
            <Route path="/axios-post-guide" element={<AxiosPostGuide />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {!isAuthPage && <Footer />}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-black"
      >
        Skip to main content
      </a>
      <AppContent />
      <SpeedInsights />
    </BrowserRouter>
  )
}

