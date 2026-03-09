import { ArrowLeft, Ghost } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] bg-[#070707] flex flex-col items-center justify-center p-4 selection:bg-primary/30 antialiased font-sans relative z-10 w-full">
      <div className="text-center w-full max-w-md">
        <div className="mb-8 flex items-center justify-center text-white/20">
          <Ghost className="w-24 h-24" strokeWidth={1} />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">404</h1>
        <h2 className="text-xl md:text-2xl font-medium text-white/80 mb-6">Page not found</h2>

        <p className="text-neutral-400 mb-10 text-base">
          This page is under construction or doesn&apos;t exist yet. The site template contains many
          placeholder links.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-neutral-200 transition-colors py-3 px-6 rounded-xl font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

