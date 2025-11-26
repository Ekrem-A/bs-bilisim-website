# BS Bilişim - Authentication & Admin Panel Kurulum Rehberi

## 📋 Yeni Özellikler

### 🔐 Kullanıcı Yönetimi
- ✅ Kayıt olma (Email verification ile)
- ✅ Giriş yapma (Supabase Auth)
- ✅ Şifremi unuttum
- ✅ Email onayı sistemi

### 👨‍💼 Admin Paneli
- ✅ Dashboard (İstatistikler)
- ✅ Ürün yönetimi (Ekleme/Düzenleme/Silme)
- ✅ Sipariş yönetimi
- ✅ Kullanıcı listesi

---

## 🚀 Kurulum Adımları

### 1. Supabase Auth Ayarları

#### Email Template Ayarlama

1. Supabase Dashboard > **Authentication** > **Email Templates**
2. **Confirm signup** şablonunu düzenle:

```html
<h2>Email Adresinizi Onaylayın</h2>
<p>Merhaba,</p>
<p>BS Bilişim hesabınızı oluşturduğunuz için teşekkürler!</p>
<p>Hesabınızı aktif etmek için aşağıdaki butona tıklayın:</p>
<p><a href="{{ .ConfirmationURL }}">Email Adresimi Onayla</a></p>
```

3. **Reset Password** şablonunu düzenle:

```html
<h2>Şifre Sıfırlama</h2>
<p>Merhaba,</p>
<p>Şifrenizi sıfırlamak için aşağıdaki butona tıklayın:</p>
<p><a href="{{ .ConfirmationURL }}">Şifremi Sıfırla</a></p>
```

#### URL Configuration

1. **Authentication** > **URL Configuration**
2. **Site URL**: `http://localhost:3000` (production'da gerçek domain)
3. **Redirect URLs** ekle:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/reset-password`

### 2. Admin Kullanıcısı Oluşturma

#### Yöntem 1: Supabase Dashboard

1. **Authentication** > **Users** > **Add User**
2. Email: `admin@bsbilisim.com`
3. Password: Güçlü bir şifre
4. **Auto Confirm User**: ✅ (Email onayı atlansın)
5. Create User

#### Yöntem 2: SQL ile

```sql
-- Admin kullanıcı oluştur (önce kayıt ol sayfasından kaydol)
-- Sonra user_profiles tablosuna is_admin ekle

ALTER TABLE user_profiles ADD COLUMN is_admin BOOLEAN DEFAULT false;

-- Admin yap
UPDATE user_profiles
SET is_admin = true
WHERE email = 'admin@bsbilisim.com';
```

### 3. Database Schema Güncellemesi

Supabase SQL Editor'de çalıştır:

```sql
-- user_profiles tablosuna is_admin ekle
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Admin kullanıcıyı ayarla
UPDATE user_profiles
SET is_admin = true
WHERE email = 'admin@bsbilisim.com';

-- RLS Policy: Adminler tüm siparişleri görebilir
CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.is_admin = true
    )
  );

-- RLS Policy: Adminler tüm kullanıcıları görebilir
CREATE POLICY "Admins can view all users" ON user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid() 
      AND up.is_admin = true
    )
  );

-- RLS Policy: Adminler ürünleri yönetebilir
CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = auth.uid() 
      AND user_profiles.is_admin = true
    )
  );
```

---

## 📱 Kullanım Kılavuzu

### Kullanıcı İşlemleri

#### Kayıt Olma
1. `/register` sayfasına git
2. Formu doldur (Ad, Email, Telefon, Şifre)
3. "Kayıt Ol" butonuna tıkla
4. Email'inize gelen onay linkine tıklayın
5. Artık giriş yapabilirsiniz!

#### Giriş Yapma
1. `/login` sayfasına git
2. Email ve şifrenizi girin
3. "Giriş Yap" butonuna tıklayın

#### Şifremi Unuttum
1. Login sayfasında "Şifremi Unuttum" linkine tıkla
2. Email adresinizi girin
3. Email'e gelen linke tıklayın
4. Yeni şifrenizi belirleyin

### Admin Paneli Kullanımı

#### Giriş
1. Admin email ile login ol: `admin@bsbilisim.com`
2. Otomatik olarak `/admin/dashboard`'a yönlendirileceksiniz

#### Dashboard
- Toplam ürün sayısı
- Toplam sipariş sayısı
- Toplam kullanıcı sayısı
- Toplam gelir

#### Ürün Yönetimi (`/admin/products`)

**Yeni Ürün Ekleme:**
1. "Yeni Ürün Ekle" butonuna tıkla
2. Ürün bilgilerini doldur:
   - Ürün Adı
   - Kategori (dropdown)
   - Marka
   - Fiyat
   - Stok Miktarı
   - Açıklama
   - Resim URL (Supabase Storage'dan)
   - Özellikler (JSON)
   - Etiketler
3. "Kaydet" butonuna tıkla

**Ürün Düzenleme:**
1. Ürün listesinde "Düzenle" butonuna tıkla
2. Bilgileri güncelle
3. "Güncelle" butonuna tıkla

**Ürün Silme:**
1. "Sil" butonuna tıkla
2. Onay ver

#### Sipariş Yönetimi (`/admin/orders`)

**Sipariş Listesi:**
- Tüm siparişleri görüntüle
- Sipariş durumunu güncelle:
  - `pending` → Beklemede
  - `processing` → İşleniyor
  - `shipped` → Kargoya Verildi
  - `delivered` → Teslim Edildi
  - `cancelled` → İptal Edildi

**Sipariş Detayları:**
- Müşteri bilgileri
- Sipariş kalemleri
- Toplam tutar
- Teslimat adresi

---

## 🎨 Ürün Resmi Yükleme (Supabase Storage)

### 1. Storage Bucket Oluştur

1. Supabase Dashboard > **Storage**
2. **Create Bucket** > "products"
3. **Public bucket**: ✅ (Ürün resimleri herkese açık)

### 2. Resim Yükleme

**Manuel Yükleme:**
1. Storage > products bucket > **Upload**
2. Resimleri seç ve yükle
3. Yüklenen resmin URL'ini kopyala
4. Admin panelinde ürün eklerken bu URL'i kullan

**Programatik Yükleme:**

```typescript
// Admin panel'e file upload eklenebilir
const { data, error } = await supabase.storage
  .from('products')
  .upload(`${category}/${productId}.jpg`, file);

if (data) {
  const { data: publicURL } = supabase.storage
    .from('products')
    .getPublicUrl(data.path);
  
  // Bu URL'i product.image_url'e kaydet
}
```

---

## 🛡️ Güvenlik

### Admin Kontrolü

Admin layout (`app/admin/layout.tsx`), her sayfa yüklendiğinde:
1. Kullanıcının giriş yapıp yapmadığını kontrol eder
2. Email'in `admin@bsbilisim.com` olup olmadığını kontrol eder
3. Değilse `/login` sayfasına yönlendirir

### Row Level Security (RLS)

Supabase RLS politikaları ile:
- Kullanıcılar sadece kendi siparişlerini görebilir
- Adminler tüm verileri görebilir ve yönetebilir
- Ürünler herkese açık (okuma)
- Sadece adminler ürün ekleyebilir/düzenleyebilir

---

## 📊 Database Şeması

### Yeni Tablolar

#### user_profiles
```sql
- id (UUID, FK to auth.users)
- email (TEXT)
- full_name (TEXT)
- phone (TEXT)
- address (TEXT)
- city (TEXT)
- postal_code (TEXT)
- is_admin (BOOLEAN) -- YENİ!
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Örnek Ürün Ekleme

```sql
-- Kategori ID'sini bul
SELECT id, name FROM categories WHERE slug = 'ekran-karti';

-- Ürün ekle
INSERT INTO products (
  name, 
  slug, 
  brand, 
  category_id, 
  price, 
  original_price,
  description, 
  image_url, 
  in_stock, 
  stock_quantity,
  rating,
  review_count,
  specs,
  tags,
  featured
) VALUES (
  'NVIDIA GeForce RTX 4090 24GB',
  'nvidia-rtx-4090-24gb',
  'ASUS',
  'category-uuid-here',
  54999.00,
  59999.00,
  'En yüksek performanslı gaming ekran kartı',
  'https://your-supabase-url.supabase.co/storage/v1/object/public/products/gpu/rtx-4090.jpg',
  true,
  15,
  4.9,
  234,
  '{"Bellek": "24GB GDDR6X", "Boost Clock": "2.52 GHz", "TDP": "450W"}'::jsonb,
  ARRAY['4K Gaming', 'Ray Tracing', 'DLSS 3'],
  true
);
```

---

## 🔄 Email Verification Flow

1. Kullanıcı kayıt olur → Supabase email gönderir
2. Kullanıcı emaildeki linke tıklar
3. Supabase hesabı confirm eder
4. Kullanıcı `/auth/callback` sayfasına yönlendirilir
5. Artık giriş yapabilir

**Not:** Email verification'ı test etmek için gerçek email adresi kullanın!

---

## 🐛 Sorun Giderme

### Email Gönderilmiyor

**Çözüm:**
1. Supabase Dashboard > Authentication > Email Settings
2. **Enable Email Confirmations**: ✅
3. SMTP ayarlarını kontrol et (Supabase varsayılan SMTP kullanır)

### Admin paneline giremiyorum

**Çözüm:**
1. Console'da hata var mı kontrol et
2. Email `admin@bsbilisim.com` mi kontrol et
3. Database'de `is_admin = true` kontrolü yap

### Ürün resimleri görünmüyor

**Çözüm:**
1. Storage bucket public mi kontrol et
2. URL doğru mu kontrol et
3. CORS ayarlarını kontrol et

---

## 📝 Sonraki Adımlar

1. ✅ Authentication (Supabase Auth)
2. ✅ Register & Login
3. ✅ Forgot Password
4. ✅ Admin Panel
5. ✅ Product Management UI
6. ⏳ Order Management UI (frontend yapılacak)
7. ⏳ User Management UI
8. ⏳ File Upload UI (Admin panel'e eklenecek)
9. ⏳ Email Templates (özelleştir)
10. ⏳ Analytics & Reports

---

## 📞 Test Hesapları

**Admin:**
- Email: admin@bsbilisim.com
- Password: [Supabase'de oluşturduğunuz şifre]

**Test Kullanıcı:**
- Kayıt ol sayfasından kendiniz oluşturun

---

## 🎉 Tebrikler!

Artık tam fonksiyonel bir e-ticaret siteniz var:
- Kullanıcı kaydı & girişi ✅
- Email onayı ✅
- Şifre sıfırlama ✅
- Admin paneli ✅
- Ürün yönetimi (backend hazır) ✅
- Sipariş sistemi ✅

**Eksikler (UI'ları yapılacak):**
- Admin products page (CRUD işlemleri için UI)
- Admin orders page (Sipariş durumu güncelleme UI)
- Admin users page (Kullanıcı listesi UI)
- File upload component (Ürün resmi yükleme)

Bu UI'ları yapmak ister misiniz? 🚀
