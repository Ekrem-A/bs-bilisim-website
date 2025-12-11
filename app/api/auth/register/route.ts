import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { 
  validateEmail, 
  validatePassword, 
  validatePhone, 
  validateFullName,
  sanitizeInput,
  checkRateLimit 
} from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(`register-${ip}`, 3, 600000)) {
      return NextResponse.json(
        { error: 'Çok fazla kayıt denemesi. Lütfen 10 dakika sonra tekrar deneyin.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password, fullName, phone } = body;

    // Validate inputs
    const sanitizedEmail = email?.trim().toLowerCase();
    if (!validateEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi girin' },
        { status: 400 }
      );
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.message || 'Geçersiz şifre' },
        { status: 400 }
      );
    }

    const sanitizedFullName = sanitizeInput(fullName?.trim() || '');
    if (!validateFullName(sanitizedFullName)) {
      return NextResponse.json(
        { error: 'Geçerli bir ad soyad girin (en az 3 karakter)' },
        { status: 400 }
      );
    }

    const cleanPhone = phone?.replace(/\s/g, '');
    if (cleanPhone && !validatePhone(cleanPhone)) {
      return NextResponse.json(
        { error: 'Geçerli bir telefon numarası girin' },
        { status: 400 }
      );
    }

    // Create Supabase client with cookie handling
    let response = NextResponse.json({ success: true });
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, {
                ...options,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 7 days
              });
            });
          },
        },
      }
    );

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('user_profiles')
      .select('email')
      .eq('email', sanitizedEmail)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu e-posta adresi zaten kullanılıyor' },
        { status: 409 }
      );
    }

    // Sign up user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: sanitizedEmail,
      password,
      options: {
        data: {
          full_name: sanitizedFullName,
          phone: cleanPhone || null,
        },
      },
    });

    if (signUpError) {
      console.error('Sign up error:', signUpError);
      if (signUpError.message.includes('already registered')) {
        return NextResponse.json(
          { error: 'Bu e-posta adresi zaten kullanılıyor' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: 'Kayıt olurken bir hata oluştu' },
        { status: 500 }
      );
    }

    if (!data.user) {
      return NextResponse.json(
        { error: 'Kullanıcı oluşturulamadı' },
        { status: 500 }
      );
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: data.user.id,
        email: sanitizedEmail,
        full_name: sanitizedFullName,
        phone: cleanPhone || null,
        is_admin: false,
      });

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Don't fail the registration, profile can be created later
    }

    return NextResponse.json({
      success: true,
      message: 'Kayıt başarılı! E-postanızı onaylayın.',
      user: {
        id: data.user.id,
        email: data.user.email,
        fullName: sanitizedFullName,
      },
    });

  } catch (error: any) {
    console.error('Register API error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
