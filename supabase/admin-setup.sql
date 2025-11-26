-- BS Bilişim Admin Kullanıcı Kontrol ve Düzeltme Script
-- Bu script'i Supabase SQL Editor'de çalıştırın

-- 1. ÖNCE: user_profiles tablosunda is_admin sütunu var mı kontrol et
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
AND column_name = 'is_admin';

-- Eğer yukarıdaki sorgu boş dönerse, is_admin sütununu ekle:
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- 2. Mevcut tüm kullanıcıları listele (is_admin durumlarıyla)
SELECT 
    id,
    email,
    full_name,
    is_admin,
    created_at
FROM user_profiles
ORDER BY created_at DESC;

-- 3. Admin kullanıcınızın email'ini kontrol et (BURAYA KENDİ EMAİLİNİZİ YAZIN)
SELECT 
    id,
    email,
    is_admin,
    created_at
FROM user_profiles
WHERE email = 'admin@bsbilisim.com';  -- Email'inizi buraya yazın

-- 4. Admin kullanıcıyı ayarla (EMAİLİNİZİ YAZIN)
UPDATE user_profiles
SET is_admin = true
WHERE email = 'admin@bsbilisim.com';  -- Email'inizi buraya yazın

-- 5. Doğrula - Admin kullanıcı artık is_admin = true olmalı
SELECT 
    email,
    is_admin,
    CASE 
        WHEN is_admin = true THEN '✅ ADMIN'
        ELSE '❌ NORMAL USER'
    END as role
FROM user_profiles
WHERE email = 'admin@bsbilisim.com';  -- Email'inizi buraya yazın

-- 6. RLS Policy Kontrol - user_profiles okunabilir mi?
SELECT tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'user_profiles';

-- 7. Eğer user_profiles'a erişim yoksa, RLS policy ekle:
CREATE POLICY IF NOT EXISTS "Users can view own profile" 
ON user_profiles FOR SELECT 
USING (auth.uid() = id);

-- 8. Admin'ler tüm profilleri görebilsin
CREATE POLICY IF NOT EXISTS "Admins can view all profiles" 
ON user_profiles FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM user_profiles up
        WHERE up.id = auth.uid() 
        AND up.is_admin = true
    )
);

-- 9. Son kontrol - Tüm admin kullanıcılar
SELECT 
    email,
    full_name,
    is_admin,
    created_at
FROM user_profiles
WHERE is_admin = true;

-- 10. AUTH kullanıcıları ile USER_PROFILES eşleştir
SELECT 
    au.id,
    au.email as auth_email,
    up.email as profile_email,
    up.is_admin,
    CASE 
        WHEN up.id IS NULL THEN '❌ PROFILE EKSIK'
        WHEN up.is_admin = true THEN '✅ ADMIN'
        ELSE '👤 USER'
    END as status
FROM auth.users au
LEFT JOIN user_profiles up ON au.id = up.id
ORDER BY au.created_at DESC;
