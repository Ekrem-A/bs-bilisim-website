import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Building2, Users, Award, TrendingUp, Shield, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hakkımızda - BS Bilişim',
  description: 'BS Bilişim, 5 yıldır bilişim sektöründe güvenilir ve kaliteli hizmet sunmaktadır. Bilgisayar donanımları, gaming ekipmanları ve özel markaımız GorgonX ile müşteri memnuniyeti odaklı çalışıyoruz.',
  openGraph: {
    title: 'Hakkımızda - BS Bilişim',
    description: 'BS Bilişim, 5 yıldır bilişim sektöründe güvenilir ve kaliteli hizmet sunmaktadır.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Hakkımızda
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            BS Bilişim, 5 yıldır bilişim sektöründe güvenilir ve kaliteli hizmet sunmaktadır
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-12 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6">Hikayemiz</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              BS Bilişim, bilgisayar donanımları ve gaming ekipmanları konusunda uzmanlaşmış, 
              müşteri memnuniyetini en üst seviyede tutan bir e-ticaret platformudur. 
              2020 yılında kurulan şirketimiz, sektördeki 5 yıllık deneyimiyle binlerce 
              müşteriye hizmet vermiştir.
            </p>
            <p>
              Vizyonumuz, Türkiye'nin en güvenilir ve kapsamlı bilgisayar donanımları 
              platformu olmaktır. İşlemcilerden ekran kartlarına, anakartlardan soğutma 
              sistemlerine kadar geniş ürün yelpazemizle, hem bireysel kullanıcıların 
              hem de kurumsal müşterilerin ihtiyaçlarına cevap veriyoruz.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Güvenilirlik</h3>
            <p className="text-gray-300">
              Orijinal ürünler ve resmi garantilerle güvenli alışveriş deneyimi
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Clock className="text-blue-400" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Hızlı Teslimat</h3>
            <p className="text-gray-300">
              Türkiye genelinde hızlı ve güvenli kargo ile aynı gün teslimat seçeneği
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Award className="text-green-400" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Kalite</h3>
            <p className="text-gray-300">
              Dünya çapında tanınmış markalar ve premium ürün seçenekleri
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="bg-orange-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="text-orange-400" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Müşteri Odaklı</h3>
            <p className="text-gray-300">
              7/24 müşteri desteği ve satış sonrası hizmet garantisi
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="bg-pink-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="text-pink-400" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Yenilikçi</h3>
            <p className="text-gray-300">
              En yeni teknolojiler ve trend ürünler sürekli güncellenen kataloğumuzda
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="bg-yellow-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Building2 className="text-yellow-400" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Kurumsal</h3>
            <p className="text-gray-300">
              Kurumsal müşterilere özel toplu alım ve proje çözümleri
            </p>
          </div>
        </div>

        {/* GorgonX Section */}
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Özel Markamız: GorgonX</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              GorgonX, BS Bilişim'in özel gaming ve yüksek performans bilgisayar 
              donanımları markasıdır. Yılların deneyimi ve sektör bilgisiyle geliştirilen 
              GorgonX ürünleri, performans, kalite ve fiyat dengesini mükemmel şekilde 
              bir araya getirmektedir.
            </p>
            <p>
              Mouse ve klavyelerden soğutma sistemlerine, PSU'lardan kaslara kadar 
              geniş bir ürün yelpazesiyle, oyuncuların ve profesyonellerin ihtiyaçlarına 
              özel çözümler sunuyoruz. Her bir GorgonX ürünü, titiz kalite kontrol 
              süreçlerinden geçer ve uzun ömürlü kullanım garantisi ile sunulur.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">5+</div>
            <div className="text-gray-400">Yıl Tecrübe</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">10K+</div>
            <div className="text-gray-400">Mutlu Müşteri</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">1000+</div>
            <div className="text-gray-400">Ürün Çeşidi</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">7/24</div>
            <div className="text-gray-400">Müşteri Desteği</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
