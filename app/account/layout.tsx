'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import {
  LayoutDashboard,
  ShoppingBag,
  MapPin,
  User,
  Heart,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      // Check if admin - redirect to admin panel
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('is_admin, full_name')
        .eq('id', user.id)
        .single();

      if (profile?.is_admin) {
        router.push('/admin/dashboard');
        return;
      }

      setUser({ ...user, full_name: profile?.full_name || user.email });
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Pano', href: '/account' },
    { icon: ShoppingBag, label: 'Siparişler', href: '/account/orders' },
    { icon: MapPin, label: 'Adresler', href: '/account/addresses' },
    { icon: User, label: 'Hesap Detayları', href: '/account/details' },
    { icon: Heart, label: 'Favorilerim', href: '/account/favorites' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-slate-600">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden flex items-center justify-center space-x-2 bg-white border border-slate-200 text-slate-800 px-4 py-3 rounded-lg hover:border-cyan-400 transition-colors mb-4"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            <span>Menü</span>
          </button>

          {/* Mobile Overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
            className={`fixed lg:relative lg:block top-0 left-0 h-full lg:h-auto w-80 lg:w-64 bg-white rounded-xl border border-slate-200 p-6 z-50 transform transition-transform duration-300 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            } lg:sticky lg:top-24 lg:self-start`}
          >
            {/* User Info */}
            <div className="mb-6 pb-6 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {user?.full_name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <h3 className="text-slate-800 font-semibold">{user?.full_name || 'Kullanıcı'}</h3>
                  <p className="text-slate-500 text-sm">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Menu Title */}
            <h3 className="text-slate-800 font-bold text-lg mb-4">HESABIM</h3>

            {/* Navigation */}
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-slate-100 text-slate-800 font-medium'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={20} />
                <span>Çıkış Yap</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
