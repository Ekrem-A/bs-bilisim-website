# BS Bilişim - Web Sitesi v2.0

BS Bilişim bilgisayar donanımları satış firması için modern, modüler ve ölçeklenebilir web sitesi.

## 🚀 Yeni Özellikler (v2.0)

- ✨ **Modüler Yapı**: Component bazlı, yeniden kullanılabilir mimari
- 🔐 **Login Sayfası**: Modern, güvenli giriş ekranı
- 📁 **Organize Klasör Yapısı**: Kolay geliştirme ve bakım
- 🎯 **TypeScript Tiplemesi**: Type-safe kod
- 📱 **Tam Responsive**: Tüm cihazlarda mükemmel görünüm
- 🎨 **BS Bilişim & GorgonX Temaları**: Marka kimliğine uygun renkler

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

## 📦 Kurulum

1. **Projeyi klonlayın veya indirin**

2. **Bağımlılıkları yükleyin:**
```bash
cd bs-bilisim-website
npm install
```

3. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

4. **Tarayıcıda açın:**
   - Ana Sayfa: [http://localhost:3000](http://localhost:3000)
   - Login Sayfası: [http://localhost:3000/login](http://localhost:3000/login)

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
