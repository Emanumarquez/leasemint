import Link from 'next/link'

/**
 * Homepage - Language Selection
 * 
 * Presents a clean, centered layout with two language options.
 * Redirects to password-protected VC pages.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Logo / Brand */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-semibold text-brand-900 tracking-tight">
          LeaseMint
        </h1>
        <p className="mt-2 text-brand-500">
          Investor Portal
        </p>
      </div>

      {/* Language Selection */}
      <div className="w-full max-w-sm space-y-4">
        <Link 
          href="/vc_fr" 
          className="btn-secondary w-full text-center block"
        >
          Français
        </Link>
        <Link 
          href="/vc_en" 
          className="btn-secondary w-full text-center block"
        >
          English
        </Link>
      </div>

      {/* Footer */}
      <p className="mt-16 text-sm text-brand-400">
        © {new Date().getFullYear()} LeaseMint
      </p>
    </main>
  )
}
