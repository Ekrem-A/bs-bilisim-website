'use client';

import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Building2, Globe, Facebook } from 'lucide-react';

// Custom Instagram icon (lucide-react removed it)
const Instagram = ({ size = 32, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { supabase } from '@/lib/supabase';

interface SocialLinks {
  facebook?: string;
  instagram?: string;
}

interface ContactInfo {
  site_name: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  contact_city: string;
  business_hours: string;
  tax_office: string;
  tax_number: string;
  mersis_number: string;
}

const ContactPage = () => {
  const [loading, setLoading] = useState(true);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    facebook: '',
    instagram: '',
  });
  
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    site_name: '',
    contact_email: '',
    contact_phone: '',
    contact_address: '',
    contact_city: '',
    business_hours: '',
    tax_office: '',
    tax_number: '',
    mersis_number: '',
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const formatPhoneDisplay = (phone: string) => {
    if (!phone) return '';
    
    // Sadece rakamları al
    const numbers = phone.replace(/\D/g, '');
    
    // 0 ile başlıyorsa 0'ı atla, 90 ile başlıyorsa onu da atla
    let cleanNumbers = numbers;
    if (numbers.startsWith('90')) {
      cleanNumbers = numbers.slice(2);
    } else if (numbers.startsWith('0')) {
      cleanNumbers = numbers.slice(1);
    }
    
    // En az 10 rakam yoksa olduğu gibi döndür
    if (cleanNumbers.length < 10) return phone;
    
    // Format: +90 (XXX) XXX XX XX
    const formatted = `+90 (${cleanNumbers.slice(0, 3)}) ${cleanNumbers.slice(3, 6)} ${cleanNumbers.slice(6, 8)} ${cleanNumbers.slice(8, 10)}`;
    return formatted;
  };

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (data && !error) {
        setSocialLinks({
          facebook: data.social_facebook || '',
          instagram: data.social_instagram || '',
        });
        setContactInfo({
          site_name: data.site_name || 'BS Bilişim Teknoloji ve Yazılım A.Ş.',
          contact_email: data.contact_email || 'info@bsbilisim.com',
          contact_phone: formatPhoneDisplay(data.contact_phone) || '+90 (212) 555 12 34',
          contact_address: data.contact_address || 'Maltepe Mahallesi Litros Yolu Sokak No: 10/A',
          contact_city: data.contact_city || 'Zeytinburnu, İstanbul',
          business_hours: data.business_hours || 'Pazartesi - Cuma: 09:00 - 18:00',
          tax_office: data.tax_office || 'Zeytinburnu Vergi Dairesi',
          tax_number: data.tax_number || '1234567890',
          mersis_number: data.mersis_number || '0123456789012345',
        });
      } else {
        setContactInfo({
          site_name: 'BS Bilişim Teknoloji ve Yazılım A.Ş.',
          contact_email: 'info@bsbilisim.com',
          contact_phone: '+90 (212) 555 12 34',
          contact_address: 'Maltepe Mahallesi Litros Yolu Sokak No: 10/A',
          contact_city: 'Zeytinburnu, İstanbul',
          business_hours: 'Pazartesi - Cuma: 09:00 - 18:00',
          tax_office: 'Zeytinburnu Vergi Dairesi',
          tax_number: '1234567890',
          mersis_number: '0123456789012345',
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      setContactInfo({
        site_name: 'BS Bilişim Teknoloji ve Yazılım A.Ş.',
        contact_email: 'info@bsbilisim.com',
        contact_phone: '+90 (212) 555 12 34',
        contact_address: 'Maltepe Mahallesi Litros Yolu Sokak No: 10/A',
        contact_city: 'Zeytinburnu, İstanbul',
        business_hours: 'Pazartesi - Cuma: 09:00 - 18:00',
        tax_office: 'Zeytinburnu Vergi Dairesi',
        tax_number: '1234567890',
        mersis_number: '0123456789012345',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Header />
      
      {loading ? (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500"></div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black border-b border-cyan-500/30 py-20">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 blur-[120px]"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="text-center">
                <h1 className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                  BİZE <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">ULAŞIN</span>
            </h1>
            <p className="text-xl text-gray-300 font-medium max-w-3xl mx-auto">
              Sorularınız, önerileriniz veya destek talepleriniz için bize ulaşabilirsiniz. Ekibimiz size yardımcı olmaktan mutluluk duyar.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Address */}
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/50">
                <MapPin size={28} className="text-white" />
              </div>
              <h3 className="text-white font-black uppercase tracking-wide mb-2">ADRES</h3>
              <p className="text-gray-400 font-medium">
                {contactInfo.contact_address}<br />
                {contactInfo.contact_city}<br />
                Türkiye
              </p>
            </div>

            {/* Phone */}
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/50">
                <Phone size={28} className="text-white" />
              </div>
              <h3 className="text-white font-black uppercase tracking-wide mb-2">TELEFON</h3>
              <p className="text-gray-400 font-medium">
                <a href={`tel:${contactInfo.contact_phone.replace(/\s/g, '')}`} className="hover:text-cyan-400 transition-colors">
                  {contactInfo.contact_phone}
                </a>
              </p>
            </div>

            {/* Email */}
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/50">
                <Mail size={28} className="text-white" />
              </div>
              <h3 className="text-white font-black uppercase tracking-wide mb-2">E-POSTA</h3>
              <p className="text-gray-400 font-medium">
                <a href={`mailto:${contactInfo.contact_email}`} className="hover:text-cyan-400 transition-colors">
                  {contactInfo.contact_email}
                </a>
              </p>
            </div>

            {/* Working Hours */}
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/50">
                <Clock size={28} className="text-white" />
              </div>
              <h3 className="text-white font-black uppercase tracking-wide mb-2">ÇALIŞMA SAATLERİ</h3>
              <p className="text-gray-400 font-medium" style={{ whiteSpace: 'pre-line' }}>
                {contactInfo.business_hours}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Map & Company Info */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map */}
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20 h-[500px]">
              <iframe                
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2900.6978044066286!2d29.1358386!3d40.926102199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac7d0f7b6e025%3A0xf2fd936737e8e86c!2sBS%20Bili%C5%9Fim!5e1!3m2!1str!2str!4v1764181994113!5m2!1str!2str"
                width="100%"           
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Company Info */}
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-2xl p-8 shadow-2xl shadow-cyan-500/20">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-6">
                ŞİRKET BİLGİLERİ
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/50">
                    <Building2 size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wide text-sm mb-1">ŞİRKET ADI</h4>
                    <p className="text-gray-400 font-medium">{contactInfo.site_name}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/50">
                    <Globe size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wide text-sm mb-1">VERGİ DAİRESİ</h4>
                    <p className="text-gray-400 font-medium">{contactInfo.tax_office}</p>
                    <p className="text-gray-400 font-medium">Vergi No: {contactInfo.tax_number}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/50">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wide text-sm mb-1">MERSIS NO</h4>
                    <p className="text-gray-400 font-medium">{contactInfo.mersis_number}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-cyan-500/30">
                <p className="text-gray-400 text-sm font-medium leading-relaxed">
                  BS Bilişim, 2010 yılından bu yana bilgisayar donanımları ve gaming ekipmanları konusunda 
                  profesyonel çözümler sunmaktadır. GorgonX markasıyla kendi ürünlerimizi üretmekte ve 
                  müşterilerimize en kaliteli hizmeti vermeyi hedeflemekteyiz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 relative border-t border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">
              SIKÇA SORULAN SORULAR
            </h2>
            <p className="text-gray-400 font-medium">En çok merak edilen sorular ve yanıtları</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400 transition-all">
              <h3 className="text-white font-bold mb-2 uppercase tracking-wide text-sm">Kargo süresi ne kadar?</h3>
              <p className="text-gray-400 text-sm font-medium">
                Siparişleriniz 1-3 iş günü içinde kargoya verilir. Teslimat süresi bölgenize göre 2-5 iş günü arasında değişmektedir.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400 transition-all">
              <h3 className="text-white font-bold mb-2 uppercase tracking-wide text-sm">İade politikanız nasıl?</h3>
              <p className="text-gray-400 text-sm font-medium">
                14 gün içinde ürünlerinizi iade edebilirsiniz. Ürün kullanılmamış ve orijinal ambalajında olmalıdır.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400 transition-all">
              <h3 className="text-white font-bold mb-2 uppercase tracking-wide text-sm">GorgonX garanti süresi?</h3>
              <p className="text-gray-400 text-sm font-medium">
                Tüm GorgonX ürünlerimiz 2 yıl resmi distribütör garantisi ile satılmaktadır.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400 transition-all">
              <h3 className="text-white font-bold mb-2 uppercase tracking-wide text-sm">Toplu alımlarda indirim var mı?</h3>
              <p className="text-gray-400 text-sm font-medium">
                Kurumsal ve toplu alımlar için özel fiyatlandırma sunuyoruz. Detaylı bilgi için iletişime geçin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-12 relative border-t border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4">
              SOSYAL MEDYADA BİZ
            </h2>
            <p className="text-gray-400 font-medium">Bizi takip edin ve güncel haberlerden haberdar olun</p>
          </div>

          <div className="flex justify-center space-x-6">
            {socialLinks.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-xl p-8 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all flex flex-col items-center space-y-3 min-w-[150px]"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/50">
                  <Facebook size={32} className="text-white" />
                </div>
                <span className="text-white font-bold uppercase tracking-wide text-sm">Facebook</span>
              </a>
            )}

            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/30 rounded-xl p-8 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all flex flex-col items-center space-y-3 min-w-[150px]"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/50">
                  <Instagram size={32} className="text-white" />
                </div>
                <span className="text-white font-bold uppercase tracking-wide text-sm">Instagram</span>
              </a>
            )}
          </div>
        </div>
      </section>
      </>
      )}
    </div>
  );
};

export default ContactPage;
