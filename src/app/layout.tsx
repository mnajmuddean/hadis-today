import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hadis Today',
  description: 'Hadis Today is a dedicated web application designed to provide daily inspiration and guidance through the teachings of Hadis.',
  icons: '/hadis-today.ico'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/hadis-today.ico" />
        <link
            href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap"
            rel="stylesheet"
          />
        <title>Hadis Today</title>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
