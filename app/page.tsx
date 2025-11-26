import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import HeroSection from '@/components/sections/HeroSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection';
import GorgonXSection from '@/components/sections/GorgonXSection';
import BrandsSection from '@/components/sections/BrandsSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProductsSection />
        <GorgonXSection />
        <BrandsSection />
      </main>
      <Footer />
    </div>
  );
}
