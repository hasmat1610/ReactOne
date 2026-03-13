import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#0B0D10] pt-24 pb-8 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex gap-6 justify-center">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-white/60 max-w-4xl mx-auto">
              <li>
                <Link to="/stitch-guide" className="hover:text-white transition-colors">
                  Stitch Guide
                </Link>
              </li>
              <li>
                <Link to="/figma-mcp" className="hover:text-white transition-colors">
                  Figma MCP
                </Link>
              </li>
              <li>
                <Link to="/supabase-guide" className="hover:text-white transition-colors">
                  Supabase Master Guide 
                </Link>
              </li>
              <li>
                <Link to="/backend-integration" className="hover:text-white transition-colors">
                  Backend Integration
                </Link>
              </li>
              <li>
                <Link to="/google-auth" className="hover:text-white transition-colors">
                  Google Auth
                </Link>
              </li>
              <li>
                <Link to="/auth-flow-code" className="hover:text-white transition-colors">
                  Auth Flow Code
                </Link>
              </li>
              <li>
                <Link to="/axios-react" className="hover:text-white transition-colors">
                  Axios React
                </Link>
              </li>
              <li>
                <Link to="/tanstack-query" className="hover:text-white transition-colors">
                  TanStack Query
                </Link>
              </li>
              <li>
                <Link to="/redux-toolkit" className="hover:text-white transition-colors">
                  Redux Toolkit
                </Link>
              </li>
              <li>
                <Link to="/zustand" className="hover:text-white transition-colors">
                  Zustand
                </Link>
              </li>
              <li>
                <Link to="/react-query" className="hover:text-white transition-colors">
                  React Query
                </Link>
              </li>
              <li>
                <Link to="/react-hook-form" className="hover:text-white transition-colors">
                  React Hook Form
                </Link>
              </li>
              <li>
                <Link to="/formik" className="hover:text-white transition-colors">
                  Formik
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center justify-center w-full mb-20 pointer-events-none select-none" aria-hidden="true">
          <p className="text-[18vw] leading-none font-bold tracking-tighter text-white">ReactOne</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-white/50">
          <p>Developed by Hasmat Patel</p>
        </div>
      </div>
    </footer>
  )
}

