'use client'

import { useState, FormEvent } from 'react'
import Logo from '@/components/Logo'

/**
 * French VC Access Page
 * 
 * Password-protected page that redirects to French Gamma site.
 */

const GAMMA_URL_FR = 'https://la-combinaison-de-lia-fi-3vmsjte.gamma.site/'

const translations = {
  title: 'Accès Investisseurs',
  subtitle: 'Cette page est protégée',
  placeholder: 'Mot de passe',
  button: 'Accéder',
  error: 'Accès refusé',
  requestAccess: 'Demander un accès',
  loading: 'Vérification...',
}

function getObfuscatedMailto(): string {
  const user = ['m', 'a', 'n', 'u'].join('')
  const domain = ['leasemint', 'ai'].join('.')
  const email = `${user}@${domain}`
  const subject = encodeURIComponent('LeaseMint – VC Access Request')
  return `mailto:${email}?subject=${subject}`
}

export default function VCFrenchPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const t = translations

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
        window.location.href = GAMMA_URL_FR
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
