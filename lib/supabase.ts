import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a singleton instance with proper cookie handling
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey, {
  cookies: {
    get(name: string) {
      if (typeof document === 'undefined') return undefined;
      const value = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${name}=`))
        ?.split('=')[1];
      return value;
    },
    set(name: string, value: string, options: any) {
      if (typeof document === 'undefined') return;
      let cookie = `${name}=${value}`;
      if (options.maxAge) cookie += `; max-age=${options.maxAge}`;
      if (options.path) cookie += `; path=${options.path}`;
      if (options.sameSite) cookie += `; samesite=${options.sameSite}`;
      if (options.secure) cookie += '; secure';
      document.cookie = cookie;
    },
    remove(name: string, options: any) {
      if (typeof document === 'undefined') return;
      let cookie = `${name}=; max-age=0`;
      if (options.path) cookie += `; path=${options.path}`;
      document.cookie = cookie;
    },
  },
});

export default supabase;
