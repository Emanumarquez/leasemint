import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AuthProvider } from '@/components/AuthContext'
import ThemeToggle from '@/components/ThemeToggle'
import FloatingHelperMenu from '@/components/FloatingHelperMenu'

export const metadata: Metadata = {
  title: 'LeaseMint',
  description: 'Secure investor access portal',
  icons: {
    icon: '/images/fav.png',
  },
  robots: {
    index: false, // Prevent search engine indexing
    follow: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <ThemeToggle />
            <FloatingHelperMenu />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
