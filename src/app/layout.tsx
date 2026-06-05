import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
