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
const GAMMA_URL_EN = 'https://gamma.app/docs/Copy-of-La-combinaison-de-lIA-Fintech-pour-la-location-a-long-ter-lzlad4rw4q8ov8t'

export default function VCEnglishPage() {
  return <AccessForm lang="en" redirectUrl={GAMMA_URL_EN} />
}
