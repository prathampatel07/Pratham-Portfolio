import type { Metadata } from 'next';
import { Inter, Playfair_Display, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'), // TODO: Replace with your actual deployed domain
  title: 'Pratham Patel — AI Powered Full-Stack Developer',
  description:
    'Cinematic portfolio of Pratham Patel — AI-powered full-stack developer building immersive digital experiences with Next.js, React, Three.js and Machine Learning.',
  keywords: [
    'Pratham Patel',
    'Full-Stack Developer',
    'AI Developer',
    'Next.js',
    'React',
    'Three.js',
    'Portfolio',
    'Frontend Engineer',
  ],
  authors: [{ name: 'Pratham Patel' }],
  openGraph: {
    title: 'Pratham Patel — AI Powered Full-Stack Developer',
    description: 'Immersive cinematic portfolio — where AI meets modern frontend engineering.',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pratham Patel Portfolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pratham Patel — AI Powered Full-Stack Developer',
    description: 'Immersive cinematic portfolio — where AI meets modern frontend engineering.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
