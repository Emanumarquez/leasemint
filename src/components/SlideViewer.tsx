'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

/**
 * SlideViewer Component
 * 
 * Displays presentation slides in a fullscreen-capable viewer.
 * Supports keyboard navigation and swipe gestures.
 * 
 * Props:
 * - slides: Array of slide image URLs
 * - lang: 'fr' | 'en' for UI text
 */

interface SlideViewerProps {
  slides: string[]
  lang: 'fr' | 'en'
}

const translations = {
  fr: {
    slide: 'Diapositive',
    of: 'sur',
    prev: 'Précédent',
    next: 'Suivant',
    fullscreen: 'Plein écran',
    exit: 'Quitter',
    keyboard: 'Utilisez ← → pour naviguer',
  },
  en: {
    slide: 'Slide',
    of: 'of',
    prev: 'Previous',
    next: 'Next',
    fullscreen: 'Fullscreen',
    exit: 'Exit',
    keyboard: 'Use ← → to navigate',
  },
}

export default function SlideViewer({ slides, lang }: SlideViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const t = translations[lang]

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev))
  }, [slides.length])

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev))
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        goToNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPrev()
      } else if (e.key === 'Escape') {
        setIsFullscreen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrev])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  if (slides.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-adaptive-secondary">
        No slides available
      </div>
    )
  }

  return (
    <div className={`flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      {/* Slide Container */}
      <div className="relative flex-1 flex items-center justify-center bg-black/5 dark:bg-white/5 rounded-lg overflow-hidden min-h-[60vh]">
        {/* Current Slide */}
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <Image
            src={slides[currentSlide]}
            alt={`${t.slide} ${currentSlide + 1}`}
            width={1920}
            height={1080}
            className="max-w-full max-h-full object-contain rounded shadow-2xl"
            priority
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          disabled={currentSlide === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label={t.prev}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>

        <button
          onClick={goToNext}
          disabled={currentSlide === slides.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label={t.next}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/5 dark:bg-white/5 rounded-b-lg">
        {/* Slide Counter */}
        <div className="text-sm text-adaptive-secondary">
          {t.slide} {currentSlide + 1} {t.of} {slides.length}
        </div>

        {/* Slide Dots */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-[50%] py-1">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all flex-shrink-0 ${
                index === currentSlide 
                  ? 'bg-primary-500 w-4' 
                  : 'bg-gray-400 dark:bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`${t.slide} ${index + 1}`}
            />
          ))}
        </div>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="text-sm text-adaptive-secondary hover:text-primary-500 transition-colors flex items-center gap-2"
        >
          {isFullscreen ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
              </svg>
              {t.exit}
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
              </svg>
              {t.fullscreen}
            </>
          )}
        </button>
      </div>

      {/* Keyboard Hint */}
      <p className="text-center text-xs text-adaptive-secondary mt-2 opacity-60">
        {t.keyboard}
      </p>
    </div>
  )
}
