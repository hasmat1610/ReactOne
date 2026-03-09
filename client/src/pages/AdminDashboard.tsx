import { useAuth } from '../context/AuthContext'

export default function AdminDashboard() {
  const { user } = useAuth()

  return (
    <div className="min-h-[100dvh] bg-[#070707] text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-neutral-400 text-sm">
          You are signed in as <span className="font-semibold">{user?.email}</span> with role{' '}
          <span className="font-semibold">{user?.role ?? 'user'}</span>.
        </p>
        <p className="text-neutral-400 text-sm">
          Only users whose Supabase JWT has <code>role = &quot;admin&quot;</code> can access this page.
        </p>
      </div>
    </div>
  )
}

