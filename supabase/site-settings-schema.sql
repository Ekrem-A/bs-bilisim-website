-- Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name TEXT NOT NULL DEFAULT 'BS Bilişim',
  site_description TEXT DEFAULT 'Teknoloji Çözümleri',
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_address TEXT,
  contact_city TEXT,
  business_hours TEXT,
  tax_office TEXT,
  tax_number TEXT,
  mersis_number TEXT,
  social_facebook TEXT,
  social_instagram TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (
  site_name,
  site_description,
  contact_email,
  contact_phone,
  contact_address,
  contact_city,
  business_hours,
  tax_office,
  tax_number,
  mersis_number
) VALUES (
  'BS Bilişim',
  'Teknoloji Çözümleri',
  'info@bsbilisim.com',
  '0555 555 55 55',
  'Zeytinburnu, İstanbul',
  'İstanbul',
  'Pazartesi - Cumartesi: 09:00 - 18:00',
  'Zeytinburnu Vergi Dairesi',
  '1234567890',
  '0123456789012345'
) ON CONFLICT DO NOTHING;

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read settings
CREATE POLICY "Everyone can view site settings"
  ON site_settings
  FOR SELECT
  TO public
  USING (true);

-- Policy: Only admins can update settings
CREATE POLICY "Only admins can update site settings"
  ON site_settings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    )
  );

-- Policy: Only admins can insert settings
CREATE POLICY "Only admins can insert site settings"
  ON site_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.is_admin = true
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_site_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_site_settings_timestamp
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_site_settings_updated_at();
