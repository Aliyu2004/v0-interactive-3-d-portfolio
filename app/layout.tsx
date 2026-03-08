import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a1a",
};

export const metadata: Metadata = {
  title: 'Aliyu Yunus Muhammad | Portfolio',
  description: 'Immersive 3D portfolio of Aliyu Yunus Muhammad - Web Developer & AI Enthusiast. Explore projects, skills, and experience in a cinematic digital world.',
  keywords: ['web developer', 'AI', 'chatbot', 'portfolio', 'Aliyu Yunus Muhammad', '3D', 'interactive'],
  authors: [{ name: 'Aliyu Yunus Muhammad' }],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-[#0a0a1a]">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
