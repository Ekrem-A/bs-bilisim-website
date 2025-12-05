import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bs-bilisim-website.vercel.app'),
  title: {
    default: 'BS Bilişim - Bilgisayar Donanımları ve Gaming Ekipmanları',
    template: '%s | BS Bilişim'
  },
  description: 'BS Bilişim - Türkiye\'nin güvenilir bilgisayar donanımları mağazası. İşlemci, ekran kartı, anakart, RAM, SSD, soğutma sistemleri ve özel markaımız GorgonX ürünleri. En uygun fiyatlarla hızlı kargo.',
  keywords: ['bilgisayar', 'donanım', 'gaming', 'GorgonX', 'işlemci', 'ekran kartı', 'soğutma', 'BS Bilişim', 'RAM', 'SSD', 'anakart', 'PSU', 'kasa', 'mouse', 'klavye', 'AMD', 'Intel', 'NVIDIA', 'gaming ekipmanları'],
  authors: [{ name: 'BS Bilişim' }],
  creator: 'BS Bilişim',
  publisher: 'BS Bilişim',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://bs-bilisim-website.vercel.app',
    title: 'BS Bilişim - Bilgisayar Donanımları ve Gaming Ekipmanları',
    description: 'Türkiye\'nin güvenilir bilgisayar donanımları mağazası. İşlemci, ekran kartı, soğutma sistemleri ve GorgonX ürünleri.',
    siteName: 'BS Bilişim',
    images: [
      {
        url: '/og-image.jpg', // Bu görseli eklemeniz gerekecek
        width: 1200,
        height: 630,
        alt: 'BS Bilişim',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BS Bilişim - Bilgisayar Donanımları',
    description: 'Türkiye\'nin güvenilir bilgisayar donanımları mağazası',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'phcFj-XKtl2aKkgd3T60rQ7JLMSkiyHQQop9NYJ_xes',
    // yandex: 'yandex-verification-code', // Yandex Webmaster'dan alacağınız kod
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}






