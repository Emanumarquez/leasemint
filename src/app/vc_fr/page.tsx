import AccessForm from '@/components/AccessForm'
import type { Metadata } from 'next'

/**
 * French VC Access Page
 * 
 * Password-protected page that redirects to French Gamma content.
 * The actual redirect URL should be the Gamma page for French content.
 */

export const metadata: Metadata = {
  title: 'LeaseMint - Accès Investisseurs',
  description: 'Portail sécurisé pour les investisseurs',
  robots: {
    index: false,
    follow: false,
  },
}

// The Gamma page URL for French content
// Update this to your actual Gamma page URL
const GAMMA_URL_FR = 'https://gamma.app/docs/LeaseMint-Deck-FR'

export default function VCFrenchPage() {
  return <AccessForm lang="fr" redirectUrl={GAMMA_URL_FR} />
}
