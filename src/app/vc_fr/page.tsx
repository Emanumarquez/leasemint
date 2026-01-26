'use client'

import { useState, useEffect, FormEvent } from 'react'
import Logo from '@/components/Logo'
import { useAuth } from '@/components/AuthContext'
import EmbeddedPresentation from '@/components/EmbeddedPresentation'

/**
 * French VC Access Page
 * 
 * Password-protected page that shows the embedded presentation.
 * The floating menu provides access to PDF download and other options.
 */

const GAMMA_URL_FR = 'https://la-combinaison-de-lia-fi-3vmsjte.gamma.site/'

const translations = {
  title: 'Acces Investisseurs',
  subtitle: 'Cette page est protegee',
  placeholder: 'Mot de passe',
  button: 'Acceder',
  error: 'Acces refuse',
  requestAccess: 'Demander un acces',
  loading: 'Verification...',
  // Authenticated state translations
  presentationTitle: 'Presentation Investisseurs',
  backToHome: 'Retour a l\'accueil',
}

function getObfuscatedMailto(): string {
  const user = ['m', 'a', 'n', 'u'].join('')
  const domain = ['leasemint', 'ai'].join('.')
  const email = `${user}@${domain}`
  const subject = encodeURIComponent('LeaseMint – Demande d\'acces VC')
  return `mailto:${email}?subject=${subject}`
}

export default function VCFrenchPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const { isAuthenticated, lang, login } = useAuth()

  const t = translations

  // Check if already authenticated for French
  useEffect(() => {
    if (isAuthenticated && lang === 'fr') {
      setShowContent(true)
    }
  }, [isAuthenticated, lang])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        // Set auth state and show content
        login('fr')
        setShowContent(true)
      } else {
        setError(t.error)
        setPassword('')
      }
    } catch {
      setError(t.error)
    } finally {
      setIsLoading(false)
    }
  }

  // Show authenticated content with embedded presentation
  if (showContent) {
    return (
      <main className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-brand-200 dark:border-brand-800">
          <Logo width={120} height={36} />
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-medium text-adaptive-primary hidden sm:block">
              {t.presentationTitle}
            </h1>
            <a
              href="/"
              className="text-sm text-adaptive-secondary hover:text-primary-500 transition-colors"
            >
              ← {t.backToHome}
            </a>
          </div>
        </header>

        {/* Embedded Presentation */}
        <div className="flex-1 p-4 md:p-6">
          <EmbeddedPresentation url={GAMMA_URL_FR} lang="fr" />
        </div>

        {/* Footer */}
        <footer className="text-center py-4 text-sm text-adaptive-secondary opacity-60">
          © {new Date().getFullYear()} LeaseMint
        </footer>
      </main>
    )
  }

  // Show login form
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="mb-10">
        <Logo width={160} height={48} className="mx-auto" />
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-adaptive-primary tracking-tight">
          {t.title}
        </h1>
        <p className="mt-2 text-adaptive-secondary">
          {t.subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.placeholder}
            className="input-field"
            autoComplete="off"
            autoFocus
            disabled={isLoading}
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading || !password}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? t.loading : t.button}
        </button>
      </form>

      <div className="mt-8">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.location.href = getObfuscatedMailto()
          }}
          className="text-sm text-adaptive-secondary hover:text-primary-500 underline underline-offset-4 transition-colors"
        >
          {t.requestAccess}
        </a>
      </div>

      <p className="mt-16 text-sm text-adaptive-secondary opacity-60">
        © {new Date().getFullYear()} LeaseMint
      </p>
    </main>
  )
}
