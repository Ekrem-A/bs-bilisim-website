'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook } from 'lucide-react';

// Custom Instagram icon (lucide-react removed it)
const Instagram = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
import { supabase } from '@/lib/supabase';

interface SocialLinks {
  facebook?: string;
  instagram?: string;
}

interface ContactInfo {
  site_name: string;
  site_description: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  contact_city: string;
}

const Footer = () => {
  const [loading, setLoading] = useState(true);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    facebook: '',
    instagram: '',
  });
  
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    site_name: '',
    site_description: '',
    contact_email: '',
    contact_phone: '',
    contact_address: '',
    contact_city: '',
  });

  useEffect(() => {
    loadSettings();
  }, []);

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
          site_name: data.site_name || 'BS Bilişim',
          site_description: data.site_description || 'Teknoloji Çözümleri',
          contact_email: data.contact_email || 'info@bsbilisim.com',
          contact_phone: formatPhoneDisplay(data.contact_phone) || '+90 (XXX) XXX XX XX',
          contact_address: data.contact_address || 'İstanbul, Türkiye',
          contact_city: data.contact_city || 'İstanbul',
        });
      } else {
        // Set fallback values
        setContactInfo({
          site_name: 'BS Bilişim',
          site_description: 'Teknoloji Çözümleri',
          contact_email: 'info@bsbilisim.com',
          contact_phone: '+90 (XXX) XXX XX XX',
          contact_address: 'İstanbul, Türkiye',
          contact_city: 'İstanbul',
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      setContactInfo({
        site_name: 'BS Bilişim',
        site_description: 'Teknoloji Çözümleri',
        contact_email: 'info@bsbilisim.com',
        contact_phone: '+90 (XXX) XXX XX XX',
        contact_address: 'İstanbul, Türkiye',
        contact_city: 'İstanbul',
      });
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <footer id="iletisim" className="bg-gradient-to-b from-gray-900 via-black to-gray-900 border-t border-cyan-500/30 py-12">
      {loading ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-6 bg-gray-800 animate-pulse rounded w-3/4"></div>
                <div className="h-4 bg-gray-800 animate-pulse rounded w-1/2"></div>
                <div className="h-4 bg-gray-800 animate-pulse rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 relative">
                <Image
                  src="/bs-logo.png"
                  alt="BS Bilişim Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-white font-bold">{contactInfo.site_name}</h3>
                <p className="text-xs text-cyan-400 font-semibold">{contactInfo.site_description}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bilgisayar donanımları ve gaming ekipmanlarında güvenilir çözüm ortağınız.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wide text-sm">Kategoriler</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors font-medium">
                  İşlemciler
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors font-medium">
                  Ekran Kartları
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors font-medium">
                  Soğutma Sistemleri
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors font-medium">
                  Tüm Kategoriler
                </a>
              </li>
            </ul>
          </div>

          {/* Corporate */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wide text-sm">Kurumsal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/hakkimizda" className="hover:text-cyan-400 transition-colors font-medium">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/gorgonx" className="hover:text-cyan-400 transition-colors font-medium">
                  GorgonX Markası
                </Link>
              </li>
              <li>
                <Link href="/kampanya" className="hover:text-cyan-400 transition-colors font-medium">
                  Kampanyalı Ürünler
                </Link>
              </li>
              <li>
                <Link href="/yazilim" className="hover:text-cyan-400 transition-colors font-medium">
                  Yazılım Hizmetleri
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-cyan-400 transition-colors font-medium">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wide text-sm">İletişim</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="font-medium">Email: {contactInfo.contact_email}</li>
              <li className="font-medium">Tel: {contactInfo.contact_phone}</li>
              <li className="font-medium">Adres: {contactInfo.contact_address}</li>
            </ul>
            
            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-white font-bold mb-3 uppercase tracking-wide text-xs">Sosyal Medya</h5>
              <div className="flex space-x-3">
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center text-cyan-400 hover:bg-cyan-500/30 hover:border-cyan-400 hover:text-cyan-300 transition-all group"
                  >
                    <Facebook size={20} className="group-hover:scale-110 transition-transform" />
                  </a>
                )}
                {socialLinks.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center text-cyan-400 hover:bg-cyan-500/30 hover:border-cyan-400 hover:text-cyan-300 transition-all group"
                  >
                    <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cyan-500/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm font-medium">
            © 2024 BS Bilişim. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium">
              Kullanım Koşulları
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium">
              Gizlilik
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium">
              Çerezler
            </a>
          </div>
        </div>
      </div>
      )}
    </footer>
  );
};

export default Footer;
