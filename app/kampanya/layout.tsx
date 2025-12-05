import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kampanyalı Ürünler - İndirimli Bilgisayar Donanımları | BS Bilişim',
  description: 'BS Bilişim kampanyalı ürünler. İndirimli işlemci, ekran kartı, anakart, RAM, SSD ve gaming ekipmanları. Fırsat ürünlerinde sınırlı stok, hızlı kargo.',
  openGraph: {
    title: 'Kampanyalı Ürünler - BS Bilişim',
    description: 'Sınırlı stokta! İndirimli bilgisayar donanımları ve gaming ekipmanları.',
    type: 'website',
  },
};

export default function KampanyaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
