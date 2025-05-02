import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TMPL 2.0 - Toastmasters Premier League',
  description: 'Official website for TMPL 2.0 - Toastmasters Cricket Tournament',
  icons: {
    icon: '/tm_white.png',
    apple: '/tm_whote.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body>{children}</body>
    </html>
  )
}
