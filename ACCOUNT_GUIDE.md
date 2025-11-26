# BS Bilişim - Kullanıcı Hesap Yönetimi Rehberi

## 🎉 Yeni Özellikler

### 👤 Kullanıcı Hesabım Sayfası

Artık kullanıcılar kendi hesap panellerine erişebilirler!

**Login Yönlendirme:**
- ✅ Admin kullanıcı → `/admin/dashboard`
- ✅ Normal kullanıcı → `/account` (Hesabım sayfası)

---

## 📂 Hesabım Sayfası Yapısı

### Sidebar Menü (Görseldeki gibi)

1. **Pano** (`/account`)
   - Genel bakış & istatistikler
   - Son siparişler
   - Hızlı işlemler

2. **Siparişler** (`/account/orders`)
   - Tüm siparişleri listele
   - Sipariş durumu takibi
   - Sipariş detayları

3. **Adresler** (`/account/addresses`)
   - Teslimat adresleri
   - Yeni adres ekleme (yakında)

4. **Hesap Detayları** (`/account/details`)
   - Kişisel bilgileri düzenleme
   - Ad, Telefon güncelleme
   - Email görüntüleme

5. **Favorilerim** (`/account/favorites`)
   - Favori ürünler (yakında)

6. **Çıkış Yap**
   - Güvenli çıkış
   - Ana sayfaya yönlendirme

---

## 🚀 Kullanım

### Kullanıcı Akışı

1. **Kayıt Ol** → `/register`
2. **Email Onayı** → Email'deki linke tıkla
3. **Giriş Yap** → `/login`
4. **Otomatik Yönlendirme:**
   - Normal kullanıcı → `/account` (Hesabım)
   - Admin → `/admin/dashboard`

### Hesabım Sayfası Özellikleri

**Pano (Dashboard):**
```
📊 İstatistikler:
- Toplam sipariş sayısı
- Bekleyen siparişler
- Favorilerim (yakında)
- Kayıtlı adresler (yakında)

📦 Son 5 Sipariş:
- Sipariş numarası
- Durum badge
- Toplam tutar
- Tarih
```

**Siparişler:**
```
✅ Tüm siparişleri görüntüle
✅ Sipariş durumu:
   - Beklemede (yellow)
   - İşleniyor (blue)
   - Kargoya Verildi (purple)
   - Teslim Edildi (green)
   - İptal Edildi (red)

✅ Sipariş detayları:
   - Müşteri bilgileri
   - Teslimat adresi
   - Toplam tutar
```

**Hesap Detayları:**
```
✏️ Düzenlenebilir:
- Ad Soyad
- Telefon

🔒 Görüntüleme:
- Email (değiştirilemez)
```

---

## 🔐 Güvenlik

### Authentication Guard

**Account Layout** (`app/account/layout.tsx`):
1. Kullanıcı giriş yaptı mı kontrol
2. Admin mi kontrol
   - Admin ise → `/admin/dashboard`
   - Değilse → Account sayfası göster
3. Giriş yoksa → `/login`

### Database RLS

```sql
-- Kullanıcı sadece kendi siparişlerini görebilir
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Kullanıcı kendi profilini güncelleyebilir
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);
```

---

## 📱 Responsive Tasarım

**Mobil:**
- ✅ Hamburger menü
- ✅ Sidebar overlay
- ✅ Touch-friendly buttons

**Tablet/Desktop:**
- ✅ Sticky sidebar
- ✅ Grid layout
- ✅ Hover effects

---

## 🎨 UI Özellikleri

**Light Theme:**
- Beyaz kartlar
- Slate borders
- Cyan accent colors
- Gradient buttons

**Icons:**
- LayoutDashboard → Pano
- ShoppingBag → Siparişler
- MapPin → Adresler
- User → Hesap Detayları
- Heart → Favorilerim
- LogOut → Çıkış

**Status Badges:**
```tsx
pending: 'bg-yellow-100 text-yellow-700'
processing: 'bg-blue-100 text-blue-700'
shipped: 'bg-purple-100 text-purple-700'
delivered: 'bg-green-100 text-green-700'
cancelled: 'bg-red-100 text-red-700'
```

---

## 📁 Dosya Yapısı

```
app/
├── account/
│   ├── layout.tsx              # ✨ Sidebar layout + auth guard
│   ├── page.tsx                # ✨ Pano (dashboard)
│   ├── orders/page.tsx         # ✨ Siparişler
│   ├── addresses/page.tsx      # ✨ Adresler
│   ├── details/page.tsx        # ✨ Hesap detayları
│   └── favorites/page.tsx      # ✨ Favorilerim
│
├── login/page.tsx              # ✅ Role-based redirect
├── register/page.tsx           # Kayıt
└── forgot-password/page.tsx    # Şifre sıfırlama
```

---

## 🧪 Test Senaryoları

### Test 1: Normal Kullanıcı
1. Kayıt ol → Email onayla
2. Login yap
3. Otomatik `/account` sayfasına git
4. Sidebar menüyü test et
5. Siparişleri görüntüle
6. Hesap detaylarını güncelle

### Test 2: Admin Kullanıcı
1. Admin email ile login (`admin@bsbilisim.com`)
2. Otomatik `/admin/dashboard` sayfasına git
3. Admin paneli açılmalı

### Test 3: Sipariş Oluşturma
1. Kullanıcı olarak login
2. Ürün sepete ekle
3. Checkout yap
4. `/account/orders` sayfasında sipariş görünsün

---

## 🔧 Database Setup

```sql
-- is_admin sütunu ekle (eğer yoksa)
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- RLS Policies
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);
```

---

## ✨ Özellikler

**Tamamlanan:**
- ✅ Hesabım layout (sidebar)
- ✅ Pano (istatistikler + son siparişler)
- ✅ Siparişler listesi
- ✅ Hesap detayları düzenleme
- ✅ Role-based login redirect
- ✅ Authentication guard
- ✅ Responsive design

**Yakında:**
- ⏳ Adres yönetimi (CRUD)
- ⏳ Favoriler sistemi
- ⏳ Sipariş detay modal
- ⏳ Profil fotoğrafı
- ⏳ Şifre değiştirme

---

## 🎯 Kullanım Örnekleri

### Login Redirect Mantığı

```typescript
// Login sayfasında:
const { data: profile } = await supabase
  .from('user_profiles')
  .select('is_admin')
  .eq('id', data.user.id)
  .single();

if (profile?.is_admin) {
  router.push('/admin/dashboard');  // Admin
} else {
  router.push('/account');          // Normal kullanıcı
}
```

### Sipariş Durumu Badge

```typescript
const getStatusBadge = (status: string) => {
  const badges: any = {
    pending: { label: 'Beklemede', class: 'bg-yellow-100 text-yellow-700' },
    processing: { label: 'İşleniyor', class: 'bg-blue-100 text-blue-700' },
    // ...
  };
  return badges[status] || badges.pending;
};
```

---

## 🎉 Özet

Artık:
1. ✅ Kullanıcılar kendi hesap paneline erişebilir
2. ✅ Siparişlerini görüntüleyebilir
3. ✅ Hesap bilgilerini güncelleyebilir
4. ✅ Login'de role göre otomatik yönlendirme
5. ✅ Admin ve user tamamen ayrı

**Sonraki adım:** Adres yönetimi ve favoriler sistemi eklemek! 🚀
