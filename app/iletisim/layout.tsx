import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim - BS Bilişim',
  description: 'BS Bilişim ile iletişime geçin. Konum bilgilerimiz, telefon numaramız, e-posta adresimiz ve çalışma saatlerimiz. 7/24 müşteri desteği için bizimle iletişime geçebilirsiniz.',
  openGraph: {
    title: 'İletişim - BS Bilişim',
    description: 'Bizimle iletişime geçin. 7/24 müşteri desteği.',
    type: 'website',
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
