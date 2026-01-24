import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Leasemint | Venture Capital',
  description: 'Empowering visionary founders building the future of technology. We invest in early-stage startups transforming industries.',
  keywords: ['venture capital', 'startup funding', 'tech investment', 'seed funding', 'series A'],
  openGraph: {
    title: 'Leasemint | Venture Capital',
    description: 'Empowering visionary founders building the future of technology.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
