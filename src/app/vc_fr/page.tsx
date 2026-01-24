import AccessForm from '@/components/AccessForm'
import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'

/**
 * French VC Access Page
 * 
 * Password-protected page that displays French presentation slides.
 * Slides are loaded from /public/slides/fr/
 */

export const metadata: Metadata = {
  title: 'LeaseMint - Accès Investisseurs',
  description: 'Portail sécurisé pour les investisseurs',
  robots: {
    index: false,
    follow: false,
  },
}

// Get slides from the fr folder
function getSlides(): string[] {
  const slidesDir = path.join(process.cwd(), 'public', 'slides', 'fr')
  
  try {
    const files = fs.readdirSync(slidesDir)
    const slideFiles = files
      .filter(file => /\.(png|jpg|jpeg|webp)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map(file => `/slides/fr/${file}`)
    
    return slideFiles
  } catch {
    return []
  }
}

export default function VCFrenchPage() {
  const slides = getSlides()
  
  return <AccessForm lang="fr" slides={slides} />
}
