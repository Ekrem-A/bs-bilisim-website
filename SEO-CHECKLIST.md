# SEO Checklist - BS Bilişim

## ✅ Yapılanlar

### 1. Meta Tags
- [x] Title tags (dinamik, her sayfa için özel)
- [x] Meta descriptions (150-160 karakter)
- [x] Keywords
- [x] Open Graph tags (Facebook, WhatsApp paylaşımları için)
- [x] Twitter Cards
- [x] Canonical URLs
- [x] Robots meta tags

### 2. Structured Data (JSON-LD)
- [x] Organization schema (ana sayfa)
- [x] WebSite schema (arama kutusu)
- [x] Product schema (ürün sayfaları)
- [x] Breadcrumb schema (navigation)

### 3. Technical SEO
- [x] robots.txt dosyası
- [x] Sitemap.xml (dinamik)
- [x] manifest.json
- [x] Favicon
- [x] Responsive design
- [x] Performance optimizasyonu (Next.js 14)
- [x] Image optimization (next/image)
- [x] Lazy loading

### 4. Dosya Yapısı
- [x] SEO friendly URL'ler
- [x] Alt tags (görseller için)
- [x] Header yapısı (H1, H2, H3)
- [x] Internal linking

## 🔄 Yapılacaklar

### 1. Domain Ayarları
- [ ] **ÖNEMLI**: `app/layout.tsx` dosyasında `metadataBase` URL'ini kendi domain'inize değiştirin
- [ ] **ÖNEMLI**: `app/sitemap.ts` dosyasında `baseUrl`'i kendi domain'inize değiştirin
- [ ] **ÖNEMLI**: `public/robots.txt` dosyasında sitemap URL'ini güncelleyin
- [ ] **ÖNEMLI**: `app/page.tsx` ve diğer sayfalardaki URL'leri güncelleyin

### 2. Google Tools
- [ ] Google Search Console hesabı oluşturun
- [ ] Site ownership verification yapın
- [ ] Sitemap'i Google'a gönderin
- [ ] Google Analytics ekleyin (GA4)
- [ ] Google Tag Manager (opsiyonel)

### 3. Görseller
- [ ] `/public/og-image.jpg` dosyası ekleyin (1200x630 px)
- [ ] Tüm ürün görsellerine alt text ekleyin
- [ ] Logo görsellerini optimize edin

### 4. İçerik Optimizasyonu
- [ ] Her kategori için benzersiz description yazın
- [ ] Ürün açıklamalarını zenginleştirin
- [ ] Blog/İçerik bölümü ekleyin (opsiyonel)
- [ ] SSS (FAQ) sayfası ekleyin

### 5. Teknik İyileştirmeler
- [ ] SSL sertifikası (Vercel otomatik sağlar)
- [ ] CDN (Vercel otomatik)
- [ ] Gzip compression (Vercel otomatik)
- [ ] Browser caching
- [ ] 404 sayfası özelleştirin

### 6. Sosyal Medya
- [ ] Instagram hesabı
- [ ] Facebook sayfası
- [ ] Sosyal medya linklerini `app/page.tsx`'deki schema'ya ekleyin
- [ ] Footer'a sosyal medya ikonları ekleyin

### 7. Local SEO (Opsiyonel)
- [ ] Google My Business hesabı
- [ ] Local Business Schema
- [ ] Adres ve telefon bilgilerini ekleyin

## 📊 Performans Kontrolleri

### Test Araçları
1. **Google PageSpeed Insights**: https://pagespeed.web.dev/
2. **Google Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
3. **Google Rich Results Test**: https://search.google.com/test/rich-results
4. **Schema Markup Validator**: https://validator.schema.org/

### Vercel Deploy Sonrası
1. Site yayına aldıktan sonra yukarıdaki araçlarla test edin
2. Search Console'da sitemap submit edin
3. İlk indexlenme 2-3 gün sürebilir
4. Core Web Vitals'ı takip edin

## 🎯 Önemli Notlar

1. **Domain Değişikliği**: Tüm URL'lerde `www.bsbilisim.com` yerine kendi domain'inizi yazın
2. **Google Verification**: Search Console'dan aldığınız kodu `app/layout.tsx`'deki `verification.google` alanına ekleyin
3. **Analytics**: Google Analytics ID'sini environment variable olarak ekleyin
4. **WhatsApp**: Telefon numarasını `+905312480048` yerine kendi numaranızı yazın

## 📱 Vercel Deployment

```bash
# Environment Variables (.env.local)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_SITE_URL=https://www.bsbilisim.com
```

## 🔍 SEO Keywords (Öneriler)

**Ana Keywords:**
- bilgisayar parçaları
- gaming ekipmanları
- GorgonX
- işlemci fiyatları
- ekran kartı fiyatları
- bilgisayar toplama
- oyuncu bilgisayarı

**Uzun Kuyruklu Keywords:**
- en iyi gaming mouse
- uygun fiyatlı ekran kartı
- AMD Ryzen işlemci
- RGB soğutma sistemi
- mekanik klavye Türkiye

## 📈 Takip Edilecek Metrikler

1. Organic Traffic
2. Keyword Rankings
3. Click-Through Rate (CTR)
4. Bounce Rate
5. Page Speed
6. Core Web Vitals
7. Mobile Usability
8. Index Coverage

---

**Son Güncelleme**: 5 Aralık 2025
**Durum**: SEO altyapısı tamamlandı, domain ayarları bekleniyor
