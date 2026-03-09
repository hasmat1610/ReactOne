import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Status = 'idle' | 'loading' | 'ok' | 'error'

export default function SupabaseStatus() {
  const [status, setStatus] = useState<Status>('idle')
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      setStatus('loading')
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        setStatus('error')
        return
      }
      setEmail(data.user?.email ?? null)
      setStatus('ok')
    }
    void run()
  }, [])

  return (
    <div className="text-xs text-neutral-400 mt-4">
      <p>Supabase status: {status}</p>
      {email && <p>Signed in as: {email}</p>}
    </div>
  )
}

