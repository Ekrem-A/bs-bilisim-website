# Admin Login Sorun Giderme Rehberi 🔧

## Adım 1: Browser Console'u Kontrol Et

1. Tarayıcıda **F12** tuşuna bas
2. **Console** sekmesini aç
3. Login sayfasına git ve admin email ile giriş yap
4. Console'da şu logları göreceksin:

```
1. Login attempt with: admin@bsbilisim.com
2. Login successful, user: [user-id]
3. Fetching user profile...
4. Profile data: {is_admin: true, email: "..."}
5. Profile error: null
6. is_admin value: true
7. Redirecting to ADMIN dashboard
```

### Olası Durumlar:

**Durum 1: "Profile data: null"**
→ Sorun: user_profiles tablosunda kayıt yok
→ Çözüm: Adım 2'ye git

**Durum 2: "Profile data: {is_admin: null}" veya "is_admin: false"**
→ Sorun: is_admin sütunu yok veya false
→ Çözüm: Adım 3'e git

**Durum 3: "Profile error: [hata mesajı]"**
→ Sorun: RLS policy sorunu
→ Çözüm: Adım 4'e git

---

## Adım 2: User Profile Kontrol

### Supabase Dashboard'da:

1. **Table Editor** → **user_profiles**
2. Admin email'inizi bulun
3. Kayıt var mı?

**Kayıt YOKSA:**
```sql
-- Supabase SQL Editor'de çalıştır:
INSERT INTO user_profiles (id, email, full_name, is_admin)
SELECT 
    id,
    email,
    email as full_name,
    true as is_admin
FROM auth.users
WHERE email = 'admin@bsbilisim.com';  -- Email'inizi yazın
```

---

## Adım 3: is_admin Sütunu Kontrol ve Ayarla

### Kontrol:

```sql
-- Sütun var mı?
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
AND column_name = 'is_admin';
```

**Sütun YOKSA:**
```sql
-- Sütunu ekle
ALTER TABLE user_profiles 
ADD COLUMN is_admin BOOLEAN DEFAULT false;
```

### Admin Kullanıcı Ayarla:

```sql
-- Admin yap
UPDATE user_profiles
SET is_admin = true
WHERE email = 'admin@bsbilisim.com';  -- Email'inizi yazın

-- Kontrol et
SELECT email, is_admin 
FROM user_profiles 
WHERE email = 'admin@bsbilisim.com';
```

**Sonuç şöyle olmalı:**
```
email                  | is_admin
-----------------------|---------
admin@bsbilisim.com   | true
```

---

## Adım 4: RLS Policies Kontrol

### Mevcut Policies:

```sql
-- user_profiles policies kontrol
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'user_profiles';
```

### Gerekli Policies:

```sql
-- 1. Kullanıcılar kendi profilini görebilir
CREATE POLICY "Users can view own profile" 
ON user_profiles FOR SELECT 
USING (auth.uid() = id);

-- 2. Kullanıcılar kendi profilini güncelleyebilir
CREATE POLICY "Users can update own profile" 
ON user_profiles FOR UPDATE 
USING (auth.uid() = id);

-- 3. Adminler tüm profilleri görebilir
CREATE POLICY "Admins can view all profiles" 
ON user_profiles FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE id = auth.uid() 
        AND is_admin = true
    )
);
```

---

## Adım 5: Tam Kontrol Script

**Supabase SQL Editor'de çalıştır:**

```sql
-- Komple kontrol
WITH admin_check AS (
    SELECT 
        au.id as auth_id,
        au.email as auth_email,
        up.id as profile_id,
        up.email as profile_email,
        up.is_admin
    FROM auth.users au
    LEFT JOIN user_profiles up ON au.id = up.id
    WHERE au.email = 'admin@bsbilisim.com'  -- Email'inizi yazın
)
SELECT 
    *,
    CASE 
        WHEN profile_id IS NULL THEN '❌ PROFILE YOK - Adım 2'
        WHEN is_admin IS NULL THEN '❌ is_admin SÜTUNU YOK - Adım 3'
        WHEN is_admin = false THEN '❌ is_admin FALSE - Adım 3'
        WHEN is_admin = true THEN '✅ HER ŞEY TAMAM - Adım 6'
    END as durum
FROM admin_check;
```

---

## Adım 6: Test Et

1. **Çıkış yap** (eğer girişsen)
2. **Login sayfasına git** (`/login`)
3. Admin email ve şifre ile giriş yap
4. **Console'da logları izle**
5. Otomatik `/admin/dashboard`'a yönlenmeli

---

## Hızlı Çözüm (Hepsi Bir Arada)

**Supabase SQL Editor'de bu script'i çalıştır:**

```sql
-- 1. is_admin sütunu ekle (eğer yoksa)
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- 2. Admin kullanıcı oluştur/güncelle
INSERT INTO user_profiles (id, email, full_name, is_admin)
SELECT 
    id,
    email,
    COALESCE(raw_user_meta_data->>'full_name', email) as full_name,
    true as is_admin
FROM auth.users
WHERE email = 'admin@bsbilisim.com'  -- Email'inizi yazın
ON CONFLICT (id) 
DO UPDATE SET is_admin = true;

-- 3. RLS policies ekle
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
CREATE POLICY "Users can view own profile" 
ON user_profiles FOR SELECT 
USING (auth.uid() = id);

-- 4. Doğrula
SELECT 
    email,
    is_admin,
    CASE 
        WHEN is_admin = true THEN '✅ ADMIN - GİRİŞ YAPABİLİRSİN'
        ELSE '❌ NORMAL USER'
    END as sonuc
FROM user_profiles
WHERE email = 'admin@bsbilisim.com';
```

---

## Hala Çalışmıyorsa?

### Kontrol Listesi:

- [ ] ✅ user_profiles tablosunda kayıt var
- [ ] ✅ is_admin sütunu var
- [ ] ✅ is_admin = true
- [ ] ✅ RLS policies var
- [ ] ✅ Browser console'da loglar görünüyor
- [ ] ✅ Login başarılı
- [ ] ✅ Profile fetch başarılı

### Debug:

1. **Network sekmesi** (F12) → XHR filtrele
2. Login sırasında `user_profiles` isteğini bul
3. Response'a bak:
   - 200 OK → Veri döndü mü?
   - 401/403 → RLS sorunu
   - 404 → Endpoint sorunu

---

## Son Çare: Manuel Yönlendirme

Eğer otomatik yönlendirme çalışmıyorsa, direkt gidebilirsiniz:

```
http://localhost:3000/admin/dashboard
```

Admin layout otomatik kontrol edecek:
- Admin değilsen → `/login`'e atar
- Adminsen → Dashboard gösterir

---

## Önemli Notlar

1. **Email'i doğru yazdığınızdan emin olun**
   - Büyük/küçük harf önemli
   - Boşluk olmamalı

2. **Browser cache'i temizleyin**
   ```
   Ctrl + Shift + Delete
   → Cached images and files
   → Clear data
   ```

3. **Hard refresh yapın**
   ```
   Ctrl + Shift + R (Windows/Linux)
   Cmd + Shift + R (Mac)
   ```

4. **Incognito/Private modda test edin**

---

## İletişim

Hala sorun varsa, console'daki logları paylaşın:
- Profile data nedir?
- Profile error nedir?
- is_admin value nedir?

Bu bilgilerle sorunu çözebiliriz! 🚀
