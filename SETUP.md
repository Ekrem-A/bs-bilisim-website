# BS Bilişim - Kurulum ve Yapılandırma Rehberi

## 📋 İçindekiler
1. [Gereksinimler](#gereksinimler)
2. [Supabase Kurulumu](#supabase-kurulumu)
3. [Email Kurulumu (Resend)](#email-kurulumu)
4. [Proje Kurulumu](#proje-kurulumu)
5. [Storage Önerileri](#storage-önerileri)
6. [Test ve Geliştirme](#test-ve-geliştirme)

---

## 🔧 Gereksinimler

- **Node.js**: 18.17 veya üzeri
- **npm** veya **yarn**
- **Supabase Hesabı** (ücretsiz tier yeterli)
- **Resend Hesabı** (email gönderimleri için)

---

## 🗄️ Supabase Kurulumu

### 1. Supabase Projesi Oluşturma

1. [Supabase.com](https://supabase.com)'a gidin ve hesap oluşturun
2. **"New Project"** butonuna tıklayın
3. Proje bilgilerini doldurun:
   - **Name**: bs-bilisim
   - **Database Password**: Güçlü bir şifre seçin
   - **Region**: Europe West (en yakın) veya başka bir bölge
4. **"Create new project"** butonuna tıklayın (2-3 dakika sürer)

### 2. Database Schema'yı Çalıştırma

1. Supabase Dashboard'da **"SQL Editor"** sekmesine gidin
2. **"New Query"** butonuna tıklayın
3. `supabase/schema.sql` dosyasının içeriğini kopyalayın
4. SQL Editor'e yapıştırın
5. **"Run"** veya **"F5"** ile çalıştırın

✅ Şu tablolar oluşturulacak:
- `categories` - Ürün kategorileri
- `products` - Ürünler
- `user_profiles` - Kullanıcı profilleri
- `orders` - Siparişler
- `order_items` - Sipariş kalemleri
- `cart_items` - Sepet öğeleri

### 3. API Keys'leri Alma

1. Supabase Dashboard'da **"Settings"** > **"API"** sekmesine gidin
2. Şu bilgileri kopyalayın:
   - **Project URL**: `https://xxxxxxxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 4. Örnek Ürün Verilerini Ekleme (Opsiyonel)

SQL Editor'de aşağıdaki komutu çalıştırarak örnek ürünler ekleyebilirsiniz:

```sql
-- Get category IDs first
WITH cat_ids AS (
  SELECT id, slug FROM categories
)

-- Insert sample products
INSERT INTO products (name, slug, brand, category_id, price, original_price, description, image_url, in_stock, stock_quantity, rating, review_count, specs, tags, featured)
SELECT 
  'NVIDIA GeForce RTX 4090 24GB',
  'nvidia-rtx-4090-24gb',
  'ASUS',
  id,
  54999.00,
  59999.00,
  'En yüksek performanslı gaming ekran kartı',
  '/products/gpu-1.jpg',
  true,
  15,
  4.9,
  234,
  '{"Bellek": "24GB GDDR6X", "Boost Clock": "2.52 GHz", "TDP": "450W"}'::jsonb,
  ARRAY['4K Gaming', 'Ray Tracing', 'DLSS 3'],
  true
FROM cat_ids WHERE slug = 'ekran-karti';

-- Daha fazla ürün eklemek için bu pattern'i kullanın
```

---

## 📧 Email Kurulumu (Resend)

### 1. Resend Hesabı Oluşturma

1. [Resend.com](https://resend.com)'a gidin
2. Ücretsiz hesap oluşturun (ayda 100 email ücretsiz)
3. Email adresinizi doğrulayın

### 2. API Key Alma

1. Dashboard'da **"API Keys"** sekmesine gidin
2. **"Create API Key"** butonuna tıklayın
3. İsim verin: `BS Bilişim Production`
4. API Key'i kopyalayın (sadece bir kez gösterilir!)

### 3. Domain Doğrulama (Opsiyonel ama Önerilen)

**Test için gerekli değil**, ancak production'da kendi domain'inizden email göndermek için:

1. **"Domains"** sekmesine gidin
2. **"Add Domain"** butonuna tıklayın
3. Domain'inizi girin: `bsbilisim.com`
4. DNS kayıtlarını ekleyin:
   - **TXT** kaydı
   - **CNAME** kayıtları
5. **"Verify Records"** ile doğrulayın

Domain doğrulandıktan sonra `app/api/orders/create/route.ts` dosyasında email gönderen adresi değiştirin:

```typescript
from: 'BS Bilişim <siparis@bsbilisim.com>'  // Doğrulanmış domain
```

---

## 🚀 Proje Kurulumu

### 1. Bağımlılıkları Yükleme

```bash
cd bs-bilisim-website
npm install
```

### 2. Environment Variables (.env.local)

Proje kök dizininde `.env.local` dosyası oluşturun:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Email Configuration (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
ADMIN_EMAIL=info@bsbilisim.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=BS Bilişim
```

⚠️ **Önemli:** `.env.local` dosyası `.gitignore` içinde olmalı!

### 3. Uygulamayı Çalıştırma

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Tarayıcıda `http://localhost:3000` adresini açın.

---

## 📦 Storage Önerileri

### Seçenek 1: Supabase Storage (Önerilen)

**Avantajlar:**
- Ücretsiz 1GB storage
- Database ile entegre
- CDN ile hızlı
- Kolay yönetim

**Kurulum:**

1. Supabase Dashboard'da **"Storage"** sekmesine gidin
2. **"Create bucket"** butonuna tıklayın
3. Bucket adı: `products`
4. **Public bucket** seçin (ürün resimleri herkese açık)
5. **Create** butonuna tıklayın

**Kullanım:**

```typescript
// Upload image
const { data, error } = await supabase.storage
  .from('products')
  .upload('ekran-karti/rtx-4090.jpg', file);

// Get public URL
const { data } = supabase.storage
  .from('products')
  .getPublicUrl('ekran-karti/rtx-4090.jpg');

// Update product image_url
await supabase
  .from('products')
  .update({ image_url: data.publicUrl })
  .eq('id', productId);
```

### Seçenek 2: Cloudinary

**Avantajlar:**
- Ücretsiz 25GB/ay bandwidth
- Otomatik image optimization
- Transformation API
- CDN

**Kurulum:**

1. [Cloudinary.com](https://cloudinary.com)'a kaydolun
2. **"Media Library"** > **"Upload"** ile resimleri yükleyin
3. URL'leri kopyalayıp database'e kaydedin

```typescript
// Cloudinary URL format
https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/products/rtx-4090.jpg
```

### Seçenek 3: Vercel Blob

**Avantajlar:**
- Vercel entegrasyonu
- Serverless
- Fast CDN

**Kurulum:**

```bash
npm install @vercel/blob
```

```typescript
import { put } from '@vercel/blob';

const blob = await put('rtx-4090.jpg', file, {
  access: 'public',
});

console.log(blob.url); // https://xxxxxxxx.public.blob.vercel-storage.com/rtx-4090.jpg
```

---

## 🧪 Test ve Geliştirme

### Test Sipariş Oluşturma

1. Ana sayfada bir kategori seçin (örn. Ekran Kartı)
2. Ürün kartındaki **Sepete Ekle** butonuna tıklayın
3. Sağ üstteki **Sepet** ikonuna tıklayın
4. **Sipariş Oluştur** butonuna tıklayın
5. Formu doldurun:
   - Ad Soyad: Test User
   - Email: test@example.com
   - Telefon: 0555 555 55 55
   - Adres: Test Mahallesi, Test Sok. No:1
   - Şehir: İstanbul
6. **Siparişi Tamamla** butonuna tıklayın

✅ Başarılı olursa:
- Sipariş numarası gösterilir
- Admin email'e sipariş bildirimi gider
- Müşteriye onay email'i gider

### Email Test Etme

**Test Mode:** Resend ücretsiz hesapta sadece doğrulanmış email adreslerine gönderir.

1. Resend Dashboard'da **"API Keys"** > **"Verified Emails"** sekmesine gidin
2. Email adresinizi ekleyin ve doğrulayın
3. `.env.local` dosyasında `ADMIN_EMAIL` olarak bu adresi kullanın

### Debug Modu

Console'da hata mesajlarını görmek için:

```typescript
// app/api/orders/create/route.ts dosyasında
console.log('Order data:', orderData);
console.log('Email sent:', result);
```

---

## 📊 Production Checklist

- [ ] Supabase production tier'a geçin (gerekirse)
- [ ] Kendi domain'inizi Resend'e ekleyin
- [ ] Environment variables'ı production'a ekleyin
- [ ] Storage bucket'ı yapılandırın
- [ ] RLS (Row Level Security) policies'i test edin
- [ ] Email template'lerini özelleştirin
- [ ] Analytics ekleyin (Google Analytics, Plausible)
- [ ] SEO optimizasyonu yapın
- [ ] Sitemap oluşturun
- [ ] robots.txt ekleyin

---

## 🆘 Sık Karşılaşılan Sorunlar

### Problem: Email gönderilmiyor

**Çözüm:**
1. `RESEND_API_KEY` doğru mu kontrol edin
2. Email adresi Resend'de doğrulanmış mı?
3. Console'da hata mesajlarını kontrol edin
4. Resend Dashboard > Logs sekmesini kontrol edin

### Problem: Supabase bağlantı hatası

**Çözüm:**
1. `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY` doğru mu?
2. Supabase projesi aktif mi?
3. Browser console'da network tab'ı kontrol edin

### Problem: Sepet çalışmıyor

**Çözüm:**
1. Browser'ın localStorage'ını temizleyin
2. Page'i yenileyin
3. Zustand store'unun doğru çalıştığını kontrol edin

---

## 📞 Destek

Sorularınız için:
- **Email:** info@bsbilisim.com
- **GitHub Issues:** Proje repository'sinde issue açın

---

## 🎉 Tebrikler!

BS Bilişim e-ticaret platformu artık çalışıyor! 

**Sonraki Adımlar:**
1. Ürün resimlerini yükleyin
2. Gerçek ürün verilerini ekleyin
3. Payment gateway entegre edin (iyzico, PayTR)
4. Admin paneli ekleyin
5. Kullanıcı authentication'ı aktif edin
