import { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { Code, Server, Database, Shield, Rocket, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Yazılım Hizmetleri - BS Bilişim',
  description: 'BS Bilişim yazılım hizmetleri. Web sitesi geliştirme, e-ticaret çözümleri, mobil uygulama, kurumsal yazılım, dijital dönüşüm ve yazılım danışmanlığı hizmetleri.',
  openGraph: {
    title: 'Yazılım Hizmetleri - BS Bilişim',
    description: 'Profesyonel yazılım geliştirme ve dijital dönüşüm çözümleri.',
    type: 'website',
  },
};

export default function YazilimPage() {
  const services = [
    {
      icon: Code,
      title: 'Web Geliştirme',
      description: 'Modern teknolojiler ile responsive, hızlı ve SEO uyumlu web siteleri',
      features: ['React & Next.js', 'TypeScript', 'Responsive Tasarım', 'SEO Optimizasyonu'],
      color: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20',
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      icon: Rocket,
      title: 'E-Ticaret Çözümleri',
      description: 'Satışlarınızı artıracak güçlü e-ticaret platformları',
      features: ['Ödeme Entegrasyonu', 'Stok Yönetimi', 'Kargo Entegrasyonu', 'Admin Panel'],
      color: 'from-purple-500/10 to-pink-500/10 border-purple-500/20',
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    },
    {
      icon: Server,
      title: 'Kurumsal Yazılım',
      description: 'İşletmenize özel ERP, CRM ve iş takip sistemleri',
      features: ['Özel Yazılım', 'ERP Sistemleri', 'CRM Çözümleri', 'İş Süreçleri'],
      color: 'from-green-500/10 to-emerald-500/10 border-green-500/20',
      iconColor: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    {
      icon: Database,
      title: 'Veritabanı Yönetimi',
      description: 'Güvenli ve optimize edilmiş veritabanı çözümleri',
      features: ['PostgreSQL', 'MongoDB', 'Redis', 'Backup Sistemleri'],
      color: 'from-orange-500/10 to-red-500/10 border-orange-500/20',
      iconColor: 'text-orange-400',
      bgColor: 'bg-orange-500/20'
    },
    {
      icon: Shield,
      title: 'Güvenlik & Optimizasyon',
      description: 'Yazılımlarınızın güvenliği ve performans optimizasyonu',
      features: ['Güvenlik Testleri', 'Performans İyileştirme', 'Code Review', 'Penetrasyon Testi'],
      color: 'from-red-500/10 to-pink-500/10 border-red-500/20',
      iconColor: 'text-red-400',
      bgColor: 'bg-red-500/20'
    },
    {
      icon: Users,
      title: 'Danışmanlık',
      description: 'Dijital dönüşüm ve teknoloji danışmanlığı hizmetleri',
      features: ['Teknoloji Danışmanlığı', 'Proje Yönetimi', 'Eğitim', 'Teknik Destek'],
      color: 'from-yellow-500/10 to-orange-500/10 border-yellow-500/20',
      iconColor: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-6 py-2">
              <span className="text-blue-400 font-semibold">Yazılım Hizmetlerimiz</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Profesyonel Yazılım Çözümleri
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            İşletmenizin dijital dönüşümünde yanınızdayız. Modern teknolojiler ile 
            güçlü, güvenli ve ölçeklenebilir yazılım çözümleri sunuyoruz.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${service.color} rounded-2xl p-8 hover:scale-105 transition-all duration-300 group`}
            >
              <div className={`${service.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon className={service.iconColor} size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-300 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-400 flex items-center">
                    <div className={`w-1.5 h-1.5 rounded-full ${service.bgColor} mr-3`}></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700 mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Kullandığımız Teknolojiler</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'React', color: 'text-cyan-400' },
              { name: 'Next.js', color: 'text-white' },
              { name: 'TypeScript', color: 'text-blue-400' },
              { name: 'Node.js', color: 'text-green-400' },
              { name: 'Python', color: 'text-yellow-400' },
              { name: 'PostgreSQL', color: 'text-blue-300' },
              { name: 'MongoDB', color: 'text-green-500' },
              { name: 'Docker', color: 'text-blue-500' },
              { name: 'AWS', color: 'text-orange-400' },
              { name: 'Vercel', color: 'text-white' },
              { name: 'Git', color: 'text-orange-500' },
              { name: 'TailwindCSS', color: 'text-cyan-300' },
            ].map((tech, index) => (
              <div 
                key={index}
                className="bg-gray-700/30 rounded-lg p-4 text-center hover:bg-gray-700/50 transition-colors"
              >
                <div className={`${tech.color} font-semibold text-lg`}>{tech.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Çalışma Sürecimiz</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Analiz', desc: 'İhtiyaçlarınızı dinler, projenizi detaylı analiz ederiz' },
              { step: '2', title: 'Planlama', desc: 'Teknik çözüm ve zaman planını oluştururuz' },
              { step: '3', title: 'Geliştirme', desc: 'Modern teknolojiler ile kodlama yapılır' },
              { step: '4', title: 'Teslimat', desc: 'Test, eğitim ve canlıya alma süreçleri' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-400">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/30 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Projeniz İçin Teklif Alın
          </h2>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            Yazılım ihtiyaçlarınız için bizimle iletişime geçin. 
            Uzman ekibimiz size özel çözümler sunmak için hazır.
          </p>
          <a 
            href="/iletisim"
            className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            İletişime Geç
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
