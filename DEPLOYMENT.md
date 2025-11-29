# Vercel Deployment Checklist

## ✅ Pre-Deployment Kontrolü

### 1. Environment Variables
- [ ] `.env.local` dosyası oluşturuldu
- [ ] `NEXT_PUBLIC_SUPABASE_URL` ayarlandı
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` ayarlandı
- [ ] `.env.local` dosyası `.gitignore`'da

### 2. Supabase Veritabanı
- [ ] `schema.sql` çalıştırıldı
- [ ] `add-admin-column.sql` çalıştırıldı
- [ ] `fix-user-profiles-policy.sql` çalıştırıldı
- [ ] `favorites-addresses-schema.sql` çalıştırıldı
- [ ] Admin kullanıcısı oluşturuldu (`is_admin = true`)
- [ ] RLS policies aktif

### 3. Code Kontrolü
- [ ] `npm run build` hatasız çalışıyor
- [ ] `npm run lint` hatasız
- [ ] Tüm import'lar doğru
- [ ] Console error'ları temizlendi

### 4. Git Repository
- [ ] Son değişiklikler commit edildi
- [ ] GitHub'a push edildi
- [ ] `.env` dosyası git'te yok

## 🚀 Vercel Deployment Adımları

### Adım 1: Vercel'e Bağlan
1. [vercel.com](https://vercel.com) → Sign Up/Login
2. GitHub hesabınızı bağlayın

### Adım 2: Import Project
1. "New Project" butonuna tıklayın
2. Repository'nizi seçin: `bs-bilisim-website`
3. Framework Preset: **Next.js** (otomatik)
4. Root Directory: `./` (varsayılan)

### Adım 3: Environment Variables Ekle
Vercel Dashboard'da aşağıdaki değişkenleri ekleyin:

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: [Supabase Project URL'niz]

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY  
Value: [Supabase Anon Key'iniz]
```

**Supabase bilgilerini nereden bulabilirsiniz?**
- Supabase Dashboard → Project Settings → API
- URL: `Project URL`
- Anon Key: `anon` public key

### Adım 4: Deploy
1. "Deploy" butonuna tıklayın
2. Build sürecini izleyin (~2-3 dakika)
3. Deploy tamamlandığında URL'niz hazır!

## 📋 Deploy Sonrası Kontroller

### Test Checklist
- [ ] Ana sayfa açılıyor
- [ ] Login/Register çalışıyor
- [ ] Admin paneline giriş yapılabiliyor
- [ ] Ürünler listeleniyor
- [ ] Sepet çalışıyor
- [ ] Sipariş oluşturulabiliyor
- [ ] İletişim formu çalışıyor
- [ ] Sosyal medya linkleri doğru
- [ ] Responsive görünüm test edildi

### Performance Kontrol
- [ ] Lighthouse Score kontrol edildi
- [ ] Image'lar optimize
- [ ] Core Web Vitals iyi

## 🔧 Deployment Sorunları ve Çözümler

### Build Hatası
```bash
# Local'de test edin
npm run build

# Hata varsa:
npm run lint
```

### Environment Variables Hatası
- Vercel Dashboard → Settings → Environment Variables
- Değişkenleri kontrol edin ve yeniden deploy edin

### Database Connection Hatası
- Supabase URL ve Key'i kontrol edin
- RLS policies'i kontrol edin
- Supabase project'in aktif olduğunu doğrulayın

### 404 Hatası
- `next.config.js` doğru yapılandırıldığını kontrol edin
- Build output'u kontrol edin

## 🔄 Güncelleme (Re-deploy)

Her Git push'unda Vercel otomatik deploy eder:

```bash
git add .
git commit -m "Update: açıklama"
git push origin main
```

Manuel deploy için:
1. Vercel Dashboard → Deployments
2. Son commit'e "Redeploy" tıklayın

## 🌐 Custom Domain Ekleme

1. Vercel Dashboard → Settings → Domains
2. Domain adınızı ekleyin
3. DNS kayıtlarını güncelleyin:
   ```
   A Record: 76.76.21.21
   CNAME: cname.vercel-dns.com
   ```

## 📊 Analytics ve Monitoring

Vercel otomatik olarak sağlar:
- Analytics (ziyaretçi istatistikleri)
- Speed Insights
- Web Vitals
- Error tracking

Dashboard → Analytics'te görüntüleyin.

## 🔐 Güvenlik

- [ ] Environment variables production'da doğru
- [ ] Supabase RLS policies aktif
- [ ] Admin email hardcoded değil
- [ ] API endpoints korumalı
- [ ] CORS ayarları doğru

## ✅ Production Ready!

Tüm adımlar tamamlandıktan sonra siteniz canlıda!

**Production URL:** `https://your-project.vercel.app`

---

Sorun yaşarsanız: [Vercel Docs](https://vercel.com/docs)
