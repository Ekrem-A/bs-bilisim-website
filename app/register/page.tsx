'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, Phone, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { 
  validateEmail, 
  validatePassword, 
  validatePhone, 
  validateFullName,
  sanitizeInput,
  checkRateLimit 
} from '@/lib/validation';

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');
    setSuccess('');
    
    // Real-time validation
    const newErrors = { ...validationErrors };
    
    if (name === 'fullName') {
      if (value.trim() && value.trim().length < 3) {
        newErrors.fullName = 'Ad soyad en az 3 karakter olmalıdır';
      } else if (value.trim() && !/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(value)) {
        newErrors.fullName = 'Sadece harf karakterleri kullanın';
      } else {
        newErrors.fullName = '';
      }
    }
    
    if (name === 'email') {
      if (value.trim() && !validateEmail(value.trim())) {
        newErrors.email = 'Geçerli bir e-posta adresi girin';
      } else {
        newErrors.email = '';
      }
    }
    
    if (name === 'phone') {
      const cleanPhone = value.replace(/\s/g, '');
      if (cleanPhone && !validatePhone(cleanPhone)) {
        newErrors.phone = 'Geçerli bir telefon numarası girin (05XX XXX XX XX)';
      } else {
        newErrors.phone = '';
      }
    }
    
    if (name === 'password') {
      if (value && value.length < 8) {
        newErrors.password = 'Şifre en az 8 karakter olmalıdır';
      } else if (value && !/[A-Z]/.test(value)) {
        newErrors.password = 'Şifre en az bir büyük harf içermelidir';
      } else if (value && !/[a-z]/.test(value)) {
        newErrors.password = 'Şifre en az bir küçük harf içermelidir';
      } else if (value && !/[0-9]/.test(value)) {
        newErrors.password = 'Şifre en az bir rakam içermelidir';
      } else {
        newErrors.password = '';
      }
      
      // Check confirm password match
      if (formData.confirmPassword && value !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Şifreler eşleşmiyor';
      } else if (formData.confirmPassword) {
        newErrors.confirmPassword = '';
      }
    }
    
    if (name === 'confirmPassword') {
      if (value && value !== formData.password) {
        newErrors.confirmPassword = 'Şifreler eşleşmiyor';
      } else {
        newErrors.confirmPassword = '';
      }
    }
    
    setValidationErrors(newErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Rate limiting check
    if (!checkRateLimit('register', 3, 300000)) { // 3 attempts per 5 minutes
      setError('Çok fazla kayıt denemesi. Lütfen 5 dakika sonra tekrar deneyin.');
      return;
    }

    // Sanitize inputs
    const sanitizedData = {
      fullName: sanitizeInput(formData.fullName),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.replace(/\s/g, ''),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    // Validation
    if (!validateFullName(sanitizedData.fullName)) {
      setError('Geçersiz ad soyad. En az 3 karakter ve sadece harf içermelidir.');
      return;
    }

    if (!validateEmail(sanitizedData.email)) {
      setError('Geçerli bir e-posta adresi girin');
      return;
    }

    if (!validatePhone(sanitizedData.phone)) {
      setError('Geçersiz telefon numarası. Format: 05XX XXX XX XX');
      return;
    }

    if (sanitizedData.password !== sanitizedData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    const passwordValidation = validatePassword(sanitizedData.password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.message || 'Geçersiz şifre');
      return;
    }

    setLoading(true);
    setLoadingMessage('Kayıt işlemi yapılıyor...');

    try {
      // Sign up with Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: sanitizedData.email,
        password: sanitizedData.password,
        options: {
          data: {
            full_name: sanitizedData.fullName,
            phone: sanitizedData.phone,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        setLoadingMessage('Profil oluşturuluyor...');
        
        // Create user profile
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: data.user.id,
            email: sanitizedData.email,
            full_name: sanitizedData.fullName,
            phone: sanitizedData.phone,
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }

        // Show success message
        setSuccess('Kayıt başarılı! Lütfen email adresinizi kontrol edin ve hesabınızı onaylayın.');
        setLoadingMessage('');
        
        // Redirect after delay
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // User-friendly error messages
      let errorMessage = 'Kayıt sırasında bir hata oluştu';
      if (error.message?.includes('already registered')) {
        errorMessage = 'Bu e-posta adresi zaten kayıtlı';
      } else if (error.message?.includes('Invalid email')) {
        errorMessage = 'Geçersiz e-posta adresi';
      }
      
      setError(errorMessage);
      setLoadingMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[100px]"></div>
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center space-x-3 mb-8 group">
          <div className="w-20 h-20 relative transform group-hover:scale-110 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-cyan-500/30 flex items-center justify-center">
              <Image
                src="/bs-logo.png"
                alt="BS Bilişim Logo"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-wide group-hover:text-cyan-400 transition-colors duration-300">BS BİLİŞİM</h1>
            <p className="text-sm text-cyan-400 font-semibold uppercase tracking-wider">Teknoloji Çözümleri</p>
          </div>
        </Link>

        {/* Register Card */}
        <div className="relative">
          {/* Card Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/30 via-blue-500/30 to-cyan-500/30 rounded-3xl blur-xl opacity-75"></div>
          
          <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-cyan-500/30 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-black text-white mb-3 uppercase tracking-wide bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Hesap Oluştur
              </h2>
              <p className="text-gray-400 font-medium">Hemen ücretsiz kayıt olun</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border-2 border-red-500/50 rounded-xl text-red-400 text-sm backdrop-blur-sm font-medium">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-500/10 border-2 border-green-500/50 rounded-xl text-green-400 text-sm backdrop-blur-sm font-medium">
                {success}
              </div>
            )}

            {loadingMessage && (
              <div className="mb-6 p-4 bg-cyan-500/10 border-2 border-cyan-500/50 rounded-xl text-cyan-400 text-sm backdrop-blur-sm font-medium flex items-center">
                <Loader2 size={16} className="animate-spin mr-2" />
                {loadingMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div className="group">
                <label htmlFor="fullName" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                  Ad Soyad *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={20} className="text-cyan-400 group-focus-within:text-cyan-300 transition-colors" />
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className={`block w-full pl-12 pr-4 py-4 bg-gray-800/50 border-2 ${validationErrors.fullName ? 'border-yellow-500' : 'border-gray-700'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all backdrop-blur-sm font-medium`}
                    placeholder="Adınız Soyadınız"
                  />
                </div>
                {validationErrors.fullName && (
                  <p className="mt-2 text-xs text-yellow-400 font-medium flex items-center">
                    <span className="mr-1">⚠</span> {validationErrors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="group">
                <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                  E-posta *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={20} className="text-cyan-400 group-focus-within:text-cyan-300 transition-colors" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`block w-full pl-12 pr-4 py-4 bg-gray-800/50 border-2 ${validationErrors.email ? 'border-yellow-500' : 'border-gray-700'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all backdrop-blur-sm font-medium`}
                    placeholder="ornek@email.com"
                  />
                </div>
                {validationErrors.email && (
                  <p className="mt-2 text-xs text-yellow-400 font-medium flex items-center">
                    <span className="mr-1">⚠</span> {validationErrors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="group">
                <label htmlFor="phone" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                  Telefon *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone size={20} className="text-cyan-400 group-focus-within:text-cyan-300 transition-colors" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={`block w-full pl-12 pr-4 py-4 bg-gray-800/50 border-2 ${validationErrors.phone ? 'border-yellow-500' : 'border-gray-700'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all backdrop-blur-sm font-medium`}
                    placeholder="0555 555 55 55"
                  />
                </div>
                {validationErrors.phone && (
                  <p className="mt-2 text-xs text-yellow-400 font-medium flex items-center">
                    <span className="mr-1">⚠</span> {validationErrors.phone}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="group">
                <label htmlFor="password" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                  Şifre *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={20} className="text-cyan-400 group-focus-within:text-cyan-300 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`block w-full pl-12 pr-14 py-4 bg-gray-800/50 border-2 ${validationErrors.password ? 'border-yellow-500' : 'border-gray-700'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all backdrop-blur-sm font-medium`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="mt-2 text-xs text-yellow-400 font-medium flex items-center">
                    <span className="mr-1">⚠</span> {validationErrors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="group">
                <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wide">
                  Şifre Tekrar *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={20} className="text-cyan-400 group-focus-within:text-cyan-300 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={`block w-full pl-12 pr-4 py-4 bg-gray-800/50 border-2 ${validationErrors.confirmPassword ? 'border-yellow-500' : 'border-gray-700'} rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all backdrop-blur-sm font-medium`}
                    placeholder="••••••••"
                  />
                </div>
                {validationErrors.confirmPassword && (
                  <p className="mt-2 text-xs text-yellow-400 font-medium flex items-center">
                    <span className="mr-1">⚠</span> {validationErrors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="relative w-full mt-8 group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-black text-lg uppercase tracking-wider hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border-2 border-cyan-400/50">
                  {loading ? (
                    <>
                      <Loader2 size={24} className="animate-spin mr-3" />
                      Kaydediliyor...
                    </>
                  ) : (
                    'KAYIT OL'
                  )}
                </div>
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center pt-6 border-t border-gray-700/50">
              <p className="text-gray-400 text-sm font-medium">
                Zaten hesabınız var mı?{' '}
                <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors uppercase tracking-wide">
                  Giriş Yapın
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-gray-400 hover:text-cyan-400 text-sm font-semibold transition-colors uppercase tracking-wide flex items-center justify-center group">
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
