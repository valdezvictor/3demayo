-- Add missing columns (safe to re-run)
ALTER TABLE palenque_regions ADD COLUMN IF NOT EXISTS country VARCHAR(60) DEFAULT 'Mexico';
ALTER TABLE palenque_regions ADD COLUMN IF NOT EXISTS nom_prefix VARCHAR(10);
ALTER TABLE palenque_regions ADD COLUMN IF NOT EXISTS terroir_es TEXT;
ALTER TABLE palenque_regions ADD COLUMN IF NOT EXISTS terroir_en TEXT;
ALTER TABLE palenque_regions ADD COLUMN IF NOT EXISTS flavor_profile TEXT[];
ALTER TABLE palenque_regions ADD COLUMN IF NOT EXISTS elevation_range VARCHAR(60);
ALTER TABLE palenque_regions ADD COLUMN IF NOT EXISTS climate VARCHAR(80);
ALTER TABLE palenque_regions ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;

-- state column = same as name, satisfies NOT NULL
INSERT INTO palenque_regions (name, state, slug, country, nom_prefix, terroir_es, terroir_en, flavor_profile, elevation_range, climate, active) VALUES
('Oaxaca','Oaxaca','oaxaca','Mexico','O','Valles Centrales, Sierra Sur. La cuna del mezcal. 80% de la producción nacional.','Central Valleys, Sierra Sur. The cradle of mezcal. 80% of national production.',ARRAY['smoky','earthy','tropical','complex'],'1200-2500 msnm','Cálido semiárido',true),
('Guerrero','Guerrero','guerrero','Mexico','G','Sierra Madre del Sur. Suelos tropicales, agave cupreata silvestre.','Sierra Madre del Sur. Tropical soils, wild agave cupreata.',ARRAY['wild','herbal','smoky'],'800-2200 msnm','Tropical húmedo',true),
('Durango','Durango','durango','Mexico','D','Sierra Madre Occidental. Bosques de pino-encino, agave durangensis.','Sierra Madre Occidental. Pine-oak forests, agave durangensis.',ARRAY['piney','dry','mineral'],'1800-2800 msnm','Semicontinental',true),
('Michoacán','Michoacán','michoacan','Mexico','M','Sierras del oriente. Suelos volcánicos. Tradición purépecha.','Eastern ranges. Volcanic soils. Purépecha tradition.',ARRAY['fruity','earthy','floral'],'1400-2200 msnm','Templado',true),
('San Luis Potosí','San Luis Potosí','san-luis-potosi','Mexico','S','Altiplano potosino. Agave salmiana en el semidesierto.','Potosí highland. Agave salmiana in the semiarid zone.',ARRAY['desert','sweet','mineral'],'900-2200 msnm','Árido a semiárido',true),
('Zacatecas','Zacatecas','zacatecas','Mexico','Z','Altiplano central. Suelos pedregosos, agave salmiana.','Central highland. Rocky soils, agave salmiana.',ARRAY['mineral','dry','citrus'],'2000-2800 msnm','Árido continental',true),
('Guanajuato','Guanajuato','guanajuato','Mexico','U','Norte de Guanajuato. Región emergente de alta calidad.','Northern Guanajuato. Emerging high-quality region.',ARRAY['sweet','roasted','mineral'],'1700-2400 msnm','Semiárido',true),
('Tamaulipas','Tamaulipas','tamaulipas','Mexico','T','Sierra de Tamaulipas. Agave envolvens subtropical.','Sierra de Tamaulipas. Subtropical agave envolvens.',ARRAY['tropical','light','floral'],'400-1200 msnm','Subtropical',true),
('Aguascalientes','Aguascalientes','aguascalientes','Mexico','A','La región mezcalera más pequeña. Agave salmiana.','The smallest mezcal region. Agave salmiana.',ARRAY['sweet','mild','clean'],'1800-2200 msnm','Semiárido',true),
('Estado de México','Estado de México','estado-de-mexico','Mexico','E','Sur del Estado de México. Alta altitud volcánica.','Southern Estado de México. High volcanic altitude.',ARRAY['earthy','roasted','mineral'],'2200-3000 msnm','Templado frío',true),
('Sinaloa','Sinaloa','sinaloa','Mexico','L','Sierra Madre de Sinaloa. Influencia costera del Pacífico.','Sinaloa Sierra Madre. Pacific coastal influence.',ARRAY['coastal','fresh','light-smoke'],'600-1800 msnm','Tropical a semiárido',true)
ON CONFLICT (slug) DO UPDATE SET
  terroir_es = EXCLUDED.terroir_es,
  terroir_en = EXCLUDED.terroir_en,
  flavor_profile = EXCLUDED.flavor_profile,
  country = EXCLUDED.country,
  nom_prefix = EXCLUDED.nom_prefix,
  elevation_range = EXCLUDED.elevation_range,
  climate = EXCLUDED.climate,
  active = true;

SELECT COUNT(*) AS region_count FROM palenque_regions;
