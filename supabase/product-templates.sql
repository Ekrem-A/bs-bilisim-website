-- ==================================================
-- ÜRÜN ŞABLONLARı - SPECS VE TAGS
-- ==================================================

-- Etiket şablonları (kategoriye göre)
CREATE TABLE IF NOT EXISTS product_tag_templates (
  id           uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id  uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  tag          text NOT NULL,
  sort_order   int NOT NULL DEFAULT 0,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Özellik şablonları (kategoriye göre)
CREATE TABLE IF NOT EXISTS product_spec_templates (
  id           uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id  uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  key          text NOT NULL,   -- JSON içindeki key (örn: 'TDP', 'Bellek', 'Soket')
  label        text NOT NULL,   -- Admin panelde gözükecek ad (örn: 'TDP (W)', 'Bellek Kapasitesi')
  input_type   text NOT NULL DEFAULT 'text',  -- 'text' | 'number' | 'select' | 'boolean'
  unit         text,            -- 'W', 'GHz', 'GB' vs.
  options      text[],          -- select için seçenekler (örn: ARRAY['DDR4','DDR5'])
  sort_order   int  NOT NULL DEFAULT 0,
  is_filterable boolean NOT NULL DEFAULT true,   -- site tarafında filtrede kullanmak ister misin
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index'ler
CREATE INDEX IF NOT EXISTS idx_product_tag_templates_category ON product_tag_templates(category_id);
CREATE INDEX IF NOT EXISTS idx_product_spec_templates_category ON product_spec_templates(category_id);

-- RLS Policies
ALTER TABLE product_tag_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_spec_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tag templates viewable by everyone" ON product_tag_templates FOR SELECT USING (true);
CREATE POLICY "Spec templates viewable by everyone" ON product_spec_templates FOR SELECT USING (true);

-- ==========================
-- RAM
-- ==========================
INSERT INTO product_spec_templates (category_id, key, label, input_type, unit, options, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'ram'), 'capacity',       'Kapasite',           'number', 'GB',   NULL, 10),
((SELECT id FROM categories WHERE slug = 'ram'), 'kit_capacity',   'Kit Kapasitesi',     'text',   NULL,  NULL, 20),
((SELECT id FROM categories WHERE slug = 'ram'), 'modules',        'Modül Sayısı',       'number', NULL,  NULL, 30),
((SELECT id FROM categories WHERE slug = 'ram'), 'type',           'Tip',                'select', NULL,  ARRAY['DDR4','DDR5'], 40),
((SELECT id FROM categories WHERE slug = 'ram'), 'speed',          'Hız',                'number', 'MHz',  NULL, 50),
((SELECT id FROM categories WHERE slug = 'ram'), 'latency',        'Gecikme (CL)',       'text',   NULL,  NULL, 60),
((SELECT id FROM categories WHERE slug = 'ram'), 'voltage',        'Voltaj',             'number', 'V',    NULL, 70),
((SELECT id FROM categories WHERE slug = 'ram'), 'rgb',            'RGB Aydınlatma',     'boolean',NULL,  NULL, 80);

INSERT INTO product_tag_templates (category_id, tag, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'ram'), 'DDR4',           10),
((SELECT id FROM categories WHERE slug = 'ram'), 'DDR5',           20),
((SELECT id FROM categories WHERE slug = 'ram'), 'RGB',            30),
((SELECT id FROM categories WHERE slug = 'ram'), 'Low Profile',    40),
((SELECT id FROM categories WHERE slug = 'ram'), 'OC Uyumlu',      50),
((SELECT id FROM categories WHERE slug = 'ram'), 'Yüksek Frekans', 60);

-- ==========================
-- ANAKART
-- ==========================
INSERT INTO product_spec_templates (category_id, key, label, input_type, unit, options, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'anakart'), 'socket',       'Soket',                 'select', NULL, ARRAY['LGA1700','AM4','AM5','LGA1200'], 10),
((SELECT id FROM categories WHERE slug = 'anakart'), 'chipset',      'Yonga Seti (Chipset)',  'text',   NULL, NULL, 20),
((SELECT id FROM categories WHERE slug = 'anakart'), 'form_factor',  'Form Faktör',           'select', NULL, ARRAY['ATX','mATX','Mini-ITX'], 30),
((SELECT id FROM categories WHERE slug = 'anakart'), 'memory_type',  'RAM Tipi',              'select', NULL, ARRAY['DDR4','DDR5'], 40),
((SELECT id FROM categories WHERE slug = 'anakart'), 'memory_slots', 'RAM Slot Sayısı',       'number', NULL, NULL, 50),
((SELECT id FROM categories WHERE slug = 'anakart'), 'max_memory',   'Maks. RAM Kapasitesi',  'number', 'GB',  NULL, 60),
((SELECT id FROM categories WHERE slug = 'anakart'), 'pcie_slots',   'PCIe Slot Sayısı',      'text',   NULL, NULL, 70),
((SELECT id FROM categories WHERE slug = 'anakart'), 'm2_slots',     'M.2 Slot Sayısı',       'number', NULL, NULL, 80),
((SELECT id FROM categories WHERE slug = 'anakart'), 'sata_ports',   'SATA Port Sayısı',      'number', NULL, NULL, 90),
((SELECT id FROM categories WHERE slug = 'anakart'), 'wifi',         'WiFi',                  'boolean',NULL, NULL, 100),
((SELECT id FROM categories WHERE slug = 'anakart'), 'bluetooth',    'Bluetooth',             'boolean',NULL, NULL, 110),
((SELECT id FROM categories WHERE slug = 'anakart'), 'rgb_header',   'RGB Header',            'boolean',NULL, NULL, 120);

INSERT INTO product_tag_templates (category_id, tag, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'anakart'), 'DDR4',       10),
((SELECT id FROM categories WHERE slug = 'anakart'), 'DDR5',       20),
((SELECT id FROM categories WHERE slug = 'anakart'), 'WiFi 6',     30),
((SELECT id FROM categories WHERE slug = 'anakart'), 'WiFi 6E',    40),
((SELECT id FROM categories WHERE slug = 'anakart'), 'PCIe 4.0',   50),
((SELECT id FROM categories WHERE slug = 'anakart'), 'PCIe 5.0',   60),
((SELECT id FROM categories WHERE slug = 'anakart'), 'Gaming',     70),
((SELECT id FROM categories WHERE slug = 'anakart'), 'mATX',       80),
((SELECT id FROM categories WHERE slug = 'anakart'), 'ATX',        90);

-- ==========================
-- İŞLEMCİ
-- ==========================
INSERT INTO product_spec_templates (category_id, key, label, input_type, unit, options, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'islemci'), 'socket',        'Soket',                'select', NULL, ARRAY['LGA1700','AM4','AM5','LGA1200'], 10),
((SELECT id FROM categories WHERE slug = 'islemci'), 'cores',         'Çekirdek Sayısı',      'number', NULL, NULL, 20),
((SELECT id FROM categories WHERE slug = 'islemci'), 'threads',       'İş Parçacığı (Thread)', 'number',NULL, NULL, 30),
((SELECT id FROM categories WHERE slug = 'islemci'), 'base_clock',    'Temel Frekans',        'number', 'GHz', NULL, 40),
((SELECT id FROM categories WHERE slug = 'islemci'), 'boost_clock',   'Boost Frekansı',       'number', 'GHz', NULL, 50),
((SELECT id FROM categories WHERE slug = 'islemci'), 'tdp',           'TDP',                  'number', 'W',   NULL, 60),
((SELECT id FROM categories WHERE slug = 'islemci'), 'cache',         'Önbellek',             'text',   NULL, NULL, 70),
((SELECT id FROM categories WHERE slug = 'islemci'), 'igpu',          'Dahili Grafik',        'boolean',NULL, NULL, 80),
((SELECT id FROM categories WHERE slug = 'islemci'), 'unlocked',      'Çarpan Kilidi Açık',   'boolean',NULL, NULL, 90);

INSERT INTO product_tag_templates (category_id, tag, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'islemci'), 'Oyun',        10),
((SELECT id FROM categories WHERE slug = 'islemci'), 'Render',      20),
((SELECT id FROM categories WHERE slug = 'islemci'), 'Ofis',        30),
((SELECT id FROM categories WHERE slug = 'islemci'), 'iGPU''lu',    40),
((SELECT id FROM categories WHERE slug = 'islemci'), 'Çarpan Açık', 50);

-- ==========================
-- EKRAN KARTI
-- ==========================
INSERT INTO product_spec_templates (category_id, key, label, input_type, unit, options, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'ekran-karti'), 'gpu',          'GPU Modeli',        'text',   NULL, NULL, 10),
((SELECT id FROM categories WHERE slug = 'ekran-karti'), 'vram',         'Bellek Kapasitesi', 'number', 'GB',  NULL, 20),
((SELECT id FROM categories WHERE slug = 'ekran-karti'), 'vram_type',    'Bellek Tipi',       'select', NULL, ARRAY['GDDR6','GDDR6X'], 30),
((SELECT id FROM categories WHERE slug = 'ekran-karti'), 'bus_width',    'Veri Yolu (bit)',   'number', 'bit', NULL, 40),
((SELECT id FROM categories WHERE slug = 'ekran-karti'), 'tdp',          'TDP',               'number', 'W',   NULL, 50),
((SELECT id FROM categories WHERE slug = 'ekran-karti'), 'power_conn',   'Güç Bağlantısı',    'text',   NULL, NULL, 60),
((SELECT id FROM categories WHERE slug = 'ekran-karti'), 'rec_psu',      'Önerilen PSU',      'number', 'W',   NULL, 70),
((SELECT id FROM categories WHERE slug = 'ekran-karti'), 'length',       'Kart Uzunluğu',     'number', 'mm',  NULL, 80),
((SELECT id FROM categories WHERE slug = 'ekran-karti'), 'cooling',      'Soğutma',           'text',   NULL, NULL, 90),
((SELECT id FROM categories WHERE slug = 'ekran-karti'), 'fans',         'Fan Sayısı',        'number', NULL, NULL, 100);

INSERT INTO product_tag_templates (category_id, tag, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'ekran-karti'), '4K Gaming',    10),
((SELECT id FROM categories WHERE slug = 'ekran-karti'), '1440p',        20),
((SELECT id FROM categories WHERE slug = 'ekran-karti'), '1080p',        30),
((SELECT id FROM categories WHERE slug = 'ekran-karti'), 'Ray Tracing',  40),
((SELECT id FROM categories WHERE slug = 'ekran-karti'), 'DLSS',         50),
((SELECT id FROM categories WHERE slug = 'ekran-karti'), 'OC Model',     60),
((SELECT id FROM categories WHERE slug = 'ekran-karti'), 'Low Profile',  70),
((SELECT id FROM categories WHERE slug = 'ekran-karti'), 'RGB',          80);

-- ==========================
-- KASA
-- ==========================
INSERT INTO product_spec_templates (category_id, key, label, input_type, unit, options, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'kasa'), 'form_factor',         'Kasa Tipi',        'select', NULL, ARRAY['Mid Tower','Full Tower','Mini Tower','MicroATX'], 10),
((SELECT id FROM categories WHERE slug = 'kasa'), 'mb_support',          'Desteklenen Anakart', 'select', NULL, ARRAY['ATX','mATX','Mini-ITX'], 20),
((SELECT id FROM categories WHERE slug = 'kasa'), 'gpu_max_length',      'Maks. GPU Uzunluğu', 'number', 'mm', NULL, 30),
((SELECT id FROM categories WHERE slug = 'kasa'), 'cpu_cooler_height',   'Maks. CPU Soğutucu Yüksekliği', 'number', 'mm', NULL, 40),
((SELECT id FROM categories WHERE slug = 'kasa'), 'psu_type',            'PSU Tipi',          'select', NULL, ARRAY['ATX','SFX'], 50),
((SELECT id FROM categories WHERE slug = 'kasa'), 'fan_support',         'Fan Desteği',      'text', NULL, NULL, 60),
((SELECT id FROM categories WHERE slug = 'kasa'), 'radiator_support',    'Radyatör Desteği', 'text', NULL, NULL, 70),
((SELECT id FROM categories WHERE slug = 'kasa'), 'front_panel',         'Ön Panel',         'select', NULL, ARRAY['Mesh','Kapalı','Temperli Cam'], 80),
((SELECT id FROM categories WHERE slug = 'kasa'), 'side_panel',          'Yan Panel',        'select', NULL, ARRAY['Temperli Cam','Çelik'], 90);

INSERT INTO product_tag_templates (category_id, tag, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'kasa'), 'Mesh Ön Panel',   10),
((SELECT id FROM categories WHERE slug = 'kasa'), 'Temperli Cam',    20),
((SELECT id FROM categories WHERE slug = 'kasa'), 'ARGB',            30),
((SELECT id FROM categories WHERE slug = 'kasa'), 'Beyaz',           40),
((SELECT id FROM categories WHERE slug = 'kasa'), 'Siyah',           50),
((SELECT id FROM categories WHERE slug = 'kasa'), 'Kompakt',         60);

-- ==========================
-- SOĞUTMA SİSTEMLERİ
-- ==========================
INSERT INTO product_spec_templates (category_id, key, label, input_type, unit, options, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'sogutma'), 'cooler_type',   'Soğutma Tipi',   'select', NULL, ARRAY['Sıvı Soğutma','Kule Tipi Hava'], 10),
((SELECT id FROM categories WHERE slug = 'sogutma'), 'radiator_size', 'Radyatör Boyutu','select', NULL, ARRAY['120mm','240mm','280mm','360mm'], 20),
((SELECT id FROM categories WHERE slug = 'sogutma'), 'fan_count',     'Fan Sayısı',     'number', NULL, NULL, 30),
((SELECT id FROM categories WHERE slug = 'sogutma'), 'socket_support','Soket Desteği',  'text',   NULL, NULL, 40),
((SELECT id FROM categories WHERE slug = 'sogutma'), 'tdp',           'TDP Kapasitesi', 'number', 'W',  NULL, 50),
((SELECT id FROM categories WHERE slug = 'sogutma'), 'noise_level',   'Gürültü Seviyesi','number','dBA',NULL, 60),
((SELECT id FROM categories WHERE slug = 'sogutma'), 'rgb',           'RGB Aydınlatma', 'boolean',NULL, NULL, 70);

INSERT INTO product_tag_templates (category_id, tag, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'sogutma'), 'ARGB',      10),
((SELECT id FROM categories WHERE slug = 'sogutma'), 'Sessiz',    20),
((SELECT id FROM categories WHERE slug = 'sogutma'), 'Beyaz',     30),
((SELECT id FROM categories WHERE slug = 'sogutma'), 'Siyah',     40),
((SELECT id FROM categories WHERE slug = 'sogutma'), 'Yüksek TDP',50);

-- ==========================
-- POWER SUPPLY (PSU)
-- ==========================
INSERT INTO product_spec_templates (category_id, key, label, input_type, unit, options, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'power-supply'), 'wattage',     'Güç',          'number','W', NULL, 10),
((SELECT id FROM categories WHERE slug = 'power-supply'), 'efficiency',  'Verimlilik',   'select',NULL, ARRAY['80+ Bronze','80+ Silver','80+ Gold','80+ Platinum'], 20),
((SELECT id FROM categories WHERE slug = 'power-supply'), 'modular',     'Kablolama',    'select',NULL, ARRAY['Full Modüler','Yarı Modüler','Sabit'], 30),
((SELECT id FROM categories WHERE slug = 'power-supply'), 'fan_size',    'Fan Boyutu',   'number','mm', NULL, 40),
((SELECT id FROM categories WHERE slug = 'power-supply'), 'form_factor', 'Form Faktör',  'select',NULL, ARRAY['ATX','SFX'], 50),
((SELECT id FROM categories WHERE slug = 'power-supply'), 'silent',      'Sessiz Çalışma','boolean',NULL,NULL,60);

INSERT INTO product_tag_templates (category_id, tag, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'power-supply'), '80+ Bronze', 10),
((SELECT id FROM categories WHERE slug = 'power-supply'), '80+ Gold',   20),
((SELECT id FROM categories WHERE slug = 'power-supply'), 'Full Modüler',30),
((SELECT id FROM categories WHERE slug = 'power-supply'), 'Sessiz',     40);

-- ==========================
-- MOUSE
-- ==========================
INSERT INTO product_spec_templates (category_id, key, label, input_type, unit, options, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'mouse'), 'sensor',      'Sensör Tipi',   'text',   NULL, NULL, 10),
((SELECT id FROM categories WHERE slug = 'mouse'), 'dpi',         'DPI',           'number', NULL, NULL, 20),
((SELECT id FROM categories WHERE slug = 'mouse'), 'connection',  'Bağlantı',      'select', NULL, ARRAY['Kablolu','Kablosuz','Bluetooth'], 30),
((SELECT id FROM categories WHERE slug = 'mouse'), 'weight',      'Ağırlık',       'number', 'g',  NULL, 40),
((SELECT id FROM categories WHERE slug = 'mouse'), 'rgb',         'RGB Aydınlatma','boolean',NULL, NULL, 50),
((SELECT id FROM categories WHERE slug = 'mouse'), 'hand',        'Kullanım Eli',  'select', NULL, ARRAY['Sağ','Sol','Her İki El'], 60);

INSERT INTO product_tag_templates (category_id, tag, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'mouse'), 'Gaming',     10),
((SELECT id FROM categories WHERE slug = 'mouse'), 'Ofis',       20),
((SELECT id FROM categories WHERE slug = 'mouse'), 'Kablosuz',   30),
((SELECT id FROM categories WHERE slug = 'mouse'), 'RGB',        40),
((SELECT id FROM categories WHERE slug = 'mouse'), 'Hafif',      50);

-- ==========================
-- KLAVYE
-- ==========================
INSERT INTO product_spec_templates (category_id, key, label, input_type, unit, options, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'klavye'), 'layout',      'Dizilim',      'select', NULL, ARRAY['Q Türkçe','Q İngilizce','F Türkçe'], 10),
((SELECT id FROM categories WHERE slug = 'klavye'), 'switch_type', 'Switch Tipi',  'text',   NULL, NULL, 20),
((SELECT id FROM categories WHERE slug = 'klavye'), 'size',        'Boyut',        'select', NULL, ARRAY['Full Size','TKL','60%'], 30),
((SELECT id FROM categories WHERE slug = 'klavye'), 'connection',  'Bağlantı',     'select', NULL, ARRAY['Kablolu','Kablosuz','Bluetooth'], 40),
((SELECT id FROM categories WHERE slug = 'klavye'), 'backlight',   'Aydınlatma',   'select', NULL, ARRAY['Yok','Tek Renk','RGB'], 50),
((SELECT id FROM categories WHERE slug = 'klavye'), 'wrist_rest',  'Bilek Desteği','boolean',NULL, NULL, 60);

INSERT INTO product_tag_templates (category_id, tag, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'klavye'), 'Mechanical', 10),
((SELECT id FROM categories WHERE slug = 'klavye'), 'Membrane',   20),
((SELECT id FROM categories WHERE slug = 'klavye'), 'RGB',        30),
((SELECT id FROM categories WHERE slug = 'klavye'), 'Kablosuz',   40),
((SELECT id FROM categories WHERE slug = 'klavye'), 'Gaming',     50);

-- ==========================
-- TERMAL MACUN
-- ==========================
INSERT INTO product_spec_templates (category_id, key, label, input_type, unit, options, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'termal-macun'), 'thermal_cond', 'Isı İletkenliği', 'number','W/mK', NULL, 10),
((SELECT id FROM categories WHERE slug = 'termal-macun'), 'quantity',     'Miktar',          'number','g',    NULL, 20),
((SELECT id FROM categories WHERE slug = 'termal-macun'), 'temp_range',   'Sıcaklık Aralığı','text',  NULL, NULL, 30),
((SELECT id FROM categories WHERE slug = 'termal-macun'), 'electrical',   'Elektriksel İletkenlik','select',NULL,ARRAY['İletken Değil','İletken'],40);

INSERT INTO product_tag_templates (category_id, tag, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'termal-macun'), 'Yüksek Performans', 10),
((SELECT id FROM categories WHERE slug = 'termal-macun'), 'Uzun Ömürlü',       20),
((SELECT id FROM categories WHERE slug = 'termal-macun'), 'Kolay Uygulama',    30);

-- ==========================
-- TERMAL PAD
-- ==========================
INSERT INTO product_spec_templates (category_id, key, label, input_type, unit, options, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'termal-pad'), 'thermal_cond', 'Isı İletkenliği', 'number','W/mK', NULL, 10),
((SELECT id FROM categories WHERE slug = 'termal-pad'), 'thickness',    'Kalınlık',        'number','mm',  NULL, 20),
((SELECT id FROM categories WHERE slug = 'termal-pad'), 'size',         'Boyut',           'text',  NULL, NULL, 30),
((SELECT id FROM categories WHERE slug = 'termal-pad'), 'temp_range',   'Sıcaklık Aralığı','text',  NULL, NULL, 40);

INSERT INTO product_tag_templates (category_id, tag, sort_order)
VALUES
((SELECT id FROM categories WHERE slug = 'termal-pad'), 'Yüksek Performans', 10),
((SELECT id FROM categories WHERE slug = 'termal-pad'), 'Kolay Kesilebilir', 20);
