# 🚀 Deployment Checklist - BS Bilişim

## ✅ Tamamlanmış

- [x] Vercel'e deploy edildi
- [x] SEO optimizasyonları yapıldı
- [x] Environment variables dinamik hale getirildi
- [x] Sitemap.xml oluşturuldu
- [x] robots.txt eklendi
- [x] Structured data (JSON-LD) eklendi
- [x] Meta tags optimize edildi
- [x] Responsive tasarım
- [x] Performance optimizasyonu

## 📋 Hemen Yapılması Gerekenler

### 1. Vercel Environment Variables (5 dakika)
```
Vercel Dashboard > Settings > Environment Variables:

NEXT_PUBLIC_SUPABASE_URL = [Supabase URL'iniz]
NEXT_PUBLIC_SUPABASE_ANON_KEY = [Supabase Key'iniz]  
NEXT_PUBLIC_SITE_URL = https://bs-bilisim-website.vercel.app

⚠️ Domain bağladıktan sonra SITE_URL'i güncelleyin!
```

### 2. Domain DNS Ayarları (15 dakika)
Hosting sağlayıcınızın DNS panelinde:

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME Record:**
```
Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

### 3. Vercel'de Domain Ekle (5 dakika)
1. Vercel Dashboard > Settings > Domains
2. Domain adınızı ekleyin
3. DNS doğrulamasını bekleyin (15 dakika - 48 saat)

### 4. Redeploy (2 dakika)
Domain ekledikten sonra:
- Vercel Dashboard > Deployments > Son deployment > Redeploy

## 🎯 Domain Bağlandıktan Sonra

### 5. SITE_URL Güncelle
```
Vercel Environment Variables:
NEXT_PUBLIC_SITE_URL = https://www.sizindomain.com
```

### 6. robots.txt Güncelle
```
/public/robots.txt:
Sitemap: https://www.sizindomain.com/sitemap.xml
```

### 7. Redeploy
- Vercel'de tekrar redeploy yapın

## 🔍 Test ve Doğrulama

### 8. Site Testi (10 dakika)
- [ ] Ana sayfa yükleniyor mu?
- [ ] Ürünler görünüyor mu?
- [ ] Kategoriler çalışıyor mu?
- [ ] Sepet fonksiyonu çalışıyor mu?
- [ ] Login/Register çalışıyor mu?
- [ ] Mobil görünüm düzgün mü?

### 9. SEO Testi (15 dakika)
- [ ] https://pagespeed.web.dev/ - Performance test
- [ ] https://search.google.com/test/mobile-friendly - Mobile test
- [ ] https://search.google.com/test/rich-results - Schema test
- [ ] https://www.google.com/webmasters/tools/richsnippets - Rich snippets

### 10. Google Search Console (20 dakika)
1. https://search.google.com/search-console
2. Property ekle
3. DNS doğrulama yap
4. Sitemap gönder: `/sitemap.xml`
5. URL inspection yap

## 📊 Monitoring Kurulumu

### 11. Google Analytics (Opsiyonel - 15 dakika)
1. https://analytics.google.com/ - Hesap oluştur
2. Tracking ID al (G-XXXXXXXXXX)
3. Vercel'e environment variable olarak ekle
4. Redeploy yap

### 12. Vercel Analytics (Ücretsiz)
1. Vercel Dashboard > Analytics
2. Enable Analytics
3. Otomatik çalışır

## 🔒 Güvenlik

### 13. Environment Variables Kontrolü
- [ ] `.env.local` dosyası `.gitignore`'da
- [ ] Supabase keys güvenli
- [ ] Hassas bilgiler kodda yok

### 14. Supabase RLS (Row Level Security)
- [ ] Policies aktif mi kontrol edin
- [ ] Test kullanıcısı ile deneyin

## 📱 Sosyal Medya (Opsiyonel)

### 15. OG Image Oluştur
- [ ] 1200x630 px görsel hazırla
- [ ] `/public/og-image.jpg` olarak kaydet
- [ ] Test: https://www.opengraph.xyz/

### 16. Sosyal Medya Linkler
- [ ] Instagram/Facebook hesapları oluştur
- [ ] `app/page.tsx` schema'ya linkler ekle
- [ ] Footer'a sosyal medya ikonları ekle

## 🎉 Yayına Alma

### 17. Final Checklist
- [ ] Domain erişilebilir
- [ ] HTTPS çalışıyor
- [ ] Tüm sayfalar yükleniyor
- [ ] Görseller görünüyor
- [ ] Formlar çalışıyor
- [ ] Sepet çalışıyor
- [ ] Admin panel erişilebilir
- [ ] Mobil responsive
- [ ] SEO testleri geçti

### 18. Tanıtım
- [ ] Sosyal medyada duyuru
- [ ] WhatsApp Business profili güncelle
- [ ] Google My Business (local SEO)

---

## 📞 Acil Durum

Bir sorun olursa:
1. Vercel Dashboard > Deployments > Önceki çalışan versiyona geri dön
2. Environment variables'ı kontrol et
3. Browser cache temizle
4. Vercel Support: https://vercel.com/support

---

## 🔗 Faydalı Linkler

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Google Search Console:** https://search.google.com/search-console
- **PageSpeed Insights:** https://pagespeed.web.dev/

---

**Tahmini Toplam Süre:** 2-3 saat (DNS yayılması hariç)
**DNS Yayılma Süresi:** 15 dakika - 48 saat

**Durum:** ✅ Kod hazır, domain ayarları bekleniyor
**Son Güncelleme:** 5 Aralık 2025
