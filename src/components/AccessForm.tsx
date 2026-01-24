'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'

/**
 * AccessForm Component
 * 
 * Password-protected access form for VC content.
 * Handles password validation via server-side API.
 * 
 * Props:
 * - lang: 'fr' | 'en' - Language for UI text
 * - redirectUrl: The Gamma page URL to redirect to on success
 * 
 * Logo images:
 * - /public/images/logo-dark.png - Used on this page (light background)
 */

interface AccessFormProps {
  lang: 'fr' | 'en'
  redirectUrl: string
}

// Translations for the form
const translations = {
  fr: {
    title: 'Accès Investisseurs',
    subtitle: 'Cette page est protégée',
    placeholder: 'Mot de passe',
    button: 'Accéder',
    error: 'Accès refusé',
    requestAccess: 'Demander un accès',
    loading: 'Vérification...',
  },
  en: {
    title: 'Investor Access',
    subtitle: 'This page is restricted',
    placeholder: 'Password',
    button: 'Access',
    error: 'Access denied',
    requestAccess: 'Request access',
    loading: 'Verifying...',
  },
}

/**
 * Generates an obfuscated mailto link
 * Email is split and reassembled at runtime to prevent scraping
 */
function getObfuscatedMailto(): string {
  // Obfuscated email: manu@leasemint.ai
  const user = ['m', 'a', 'n', 'u'].join('')
  const domain = ['leasemint', 'ai'].join('.')
  const email = `${user}@${domain}`
  const subject = encodeURIComponent('LeaseMint – VC Access Request')
  return `mailto:${email}?subject=${subject}`
}

export default function AccessForm({ lang, redirectUrl }: AccessFormProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const t = translations[lang]

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.success) {
        // Redirect to the Gamma page on success
        window.location.href = redirectUrl
      } else {
        // Show generic error message
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
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/images/logo-dark.png"
          alt="LeaseMint"
          width={140}
          height={42}
          className="mx-auto"
          priority
        />
      </div>

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-brand-900 tracking-tight">
          {t.title}
        </h1>
        <p className="mt-2 text-brand-500">
          {t.subtitle}
        </p>
      </div>

      {/* Form */}
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

        {/* Error message */}
        {error && (
          <p className="text-sm text-red-600 text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading || !password}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? t.loading : t.button}
        </button>
      </form>

      {/* Request access link */}
      <div className="mt-8">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.location.href = getObfuscatedMailto()
          }}
          className="text-sm text-brand-500 hover:text-brand-700 underline underline-offset-4 transition-colors"
        >
          {t.requestAccess}
        </a>
      </div>

      {/* Footer */}
      <p className="mt-16 text-sm text-brand-400">
        © {new Date().getFullYear()} LeaseMint
      </p>
    </main>
  )
}
