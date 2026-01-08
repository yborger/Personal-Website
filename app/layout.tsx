import './global.css'
import type { Metadata } from 'next'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import RouteLoader from './components/RouteLoader';

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
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black'      )}
    >
      <body className="antialiased justify-center max-w-auto mx-4 mt-8">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}



{/* this following chunk of code is the non-functional work-in-progress
    that aims to implement dark mode toggling across the site.
    right now, it does not work because:
      -cannot use client side (no "use client")
      -cannot use the .get for cookies on the server side for some odd reason

    Plan of Action: new options for cookies, check other websites for how it's done

      import './global.css'
import type { Metadata } from 'next'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import RouteLoader from './components/RouteLoader';
import { cookies } from 'next/headers';

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

export default function RootLayout({children,}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies();
  const theme = (await cookieStore).get('theme')?.value || "light";
  return (
    <html lang="en" className={theme === "dark" ? "dark" : ""}>
      <body className="text-black bg-white dark:text-white dark:bg-black antialiased justify-center max-w-auto mx-4 mt-8">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}

  */}