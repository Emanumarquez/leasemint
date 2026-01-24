'use client'

import Image from 'next/image'
import { useTheme } from './ThemeProvider'

/**
 * Logo Component
 * 
 * Displays the LeaseMint logo.
 * Automatically switches between dark and light variants based on theme.
 * 
 * - Dark theme: uses leasemint_white.png (white logo on dark bg)
 * - Light theme: uses leasemint_black.png (black logo on light bg)
 */

interface LogoProps {
  width?: number
  height?: number
  className?: string
}

export default function Logo({ width = 160, height = 48, className = '' }: LogoProps) {
  const { theme } = useTheme()
  
  // Select logo based on current theme
  // leasemint_black.png = black background version (for dark theme)
  // leasemint_white.png = white/light version (for light theme)
  const logoSrc = theme === 'dark' 
    ? '/images/leasemint_black.png' 
    : '/images/leasemint_white.png'

  return (
    <Image
      src={logoSrc}
      alt="LeaseMint"
      width={width}
      height={height}
      className={className}
      priority
    />
  )
}
