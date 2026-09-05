import type { Metadata } from 'next';
import { Syne, Inter, Space_Mono } from 'next/font/google';
import SmoothScrollProvider from '@/src/components/providers/SmoothScrollProvider';
import AudioProvider from '@/src/components/providers/AudioProvider';
import HeaderNav from '@/src/components/navigation/HeaderNav';
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
  title: 'SIBASISH CHAKRABORTI // Full Stack Developer & UI Engineer — Agartala, India',
  description:
    'Official portfolio of Sibasish Chakraborti (sibasishdev). Top Full Stack Developer, UI Engineer, and Best Budget Software Developer in Agartala, Tripura, India. Specialized in Next.js, FastAPI, WebGL 3D shaders, and AI integrations.',
  keywords: [
    'Sibasish Chakraborti',
    'sibasishdev',
    'siv.dev',
    'Full Stack Developer Agartala',
    'UI Engineer Agartala',
    'Best Budget Software Developer in Agartala',
    'Best Freelancer in Tripura',
    'DigiPanch',
    'Next.js',
    'FastAPI',
    'WebGL',
  ],
  authors: [{ name: 'Sibasish Chakraborti', url: 'https://sibasishdev.in' }],
  creator: 'Sibasish Chakraborti',
  metadataBase: new URL('https://sibasishdev.in'),
  openGraph: {
    title: 'SIBASISH CHAKRABORTI // Full Stack Developer & UI Engineer',
    description:
      'High-performance full-stack web applications, reactive WebGL 3D worlds, and AI-powered systems. Based in Agartala, Tripura, India.',
    url: 'https://sibasishdev.in',
    siteName: 'Sibasish Chakraborti Portfolio',
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
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
      <body className="min-h-screen bg-[#FFFFFF] text-[#0D0D0D] font-sans selection:bg-[#FF5500] selection:text-white">
        <SmoothScrollProvider>
          <AudioProvider>
            <HeaderNav />
            <main className="w-full flex flex-col">{children}</main>
          </AudioProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
