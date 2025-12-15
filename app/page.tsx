import { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import CategoriesSection from '@/components/sections/CategoriesSection';
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection';
import GorgonXSection from '@/components/sections/GorgonXSection';
import BrandsSection from '@/components/sections/BrandsSection';
import StructuredData from '@/components/common/StructuredData';

// Loading component
function SectionLoader() {
  return (
    <div className="py-20 bg-gradient-to-b from-black via-gray-900 to-black border-b border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
        <p className="mt-4 text-cyan-400 font-bold">Yükleniyor...</p>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'BS Bilişim - Bilgisayar Donanımları, Gaming Ekipmanları ve GorgonX',
  description: 'Türkiye\'nin güvenilir bilgisayar donanımları mağazası. İşlemci, ekran kartı, anakart, RAM, SSD, soğutma sistemleri, mouse, klavye ve özel markaımız GorgonX ürünleri. Hızlı kargo, güvenli alışveriş.',
  openGraph: {
    title: 'BS Bilişim - Bilgisayar Donanımları ve Gaming Ekipmanları',
    description: 'Türkiye\'nin güvenilir bilgisayar donanımları mağazası. GorgonX, AMD, Intel, NVIDIA ürünleri.',
  },
};

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bs-bilisim-website.vercel.app';
  
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BS Bilişim',
    url: siteUrl,
    logo: `${siteUrl}/bs-logo.png`,
    description: 'Türkiye\'nin güvenilir bilgisayar donanımları mağazası',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-531-248-00-48',
      contactType: 'customer service',
      availableLanguage: 'Turkish'
    },
    sameAs: [
      // Sosyal medya linklerinizi buraya ekleyin
      // 'https://www.facebook.com/bsbilisim',
      // 'https://www.instagram.com/bsbilisim',
    ]
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BS Bilişim',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/products/all?search={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />
      <Header />
{/*       
      <Suspense fallback={<SectionLoader />}>
        <CategoriesSection />
      </Suspense> */}
      
      <main>
        <Suspense fallback={<SectionLoader />}>
          <FeaturedProductsSection />
        </Suspense>
        
        <GorgonXSection />
        
        <Suspense fallback={<SectionLoader />}>
          <BrandsSection />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
}
