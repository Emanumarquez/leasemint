'use client'

import { useState } from 'react'

/**
 * EmbeddedPresentation Component
 * 
 * Embeds the external Gamma presentation in an iframe.
 * This allows the floating menu to stay visible while viewing the presentation.
 */

interface EmbeddedPresentationProps {
  url: string
  lang: 'fr' | 'en'
}

const translations = {
  fr: {
    loading: 'Chargement de la presentation...',
    openNewTab: 'Ouvrir dans un nouvel onglet',
    fullscreen: 'Plein ecran',
    exitFullscreen: 'Quitter le plein ecran',
  },
  en: {
    loading: 'Loading presentation...',
    openNewTab: 'Open in new tab',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit fullscreen',
  },
}

export default function EmbeddedPresentation({ url, lang }: EmbeddedPresentationProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const t = translations[lang]

  const toggleFullscreen = () => {
    const container = document.getElementById('presentation-container')
    if (!container) return

    if (!document.fullscreenElement) {
      container.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div 
      id="presentation-container"
      className={`relative w-full bg-black rounded-lg overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-40 rounded-none' : 'aspect-video'
      }`}
    >
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-900">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-white/70 text-sm">{t.loading}</p>
          </div>
        </div>
      )}

      {/* Iframe */}
      <iframe
        src={url}
        className="w-full h-full border-0"
        onLoad={() => setIsLoading(false)}
        allow="fullscreen"
        title="Investor Presentation"
      />

      {/* Controls overlay */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 z-10">
        <button
          onClick={toggleFullscreen}
          className="px-3 py-1.5 bg-black/60 hover:bg-black/80 text-white text-sm rounded-lg backdrop-blur-sm transition-colors flex items-center gap-2"
        >
          {isFullscreen ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
              </svg>
              {t.exitFullscreen}
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
              </svg>
              {t.fullscreen}
            </>
          )}
        </button>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 bg-black/60 hover:bg-black/80 text-white text-sm rounded-lg backdrop-blur-sm transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          </svg>
          {t.openNewTab}
        </a>
      </div>
    </div>
  )
}
