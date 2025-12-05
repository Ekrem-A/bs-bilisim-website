'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, User, LogOut, Phone, Mail, Facebook, Instagram, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { supabase } from '@/lib/supabase';

interface ContactInfo {
  contact_email: string;
  contact_phone: string;
  social_facebook?: string;
  social_instagram?: string;
}

const Header = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    contact_email: 'info@bsbilisim.com',
    contact_phone: '+90 (212) 555 12 34',
    social_facebook: '',
    social_instagram: '',
  });
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products/all?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    checkUser();
    loadContactInfo();
    
    // Set initial cart count
    setCartItemCount(getTotalItems());
    
    // Subscribe to cart changes
    const unsubscribe = useCartStore.subscribe((state) => {
      setCartItemCount(state.getTotalItems());
    });
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        loadUserData(session?.user);
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setUserName('');
      }
    });

    return () => {
      unsubscribe();
      authListener?.subscription.unsubscribe();
    };
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

  const loadContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('contact_email, contact_phone, social_facebook, social_instagram')
        .single();

      if (data && !error) {
        setContactInfo({
          contact_email: data.contact_email || 'info@bsbilisim.com',
          contact_phone: formatPhoneDisplay(data.contact_phone) || '+90 (212) 555 12 34',
          social_facebook: data.social_facebook || '',
          social_instagram: data.social_instagram || '',
        });
      }
    } catch (error) {
      console.error('Error loading contact info:', error);
    }
  };

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      loadUserData(user);
    }
  };

  const loadUserData = async (user: any) => {
    if (!user) return;
    
    setIsLoggedIn(true);
    
    // Get user profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('full_name')
      .eq('id', user.id)
      .single();

    if (profile?.full_name) {
      setUserName(profile.full_name);
    } else {
      setUserName(user.email?.split('@')[0] || 'Kullanıcı');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b border-cyan-500/20 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left - Contact Info */}
            <div className="flex items-center space-x-4 text-xs">
              <a href={`tel:${contactInfo.contact_phone.replace(/\s/g, '')}`} className="hidden md:flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors group">
                <Phone size={14} className="group-hover:scale-110 transition-transform" />
                <span className="font-semibold">{contactInfo.contact_phone}</span>
              </a>
              <span className="hidden md:inline text-gray-700">|</span>
              <a href={`mailto:${contactInfo.contact_email}`} className="hidden sm:flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors group">
                <Mail size={14} className="group-hover:scale-110 transition-transform" />
                <span className="font-semibold">{contactInfo.contact_email}</span>
              </a>
            </div>

            {/* Right - Social Media Links */}
            <div className="flex items-center space-x-3">
              {contactInfo.social_facebook && (
                <a 
                  href={contactInfo.social_facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-all hover:scale-110 hover:bg-cyan-500/10 p-1.5 rounded"
                  title="Facebook"
                >
                  <Facebook size={16} />
                </a>
              )}
              {contactInfo.social_instagram && (
                <a 
                  href={contactInfo.social_instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-all hover:scale-110 hover:bg-cyan-500/10 p-1.5 rounded"
                  title="Instagram"
                >
                  <Instagram size={16} />
                </a>
              )}
              <a 
                href={`https://wa.me/${contactInfo.contact_phone.replace(/[^0-9]/g, '')}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-all hover:scale-110 hover:bg-green-500/10 p-1.5 rounded"
                title="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-500 text-white py-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)] animate-[shimmer_3s_infinite]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4 text-sm font-black uppercase tracking-wider">
            <span className="hidden sm:inline">⚡</span>
            <span>Ücretsiz Kargo - Tüm Siparişlerde</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden md:inline">24 Saat İçinde Teslimat</span>
            <span className="hidden sm:inline">🎮</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-md border-b-2 border-cyan-500/30 sticky top-0 z-50 shadow-2xl shadow-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-gray-900 to-black border-2 border-cyan-500/50 rounded-xl flex items-center justify-center">
                  <Image
                    src="/bs-logo.png"
                    alt="BS Bilişim Logo"
                    width={36}
                    height={36}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-wide">BS BİLİŞİM</h1>
                <p className="text-xs text-cyan-400 font-black uppercase tracking-wider">Teknoloji Çözümleri</p>
              </div>
            </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-all font-black uppercase tracking-wide text-sm hover:scale-105">
              Ana Sayfa
            </Link>
            <a href="/#kategoriler" className="text-gray-300 hover:text-cyan-400 transition-all font-black uppercase tracking-wide text-sm hover:scale-105">
              Kategoriler
            </a>
            <a href="/kampanya" className="text-gray-300 hover:text-cyan-400 transition-all font-black uppercase tracking-wide text-sm hover:scale-105">
              Kampanya
            </a>
            <a href="/gorgonx" className="text-gray-300 hover:text-cyan-400 transition-all font-black uppercase tracking-wide text-sm hover:scale-105">
              GorgonX
            </a>
            <a href="/hakkimizda" className="text-gray-300 hover:text-cyan-400 transition-all font-black uppercase tracking-wide text-sm hover:scale-105">
              Hakkımızda
            </a>
            <a href="/iletisim" className="text-gray-300 hover:text-cyan-400 transition-all font-black uppercase tracking-wide text-sm hover:scale-105">
              İletişim
            </a>
          </nav>

          {/* Search & Cart & Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Button & Form */}
            {searchOpen ? (
              <div className="absolute right-4 top-20 z-50">
                <form onSubmit={handleSearch} className="flex items-center space-x-2 bg-gray-900 p-2 rounded-lg shadow-2xl border border-cyan-500/30">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ürün ara..."
                    autoFocus
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-cyan-500/30 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none w-64"
                  />
                  <button 
                    type="submit"
                    className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all rounded-lg"
                  >
                    <Search size={22} />
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-2 text-gray-300 hover:text-red-400 transition-all"
                  >
                    <X size={22} />
                  </button>
                </form>
              </div>
            ) : null}
            
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-300 hover:text-cyan-400 transition-all hover:scale-110 hover:bg-cyan-500/10 rounded-lg"
            >
              <Search size={22} />
            </button>
            
            <Link href="/cart" className="p-2 text-gray-300 hover:text-cyan-400 transition-all relative hover:scale-110 hover:bg-cyan-500/10 rounded-lg">
              <ShoppingCart size={22} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-black shadow-xl shadow-cyan-500/50 animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {isLoggedIn ? (
              <>
                {/* Account Link */}
                <Link
                  href="/account"
                  className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-all font-black uppercase text-sm hover:scale-105 hover:bg-cyan-500/10 px-3 py-2 rounded-lg"
                >
                  <User size={18} />
                  <span>Hesabım</span>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 px-4 py-2 rounded-lg transition-all font-black uppercase text-sm shadow-xl shadow-red-500/50 hover:shadow-2xl hover:scale-105 border border-red-500/50"
                >
                  <LogOut size={18} />
                  <span>Çıkış</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative bg-gradient-to-r from-cyan-600 to-blue-700 text-white px-6 py-2 rounded-lg font-black uppercase tracking-wide hover:shadow-xl hover:shadow-cyan-500/50 transition-all border-2 border-cyan-400/50">
                  Giriş Yap
                </div>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-cyan-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-cyan-500/30 bg-gray-900/50 backdrop-blur-sm rounded-b-lg">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors font-bold">
                Ana Sayfa
              </Link>
              <a href="/#kategoriler" className="text-gray-300 hover:text-cyan-400 transition-colors font-bold">
                Kategoriler
              </a>
              <a href="/kampanya" className="text-gray-300 hover:text-cyan-400 transition-colors font-bold">
                Kampanyalı Ürünler
              </a>
              <a href="/gorgonx" className="text-gray-300 hover:text-cyan-400 transition-colors font-bold">
                GorgonX
              </a>
              <a href="/hakkimizda" className="text-gray-300 hover:text-cyan-400 transition-colors font-bold">
                Hakkımızda
              </a>
              <a href="/yazilim" className="text-gray-300 hover:text-cyan-400 transition-colors font-bold">
                Yazılım Hizmetleri
              </a>
              <a href="/iletisim" className="text-gray-300 hover:text-cyan-400 transition-colors font-bold">
                İletişim
              </a>
              <Link href="/cart" className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors font-bold">
                <ShoppingCart size={20} />
                <span>Sepetim ({cartItemCount})</span>
              </Link>
              
              {isLoggedIn ? (
                <>
                  {/* Mobile Account Link */}
                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors font-bold"
                  >
                    <User size={20} />
                    <span>Hesabım</span>
                  </Link>

                  {/* Mobile Logout */}
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-left hover:bg-red-700 transition-colors"
                  >
                    <LogOut size={20} />
                    <span>Çıkış Yap</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white px-6 py-2 rounded-lg font-bold text-center border border-cyan-500/50"
                >
                  Giriş Yap
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
    </>
  );
};

export default Header;
