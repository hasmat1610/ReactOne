import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  Braces,
  ChevronDown,
  Code,
  Layers,
  LogOut,
  Menu,
  MessageSquare,
  Monitor,
  Palette,
  Puzzle,
  Server,
  Shield,
  Sparkles,
  TerminalSquare,
  User,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

type NavItem = { to: string; icon: LucideIcon; title: string; desc: string }
type NavMenu = {
  label: string
  icon: LucideIcon
  color: string
  dotColor: string
  items: NavItem[]
}

const navMenus: NavMenu[] = [
  {
    label: 'UI/UX',
    icon: Palette,
    color: 'from-pink-400 to-rose-500',
    dotColor: 'bg-pink-400',
    items: [{ to: '/stitch-guide', icon: Layers, title: 'Stitch Guide', desc: 'AI-powered UI generation workflow' }],
  },
  {
    label: 'Code',
    icon: Code,
    color: 'from-cyan-400 to-blue-500',
    dotColor: 'bg-cyan-400',
    items: [
      { to: '/auth-flow-code', icon: Braces, title: 'Auth Flow Code', desc: 'Production-ready auth snippets' },
      { to: '/google-auth', icon: Shield, title: 'Google Auth', desc: 'OAuth 2.0 implementation guide' },
    ],
  },
  {
    label: 'Prompt',
    icon: MessageSquare,
    color: 'from-violet-400 to-purple-500',
    dotColor: 'bg-violet-400',
    items: [
      { to: '/figma-mcp', icon: Sparkles, title: 'Figma MCP', desc: 'Figma-to-code AI pipeline' },
      { to: '/gen-code-lab', icon: Zap, title: 'GenCode Lab', desc: 'AI-driven code evolution' },
    ],
  },
  {
    label: 'MCP',
    icon: Puzzle,
    color: 'from-indigo-400 to-blue-600',
    dotColor: 'bg-indigo-400',
    items: [{ to: '/figma-mcp', icon: Sparkles, title: 'Figma MCP', desc: 'Figma-to-code AI pipeline' }],
  },
  {
    label: 'FrontEnd',
    icon: Monitor,
    color: 'from-emerald-400 to-teal-500',
    dotColor: 'bg-emerald-400',
    items: [{ to: '/axios-react', icon: TerminalSquare, title: 'Axios React', desc: 'HTTP client best practices' }],
  },
  {
    label: 'BackEnd',
    icon: Server,
    color: 'from-amber-400 to-orange-500',
    dotColor: 'bg-amber-400',
    items: [{ to: '/backend-integration', icon: Server, title: 'Backend Integration', desc: 'Node.js & Express patterns' }],
  },
  {
    label: 'Library',
    icon: BookOpen,
    color: 'from-teal-400 to-cyan-500',
    dotColor: 'bg-teal-400',
    items: [
      { to: '/axios-react', icon: TerminalSquare, title: 'Axios React', desc: 'HTTP client integration' },
      { to: '/tanstack-query', icon: Layers, title: 'TanStack Query', desc: 'Async state management' },
      { to: '/redux-toolkit', icon: Braces, title: 'Redux Toolkit', desc: 'Global state management' },
      { to: '/zustand', icon: Sparkles, title: 'Zustand', desc: 'Lightweight state management' },
      { to: '/react-query', icon: Monitor, title: 'React Query', desc: 'Server state & caching' },
      { to: '/react-hook-form', icon: Shield, title: 'React Hook Form', desc: 'Performant form handling' },
      { to: '/formik', icon: Shield, title: 'Formik', desc: 'Robust form handling' },
    ],
  },
]

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const el = dropdownRef.current
      if (el && e.target instanceof Node && !el.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setDropdownOpen(false)
    navigate('/')
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group" aria-label="ReactOne home">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                React<span className="text-sky-200">One</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 ml-4" aria-label="Primary">
              {navMenus.map((menu) => {
                const MenuIcon = menu.icon
                return (
                  <div key={menu.label} className="relative group">
                    <button
                      type="button"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                      aria-haspopup="menu"
                    >
                      <MenuIcon className="w-3.5 h-3.5" />
                      {menu.label}
                      <ChevronDown className="w-3 h-3 opacity-40 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-300" />
                    </button>

                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                      <div className="w-72 rounded-2xl border border-white/[0.08] bg-[#0a0f18]/95 backdrop-blur-2xl shadow-2xl shadow-black/60 overflow-hidden">
                        <div className="px-4 pt-3 pb-2 border-b border-white/[0.06]">
                          <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${menu.dotColor} shadow-lg`} />
                            <span className="text-[11px] font-semibold uppercase tracking-widest text-white/30">
                              {menu.label}
                            </span>
                          </div>
                        </div>

                        <div className="p-2">
                          {menu.items.map((item) => {
                            const ItemIcon = item.icon
                            return (
                              <Link
                                key={item.to}
                                to={item.to}
                                className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group/item"
                              >
                                <div
                                  className={`mt-0.5 w-8 h-8 rounded-lg bg-gradient-to-br ${menu.color} flex items-center justify-center opacity-80 group-hover/item:opacity-100 transition-opacity shadow-lg shrink-0`}
                                  aria-hidden="true"
                                >
                                  <ItemIcon className="w-4 h-4 text-white" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-[13px] font-semibold text-white/90 group-hover/item:text-white transition-colors">
                                    {item.title}
                                  </p>
                                  <p className="text-[11px] text-white/35 leading-relaxed mt-0.5">
                                    {item.desc}
                                  </p>
                                </div>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full p-0.5 border border-transparent hover:border-white/20 transition-colors cursor-pointer"
                  aria-haspopup="menu"
                  aria-expanded={dropdownOpen}
                >
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name || 'Profile'}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-[#40E0FF]/30"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#40E0FF] to-purple-600 flex items-center justify-center ring-2 ring-[#40E0FF]/30">
                      <span className="text-white font-bold text-sm">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </span>
                    </div>
                  )}
                  <ChevronDown
                    className={`w-4 h-4 text-white/50 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/[0.08] bg-[#0a0f18]/95 backdrop-blur-2xl shadow-2xl shadow-black/60 overflow-hidden"
                    role="menu"
                  >
                    <div className="px-4 py-3 border-b border-white/5">
                      <div className="flex items-center gap-3">
                        {user.picture ? (
                          <img
                            src={user.picture}
                            alt={user.name || 'Profile'}
                            className="w-10 h-10 rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#40E0FF] to-purple-600 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{user.name || 'User'}</p>
                          <p className="text-xs text-white/40 truncate">{user.email || ''}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                        role="menuitem"
                      >
                        <User className="w-4 h-4" /> My Profile
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors cursor-pointer"
                        role="menuitem"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="hidden sm:flex items-center gap-4 text-sm font-medium">
                  <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                    Sign in
                  </Link>
                </div>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors bg-white text-black hover:bg-white/90 h-9 px-4 py-2 gap-2"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu overlay"
          />
          <div
            id="mobile-menu"
            className="absolute right-0 top-16 bottom-0 w-80 max-w-[85vw] bg-[#0a0f18]/98 backdrop-blur-2xl border-l border-white/[0.08] overflow-y-auto"
          >
            <div className="p-4 space-y-1">
              {navMenus.map((menu) => {
                const MenuIcon = menu.icon
                const isExpanded = mobileExpanded === menu.label
                return (
                  <div key={menu.label}>
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(isExpanded ? null : menu.label)}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                      aria-expanded={isExpanded}
                    >
                      <span className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${menu.color} flex items-center justify-center opacity-80`} aria-hidden="true">
                          <MenuIcon className="w-3.5 h-3.5 text-white" />
                        </div>
                        {menu.label}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    {isExpanded && (
                      <div className="ml-4 pl-5 border-l border-white/[0.06] space-y-0.5 pb-2">
                        {menu.items.map((item) => {
                          const ItemIcon = item.icon
                          return (
                            <Link
                              key={item.to}
                              to={item.to}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                            >
                              <ItemIcon className="w-4 h-4 shrink-0" />
                              <div className="min-w-0">
                                <p className="font-medium">{item.title}</p>
                                <p className="text-[11px] text-white/30 mt-0.5">{item.desc}</p>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="p-4 border-t border-white/[0.06] mt-2 sm:hidden">
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <User className="w-4 h-4" /> My Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white border border-white/10 hover:bg-white/5 transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center px-4 py-3 rounded-xl text-sm font-medium bg-white text-black hover:bg-white/90 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

