import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GorgonX - Özel Gaming ve Performans Ürünleri | BS Bilişim',
  description: 'GorgonX, BS Bilişim\'in özel gaming markası. Soğutma sistemleri, mouse, klavye, PSU, kasa ve daha fazlası. Yüksek performans, uygun fiyat. Gaming ekipmanlarında uzman çözümler.',
  openGraph: {
    title: 'GorgonX - Özel Gaming Markası | BS Bilişim',
    description: 'Yüksek performans gaming ekipmanları. Soğutma, mouse, klavye, PSU ve daha fazlası.',
    type: 'website',
  },
};

export default function GorgonXLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
