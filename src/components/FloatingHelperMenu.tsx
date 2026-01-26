'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from './AuthContext'

/**
 * FloatingHelperMenu Component
 * 
 * A floating menu that appears when the user is authenticated.
 * Provides quick access to:
 * - Download PDF presentation
 * - View presentation (external link)
 * - Contact/Help options
 * 
 * Translations are automatic based on the selected language.
 */

const translations = {
  fr: {
    menu: 'Menu',
    downloadPdf: 'Telecharger le PDF',
    viewPresentation: 'Voir la presentation',
    contact: 'Contacter',
    help: 'Aide',
    switchLang: 'Switch to English',
    logout: 'Deconnexion',
    close: 'Fermer',
  },
  en: {
    menu: 'Menu',
    downloadPdf: 'Download PDF',
    viewPresentation: 'View Presentation',
    contact: 'Contact Us',
    help: 'Help',
    switchLang: 'Passer en francais',
    logout: 'Logout',
    close: 'Close',
  },
}

// External presentation URLs
const PRESENTATION_URLS = {
  fr: 'https://la-combinaison-de-lia-fi-3vmsjte.gamma.site/',
  en: 'https://copy-of-la-combinaison-d-o9ch4g0.gamma.site/',
}

// PDF download paths
const PDF_PATHS = {
  fr: '/pdf/fr/leasemintVC2026FR.pdf',
  en: '/pdf/en/leasemintVC2026EN.pdf',
}

// Obfuscated email for contact
function getContactMailto(lang: 'fr' | 'en'): string {
  const user = ['m', 'a', 'n', 'u'].join('')
  const domain = ['leasemint', 'ai'].join('.')
  const email = `${user}@${domain}`
  const subject = encodeURIComponent(
    lang === 'fr' ? 'LeaseMint – Question Investisseur' : 'LeaseMint – Investor Question'
  )
  return `mailto:${email}?subject=${subject}`
}

export default function FloatingHelperMenu() {
  const { isAuthenticated, lang, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Current language fallback to 'en'
  const currentLang = lang || 'en'
  const t = translations[currentLang]

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close menu on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Delay visibility to avoid hydration mismatch
  useEffect(() => {
    setIsVisible(isAuthenticated)
  }, [isAuthenticated])

  // Don't render if not authenticated
  if (!isVisible) {
    return null
  }

  const handleDownloadPdf = () => {
    const pdfPath = PDF_PATHS[currentLang]
    const filename = currentLang === 'fr' ? 'leasemintVC2026FR.pdf' : 'leasemintVC2026EN.pdf'
    const link = document.createElement('a')
    link.href = pdfPath
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setIsOpen(false)
  }

  const handleViewPresentation = () => {
    window.open(PRESENTATION_URLS[currentLang], '_blank')
    setIsOpen(false)
  }

  const handleContact = () => {
    window.location.href = getContactMailto(currentLang)
    setIsOpen(false)
  }

  const handleSwitchLang = () => {
    const newLang = currentLang === 'fr' ? 'en' : 'fr'
    window.location.href = `/vc_${newLang}`
  }

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-50">
      {/* Menu Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-64 bg-white dark:bg-brand-900 rounded-xl shadow-2xl border border-brand-200 dark:border-brand-700 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Header */}
          <div className="px-4 py-3 bg-primary-500 text-white dark:text-brand-950">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{t.menu}</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label={t.close}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {/* Download PDF */}
            <button
              onClick={handleDownloadPdf}
              className="w-full px-4 py-3 flex items-center gap-3 text-left text-brand-700 dark:text-brand-200 hover:bg-brand-50 dark:hover:bg-brand-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              <span>{t.downloadPdf}</span>
            </button>

            {/* View Presentation */}
            <button
              onClick={handleViewPresentation}
              className="w-full px-4 py-3 flex items-center gap-3 text-left text-brand-700 dark:text-brand-200 hover:bg-brand-50 dark:hover:bg-brand-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500">
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
              <span>{t.viewPresentation}</span>
            </button>

            <div className="h-px bg-brand-200 dark:bg-brand-700 my-2" />

            {/* Contact */}
            <button
              onClick={handleContact}
              className="w-full px-4 py-3 flex items-center gap-3 text-left text-brand-700 dark:text-brand-200 hover:bg-brand-50 dark:hover:bg-brand-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>{t.contact}</span>
            </button>

            {/* Switch Language */}
            <button
              onClick={handleSwitchLang}
              className="w-full px-4 py-3 flex items-center gap-3 text-left text-brand-700 dark:text-brand-200 hover:bg-brand-50 dark:hover:bg-brand-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              <span>{t.switchLang}</span>
            </button>

            <div className="h-px bg-brand-200 dark:bg-brand-700 my-2" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 flex items-center gap-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
              <span>{t.logout}</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
          isOpen
            ? 'bg-brand-600 dark:bg-brand-700 rotate-45'
            : 'bg-primary-500 hover:bg-primary-600 dark:hover:bg-primary-400'
        }`}
        aria-label={t.menu}
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white dark:text-brand-950"
        >
          {isOpen ? (
            <path d="M18 6 6 18M6 6l12 12" />
          ) : (
            <>
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </>
          )}
        </svg>
      </button>
    </div>
  )
}
