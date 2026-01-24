'use client'

import { useTheme } from './ThemeProvider'

/**
 * ThemeToggle Component
 * 
 * Icon button to toggle between light and dark themes.
 * Sun icon for dark mode (click to switch to light)
 * Moon icon for light mode (click to switch to dark)
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 p-3 rounded-full bg-opacity-20 backdrop-blur-sm border transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 z-50
        dark:bg-white/10 dark:border-white/20 dark:hover:bg-white/20 dark:focus:ring-white/30 dark:focus:ring-offset-brand-950
        bg-brand-900/10 border-brand-900/20 hover:bg-brand-900/20 focus:ring-brand-900/30 focus:ring-offset-white"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        // Sun icon - shown in dark mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      ) : (
        // Moon icon - shown in light mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-brand-900"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  )
}
