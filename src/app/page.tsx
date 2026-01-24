import Link from 'next/link'
import Image from 'next/image'

/**
 * Homepage - Language Selection
 * 
 * Presents a clean, centered layout with two language options.
 * Redirects to password-protected VC pages.
 * 
 * Logo images:
 * - /public/images/logo-dark.png - Used on this page (light background)
 */
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Logo / Brand */}
      <div className="mb-12 text-center">
        {/* Logo image - uses dark variant for light background */}
        <Image
          src="/images/leasemint_black.png"
          alt="LeaseMint"
          width={180}
          height={54}
          className="mx-auto"
          priority
        />
        <p className="mt-4 text-brand-500">
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
