import Image from 'next/image'

/**
 * Logo Component
 * 
 * Displays the LeaseMint logo with support for dark and light variants.
 * 
 * Props:
 * - variant: 'dark' | 'light' - Which logo version to display
 *   - 'dark': Dark logo for light backgrounds (default)
 *   - 'light': Light logo for dark backgrounds
 * - className: Additional CSS classes
 * 
 * Image files expected in /public/images/:
 * - logo-dark.png (or .svg) - For light backgrounds
 * - logo-light.png (or .svg) - For dark backgrounds
 */

interface LogoProps {
  variant?: 'dark' | 'light'
  className?: string
}

export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const logoSrc = variant === 'dark' 
    ? '/images/leasemint_black.png' 
    : '/images/leasemint_white.png'

  return (
    <Image
      src={logoSrc}
      alt="LeaseMint"
      width={160}
      height={48}
      className={className}
      priority
    />
  )
}

/**
 * LogoFallback Component
 * 
 * Text-based fallback when logo images are not available.
 * Use this during development or as a fallback.
 */
export function LogoFallback({ className = '' }: { className?: string }) {
  return (
    <div className={`text-2xl font-semibold tracking-tight ${className}`}>
      LeaseMint
    </div>
  )
}
