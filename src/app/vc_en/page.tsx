import AccessForm from '@/components/AccessForm'
import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'

/**
 * English VC Access Page
 * 
 * Password-protected page that displays English presentation slides.
 * Slides are loaded from /public/slides/en/
 */

export const metadata: Metadata = {
  title: 'LeaseMint - Investor Access',
  description: 'Secure investor access portal',
  robots: {
    index: false,
    follow: false,
  },
}

// Get slides from the en folder
function getSlides(): string[] {
  const slidesDir = path.join(process.cwd(), 'public', 'slides', 'en')
  
  try {
    const files = fs.readdirSync(slidesDir)
    const slideFiles = files
      .filter(file => /\.(png|jpg|jpeg|webp)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map(file => `/slides/en/${file}`)
    
    return slideFiles
  } catch {
    return []
  }
}

export default function VCEnglishPage() {
  const slides = getSlides()
  
  return <AccessForm lang="en" slides={slides} />
}
