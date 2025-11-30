import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BS Bilişim - Bilgisayar Donanımları ve Gaming Ekipmanları',
  description: 'BS Bilişim - Profesyonel bilgisayar donanımları, gaming ekipmanları ve özel markaımız GorgonX ürünleri. İşlemci, ekran kartı, soğutma sistemleri ve daha fazlası.',
  keywords: 'bilgisayar, donanım, gaming, GorgonX, işlemci, ekran kartı, soğutma, BS Bilişim',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/app/public/favicon.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
