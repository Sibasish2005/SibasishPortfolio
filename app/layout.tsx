import type { Metadata, Viewport } from 'next';
import { Syne, Inter, Space_Mono } from 'next/font/google';
import SmoothScrollProvider from '@/src/components/providers/SmoothScrollProvider';
import AudioProvider from '@/src/components/providers/AudioProvider';
import HeaderNav from '@/src/components/navigation/HeaderNav';
import { siteConfig } from '@/lib/site';
import { getBaseUrl } from '@/lib/seo';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['700', '800'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  applicationName: siteConfig.siteName,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: getBaseUrl() }],
  creator: siteConfig.name,
  publisher: siteConfig.siteName,
  category: 'technology',
  alternates: {
    canonical: 'https://sibasishdev.in',
    types: {
      'text/plain': [
        { url: '/llms.txt', title: 'LLM Context (Summary)' },
        { url: '/llms-full.txt', title: 'Full LLM Context' },
      ],
    },
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: 'https://sibasishdev.in',
    siteName: siteConfig.siteName,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Best Budget Software Developer, UI Engineer & Web Publisher in Agartala, Tripura`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/twitter-image'],
    creator: '@sibasish__chakraborti',
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
  icons: {
    icon: '/favicon.ico',
  },
  other: {
    'geo.region': 'IN-TR',
    'geo.placename': 'Agartala, Tripura',
    'geo.position': `${siteConfig.location.latitude};${siteConfig.location.longitude}`,
    ICBM: `${siteConfig.location.latitude}, ${siteConfig.location.longitude}`,
    telephone: siteConfig.phone,
    contact: siteConfig.phone,
    'revisit-after': '7 days',
    rating: 'general',
    distribution: 'global',
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${spaceMono.variable} antialiased`}
    >
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="Full LLM Context" />
      </head>
      <body className="min-h-screen bg-[#FFFFFF] text-[#0D0D0D] font-sans selection:bg-[#FF5500] selection:text-white">
        <SmoothScrollProvider>
          <AudioProvider>
            <HeaderNav />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-lg focus:outline-none"
            >
              Skip to content
            </a>
            <main id="main-content" className="w-full flex flex-col">{children}</main>
          </AudioProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
