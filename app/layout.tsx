import './global.css'
import type { Metadata } from 'next'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import  Providers  from './providers';

import { Quicksand } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-quicksand',
});

{/*  RouteLoader component not implemented, uncomment when added:
import RouteLoader from './components/RouteLoader';
*/}
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Yael N Borger',
    template: 'Portfolio Website',
  },
  description: "Yael Borger's Website.",
  icons: [{
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    url: '/ybLogo.png'
  }],
  openGraph: {
    title: 'Yael N Borger Website',
    description: 'This is my portfolio website.',
    url: baseUrl,
    siteName: 'Yael N Borger Website',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en" className={'${quicksand.variable}'} suppressHydrationWarning 
    >
      <body className="font-sans antialiased justify-center max-w-auto mx-4 mt-8">
        <main className="flex-auto min-w-0 mt-6 flex flex-col justify-center">
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
            </ThemeProvider>
          </Providers>
        </main>
      </body>
    </html>
  )
}