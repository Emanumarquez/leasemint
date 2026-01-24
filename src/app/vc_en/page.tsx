import AccessForm from '@/components/AccessForm'
import type { Metadata } from 'next'

/**
 * English VC Access Page
 * 
 * Password-protected page that redirects to English Gamma content.
 * The actual redirect URL should be the Gamma page for English content.
 */

export const metadata: Metadata = {
  title: 'LeaseMint - Investor Access',
  description: 'Secure investor access portal',
  robots: {
    index: false,
    follow: false,
  },
}

// The Gamma page URL for English content
// Update this to your actual Gamma page URL
const GAMMA_URL_EN = 'https://gamma.app/docs/LeaseMint-Deck-EN'

export default function VCEnglishPage() {
  return <AccessForm lang="en" redirectUrl={GAMMA_URL_EN} />
}
