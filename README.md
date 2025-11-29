# BS Bilişim E-Commerce Website

Modern ve responsive e-ticaret platformu. Next.js 14, TypeScript, Tailwind CSS ve Supabase ile geliştirilmiştir.

## 🚀 Teknolojiler

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **State Management:** Zustand
- **Icons:** Lucide React
- **Deployment:** Vercel

## 📋 Özellikler

- ✅ Modern ve agresif dark cyan temalı tasarım
- ✅ Kullanıcı kayıt/giriş sistemi
- ✅ Admin paneli (ürün, sipariş, kullanıcı yönetimi)
- ✅ Alışveriş sepeti
- ✅ Sipariş takibi
- ✅ Responsive tasarım
- ✅ Kategori bazlı ürün filtreleme
- ✅ Öne çıkan ürünler
- ✅ Sosyal medya entegrasyonu
- ✅ İletişim sayfası

## 📂 Proje Yapısı

```
bs-bilisim-website/
├── app/                          # Next.js App Router
│   ├── (home)/                   # Ana sayfa route grubu
│   ├── login/                    # Login sayfası
│   │   └── page.tsx
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Ana sayfa
│   └── globals.css               # Global stiller
│
├── components/                   # React componentleri
│   ├── common/                   # Ortak componentler
│   │   ├── Header.tsx           # Site başlığı ve navigasyon
│   │   └── Footer.tsx           # Site alt bilgi
│   │
│   └── sections/                 # Sayfa section'ları
│       ├── HeroSection.tsx      # Ana hero bölümü
│       ├── CategoriesSection.tsx # Ürün kategorileri
│       ├── FeaturedProductsSection.tsx # Öne çıkan ürünler
│       ├── GorgonXSection.tsx   # GorgonX marka tanıtımı
│       └── BrandsSection.tsx    # Partner markalar
│
├── constants/                    # Sabit veriler
│   ├── categories.ts            # Kategori listesi
│   ├── products.ts              # Ürün verileri
│   └── brands.ts                # Marka listesi
│
├── types/                        # TypeScript type tanımları
│   └── index.ts                 # Tüm type'lar
│
├── lib/                          # Yardımcı fonksiyonlar
│
├── public/                       # Statik dosyalar (görseller, vb.)
│
└── Configuration Files
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.js
    ├── next.config.js
    └── postcss.config.js
```

## 🛠️ Teknolojiler

- **Framework:** Next.js 14 (App Router)
- **Dil:** TypeScript
- **Styling:** Tailwind CSS
- **İkonlar:** Lucide React
- **Font:** Inter (Google Fonts)

## 🛠️ Kurulum

### 1. Repository'yi klonlayın

```bash
git clone https://github.com/Ekrem-A/bs-bilisim-website.git
cd bs-bilisim-website
```

### 2. Bağımlılıkları yükleyin

```bash
npm install
```

### 3. Environment variables ayarlayın

`.env.example` dosyasını `.env.local` olarak kopyalayın:

```bash
cp .env.example .env.local
```

`.env.local` dosyasını düzenleyin ve Supabase bilgilerinizi girin:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Supabase veritabanını kurun

`supabase/` klasöründeki SQL dosyalarını Supabase SQL Editor'de sırayla çalıştırın:

1. `schema.sql` - Temel tablolar ve RLS policies
2. `add-admin-column.sql` - Admin yetkileri kolonu
3. `fix-user-profiles-policy.sql` - RLS policy güncellemeleri
4. `favorites-addresses-schema.sql` - Favoriler ve adresler

### 5. Development server'ı başlatın

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 🚢 Vercel'e Deploy

### Yöntem 1: Vercel Dashboard (Önerilen)

1. **Vercel hesabı oluşturun**: [vercel.com](https://vercel.com)

2. **GitHub repository'yi bağlayın**:
   - Vercel Dashboard → "New Project"
   - GitHub repository'nizi seçin
   - Framework: **Next.js** (otomatik algılanır)

3. **Environment Variables ekleyin**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Deploy**: "Deploy" butonuna tıklayın

### Yöntem 2: Vercel CLI

```bash
# Vercel CLI'yi yükleyin
npm i -g vercel

# Login olun
vercel login

# Deploy edin
vercel

# Production'a deploy
vercel --prod
```

## 🔐 Admin Paneli

Admin paneline erişmek için Supabase'de kendinizi admin yapın:

```sql
UPDATE user_profiles 
SET is_admin = true 
WHERE email = 'your-email@example.com';
```

Admin panel: `/admin/dashboard`

## 🎯 Sayfalar

### Ana Sayfa (`/`)
- Hero Section
- Ürün Kategorileri (11 kategori)
- Öne Çıkan Ürünler
- GorgonX Marka Tanıtımı
- Partner Markalar
- Footer

### Login Sayfası (`/login`)
- Email/Şifre ile giriş
- Şifre göster/gizle
- Beni hatırla
- Şifremi unuttum
- Google ve GitHub ile giriş (UI hazır, entegrasyon gerekli)
- Kayıt ol linki

## 🎨 Renkler ve Tema

### BS Bilişim Ana Renkler
- Cyan: `#06b6d4`, `#0891b2`, `#0e7490`
- Blue: `#0284c7`, `#0369a1`
- Slate: `#0f172a`, `#1e293b` (arka plan)

### GorgonX Renkleri
- Kırmızı: `#ef4444`
- Turuncu: `#f97316`

## 📱 Component Kullanımı

### Yeni Component Ekleme

```typescript
// components/sections/YeniSection.tsx
import React from 'react';

const YeniSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* İçerik */}
      </div>
    </section>
  );
};

export default YeniSection;
```

### Sabit Veri Ekleme

```typescript
// constants/yeniVeriler.ts
export const YENI_VERILER = [
  { id: 1, name: 'Veri 1' },
  { id: 2, name: 'Veri 2' },
];
```

### Type Tanımlama

```typescript
// types/index.ts
export interface YeniType {
  id: number;
  name: string;
  description?: string;
}
```

## 🔐 Login Sistemi Entegrasyonu

Login sayfası UI hazır. Backend entegrasyonu için:

1. **API Endpoint oluşturun** (`/api/auth/login`)
2. **handleSubmit fonksiyonunu güncelleyin**:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    if (response.ok) {
      // Başarılı giriş
      router.push('/dashboard');
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};
```

3. **NextAuth.js veya JWT token sistemi ekleyin**

## 🔮 Gelecek Güncellemeler

- [ ] E-ticaret fonksiyonları (sepet, ödeme)
- [ ] Ürün detay sayfaları
- [ ] Kullanıcı profil sayfası
- [ ] Admin paneli
- [ ] Ürün filtreleme ve arama
- [ ] Favoriler sistemi
- [ ] Sipariş takibi
- [ ] Gerçek ürün görselleri
- [ ] Database entegrasyonu
- [ ] API routes

## 🏗️ Production Build

```bash
# Build oluştur
npm run build

# Production sunucuyu başlat
npm start
```

## 📝 Geliştirme Notları

- Tüm componentler `'use client'` direktifi ile client-side
- Header ve Footer ortak, her sayfada kullanılabilir
- Login sayfası standalone, Header/Footer yok
- Tüm renkler ve temalar `tailwind.config.js`'de merkezi
- TypeScript strict mode aktif
- Responsive breakpoints: mobile (640px), tablet (768px), desktop (1024px)

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 📧 İletişim

**BS Bilişim**
- Email: info@bsbilisim.com
- Website: https://bsbilisim.com

---

© 2024 BS Bilişim. Tüm hakları saklıdır.
