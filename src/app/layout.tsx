import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
