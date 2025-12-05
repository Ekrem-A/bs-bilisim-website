# Vercel Deployment & Domain Setup Guide

## 🚀 Vercel'de Zaten Deploy Edilmiş

Site URL: `https://bs-bilisim-website.vercel.app`

---

## 📋 Domain Bağlama Adımları

### 1. Vercel Dashboard'a Gidin
1. https://vercel.com/dashboard adresine gidin
2. Projenizi seçin (bs-bilisim-website)
3. **Settings** sekmesine tıklayın
4. Sol menüden **Domains** seçeneğine tıklayın

### 2. Domain Ekleyin
1. "Add" butonuna tıklayın
2. Domain adınızı girin (örnek: `www.bsbilisim.com` veya `bsbilisim.com`)
3. **Add** butonuna tıklayın

### 3. DNS Ayarlarını Yapın

Vercel size 2 seçenek sunacak:

#### Seçenek A: Nameserver Yöntemi (Önerilen)
```
Vercel'in nameserver'larını domain sağlayıcınıza ekleyin:
ns1.vercel-dns.com
ns2.vercel-dns.com
```

#### Seçenek B: A Record & CNAME Yöntemi
Domain sağlayıcınızın DNS yönetim panelinde:

**A Record:**
```
Type: A
Name: @ (veya boş)
Value: 76.76.21.21
TTL: 3600
```

**CNAME Record (www için):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

---

## 🔧 Vercel Environment Variables

### Vercel Dashboard'da Ayarlayın:
1. Vercel Dashboard > Proje Seçin > **Settings**
2. Sol menüden **Environment Variables**
3. Aşağıdaki değişkenleri ekleyin:

```
NEXT_PUBLIC_SUPABASE_URL = [Supabase Project URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY = [Supabase Anon Key]
NEXT_PUBLIC_SITE_URL = https://www.bsbilisim.com
```

**Önemli:** Domain'i ekledikten sonra `NEXT_PUBLIC_SITE_URL`'i gerçek domain'inizle güncelleyin!

### Environment'ları Hangi Branch'lerde Aktif Olacak?
- ✅ Production
- ✅ Preview
- ✅ Development

---

## 🌐 Popüler Domain Sağlayıcıları için DNS Ayarları

### Natro Hosting
1. https://www.natro.com/ > Giriş Yap
2. **Domain Yönetimi** > Domain seçin
3. **DNS Yönetimi**
4. Yukarıdaki A ve CNAME kayıtlarını ekleyin

### GoDaddy
1. https://godaddy.com > Domains > My Domains
2. Domain seçin > **Manage DNS**
3. A ve CNAME kayıtlarını ekleyin

### Turhost
1. https://www.turhost.com/ > Giriş Yap
2. **Domainler** > Domain seçin
3. **DNS Yönetimi** > Kayıtları ekleyin

### Cloudflare (Eğer kullanıyorsanız)
1. https://dash.cloudflare.com/
2. Domain seçin > **DNS** > **Records**
3. A ve CNAME kayıtlarını ekleyin
4. **⚠️ Proxy Status**: Turuncu bulut simgesine tıklayarak **DNS Only** yapın

---

## ✅ Domain Doğrulama

DNS değişikliklerinin yayılması **15 dakika - 48 saat** arası sürebilir.

### Kontrol Etme:
1. **nslookup** komutu ile:
```bash
nslookup bsbilisim.com
```

2. **Online DNS Checker:**
- https://dnschecker.org/
- Domain adınızı girin ve A kaydını kontrol edin

3. **Vercel Dashboard:**
- Domain'in yanında ✅ yeşil onay işareti çıkmalı

---

## 🔄 Redeploy (Yeniden Dağıtım)

Domain ekledikten ve environment variable'ları güncelledikten sonra:

1. Vercel Dashboard > Proje
2. **Deployments** sekmesi
3. En son deployment'ın yanındaki **•••** menü
4. **Redeploy** > **Use existing Build Cache** (kapalı) > **Redeploy**

VEYA

```bash
# Terminal'den:
vercel --prod
```

---

## 🎯 Deploy Sonrası Yapılacaklar

### 1. HTTPS Kontrolü
- Vercel otomatik SSL sertifikası sağlar
- `https://www.bsbilisim.com` adresine gidin
- Tarayıcıda kilit simgesi görünmeli

### 2. robots.txt Güncelle
Domain bağlandıktan sonra:
```
/public/robots.txt dosyasında:
Sitemap: https://www.bsbilisim.com/sitemap.xml
```

### 3. Google Search Console
1. https://search.google.com/search-console
2. **Add Property** > Domain'inizi ekleyin
3. DNS TXT kaydı ile doğrulayın
4. Sitemap gönderin: `https://www.bsbilisim.com/sitemap.xml`

### 4. Google Analytics (Opsiyonel)
1. https://analytics.google.com/
2. Yeni özellik oluşturun
3. Tracking ID'yi alın (G-XXXXXXXXXX)
4. Vercel Environment Variables'a ekleyin

---

## 🐛 Sorun Giderme

### Domain Bağlanmıyor
- DNS ayarlarını kontrol edin
- 24 saat bekleyin
- Vercel Dashboard'da domain durumunu kontrol edin

### Environment Variables Çalışmıyor
- Vercel Dashboard'da doğru girildiğinden emin olun
- Redeploy yapın
- Browser cache'i temizleyin

### SSL Hatası
- Vercel otomatik SSL sağlar, bekleyin
- Eğer devam ederse Vercel support ile iletişime geçin

---

## 📞 İletişim

**Vercel Support:** https://vercel.com/support
**Dokümantasyon:** https://vercel.com/docs

---

**Son Güncelleme:** 5 Aralık 2025
