'use client'

import Link from 'next/link'
import Logo from '@/components/Logo'

/**
 * Homepage - Language Selection
 * 
 * Presents a clean, centered layout with two language options.
 * Redirects to password-protected VC pages.
 * Logo automatically adapts to current theme.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Logo / Brand - auto-switches based on theme */}
      <div className="mb-12 text-center">
        <Logo width={200} height={60} className="mx-auto" />
        <p className="mt-6 text-adaptive-secondary text-lg">
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
      <p className="mt-16 text-sm text-adaptive-secondary opacity-60">
        © {new Date().getFullYear()} LeaseMint
      </p>
    </main>
  )
}
