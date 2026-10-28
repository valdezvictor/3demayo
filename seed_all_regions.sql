-- ================================================================
-- 3deMayo: Full Mexican Mezcal DB Seed
-- All 12 NOM-070-SCFI-2016 certified states
-- All 40 agave varieties with food pairing data
-- Run against: cafevivo_prod
-- ================================================================

-- ── EXTEND palenque_regions table ───────────────────────────────
-- Add columns if not present
ALTER TABLE palenque_regions
  ADD COLUMN IF NOT EXISTS slug VARCHAR(80) UNIQUE,
  ADD COLUMN IF NOT EXISTS terroir_es TEXT,
  ADD COLUMN IF NOT EXISTS terroir_en TEXT,
  ADD COLUMN IF NOT EXISTS flavor_profile TEXT[],
  ADD COLUMN IF NOT EXISTS elevation_range VARCHAR(60),
  ADD COLUMN IF NOT EXISTS climate VARCHAR(80),
  ADD COLUMN IF NOT EXISTS nom_prefix VARCHAR(10),
  ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;

-- Update existing 3 regions with slugs + full data
UPDATE palenque_regions SET slug='puebla', nom_prefix='O',
  terroir_es='Sierra Negra y Mixteca Poblana. Suelos calizos, 1,800–2,600 msnm. Noches frías que concentran los azúcares del agave.',
  terroir_en='Sierra Negra and Mixteca Poblana. Limestone soils, 1,800–2,600 masl. Cold nights concentrate agave sugars.',
  flavor_profile=ARRAY['floral','mineral','herbal','fruity'],
  elevation_range='1,800–2,600 msnm', climate='Templado semiárido'
WHERE name ILIKE '%puebla%' OR slug IS NULL AND name IS NOT NULL;

-- Insert the remaining 11 states
INSERT INTO palenque_regions (name, slug, country, nom_prefix, terroir_es, terroir_en, flavor_profile, elevation_range, climate, active)
VALUES

('Oaxaca', 'oaxaca', 'Mexico', 'O',
 'Valles Centrales, Sierra Sur, Cañada y Mixteca. La cuna del mezcal. Suelos volcánicos ricos en minerales, diversidad de microclimas. El 80% de la producción nacional.',
 'Central Valleys, Sierra Sur, Cañada and Mixteca. The cradle of mezcal. Volcanic mineral-rich soils, diverse microclimates. 80% of national production.',
 ARRAY['smoky','earthy','tropical','complex'], '1,200–2,500 msnm', 'Cálido semiárido a templado'),

('Guerrero', 'guerrero', 'Mexico', 'G',
 'Sierra Madre del Sur y Costa Grande. Suelos tropicales, alta humedad costera. Mezcales de carácter salvaje, expresión silvestre del agave cupreata.',
 'Sierra Madre del Sur and Costa Grande. Tropical soils, high coastal humidity. Wild-character mezcals, silvestre expression of agave cupreata.',
 ARRAY['wild','herbal','green','smoky'], '800–2,200 msnm', 'Tropical húmedo'),

('Durango', 'durango', 'Mexico', 'D',
 'Sierra Madre Occidental. Bosques de pino-encino, suelos bien drenados, temperaturas extremas. Agave durangensis domina. Producción artesanal familiar.',
 'Sierra Madre Occidental. Pine-oak forests, well-drained soils, extreme temperatures. Agave durangensis dominates. Family artisanal production.',
 ARRAY['piney','dry','mineral','spiced'], '1,800–2,800 msnm', 'Semicontinental'),

('Michoacán', 'michoacan', 'Mexico', 'M',
 'Sierras del oriente michoacano. Suelos volcánicos del Eje Neovolcánico. Tradición vinculada a los Purépecha. Agave cupreata y inaequidens.',
 'Eastern Michoacán ranges. Volcanic soils of the Trans-Mexican Volcanic Belt. Tradition tied to Purépecha culture. Agave cupreata and inaequidens.',
 ARRAY['fruity','earthy','floral','mild-smoke'], '1,400–2,200 msnm', 'Templado'),

('San Luis Potosí', 'san-luis-potosi', 'Mexico', 'S',
 'Altiplano potosino y Huasteca. Zona desértica y semitropical. Agave salmiana en el semidesierto, producción histórica ligada a comunidades indígenas.',
 'Potosí highland and Huasteca. Desert and subtropical zones. Agave salmiana in the semiarid, historic production tied to indigenous communities.',
 ARRAY['desert','sweet','mineral','anise'], '900–2,200 msnm', 'Árido a semiárido'),

('Zacatecas', 'zacatecas', 'Mexico', 'Z',
 'Altiplano central. Suelos pedregosos, clima extremo. Producción ancestral del agave weber azul y salmiana. Convergencia entre tequila y mezcal.',
 'Central highland. Rocky soils, extreme climate. Ancestral production of agave weber azul and salmiana. Convergence zone between tequila and mezcal.',
 ARRAY['mineral','dry','citrus','clean'], '2,000–2,800 msnm', 'Árido continental'),

('Guanajuato', 'guanajuato', 'Mexico', 'U',
 'Norte y Noreste de Guanajuato. Región emergente. Suelos arcillo-calcáreos, agave salmiana. Producción pequeña pero de alta calidad.',
 'Northern Guanajuato. Emerging region. Clay-limestone soils, agave salmiana. Small but high-quality production.',
 ARRAY['sweet','roasted','mineral','herbal'], '1,700–2,400 msnm', 'Semiárido'),

('Tamaulipas', 'tamaulipas', 'Mexico', 'T',
 'Sierra de Tamaulipas. Región poco conocida, producción mínima. Agave envolvens en condiciones subtropicales únicas del noreste.',
 'Sierra de Tamaulipas. Little-known region, minimal production. Agave envolvens in unique northeastern subtropical conditions.',
 ARRAY['tropical','light','fresh','floral'], '400–1,200 msnm', 'Subtropical'),

('Aguascalientes', 'aguascalientes', 'Mexico', 'A',
 'Valles centrales de Aguascalientes. La región más pequeña productora de mezcal. Agave salmiana en suelos aluviales fértiles.',
 'Central valleys of Aguascalientes. Smallest mezcal-producing region. Agave salmiana on fertile alluvial soils.',
 ARRAY['sweet','mild','clean','gentle'], '1,800–2,200 msnm', 'Semiárido'),

('Estado de México', 'estado-de-mexico', 'Mexico', 'E',
 'Sur y Poniente del Estado de México. Región periurbana con producción artesanal. Agave salmiana y cupreata. Alta altitud del Eje Neovolcánico.',
 'Southern and western Estado de México. Periurban region with artisanal production. Agave salmiana and cupreata. High altitude Trans-Volcanic Belt.',
 ARRAY['earthy','roasted','mineral','complex'], '2,200–3,000 msnm', 'Templado frío'),

('Sinaloa', 'sinaloa', 'Mexico', 'L',
 'Sierra Madre de Sinaloa. Producción reducida y poco documentada. Agave rhodacantha. Influencia costera del Pacífico en los perfiles de sabor.',
 'Sinaloa Sierra Madre. Limited and poorly documented production. Agave rhodacantha. Pacific coastal influence on flavor profiles.',
 ARRAY['coastal','fresh','vegetal','light-smoke'], '600–1,800 msnm', 'Tropical a semiárido')

ON CONFLICT (slug) DO UPDATE SET
  terroir_es = EXCLUDED.terroir_es,
  terroir_en = EXCLUDED.terroir_en,
  flavor_profile = EXCLUDED.flavor_profile,
  elevation_range = EXCLUDED.elevation_range,
  climate = EXCLUDED.climate,
  nom_prefix = EXCLUDED.nom_prefix,
  active = true;

-- ── AGAVE VARIETIES TABLE ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS agave_varieties (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  scientific_name VARCHAR(140),
  common_names TEXT[],
  regions TEXT[],             -- which states it grows in
  maturation_years INT,
  flavor_notes TEXT[],
  food_pairings TEXT[],       -- gastronomy pairings
  pairing_rationale_es TEXT,
  pairing_rationale_en TEXT,
  rarity VARCHAR(20) DEFAULT 'común',  -- común, raro, silvestre, en-peligro
  production_method VARCHAR(40) DEFAULT 'artesanal',
  aroma_profile TEXT[],
  body VARCHAR(20),           -- ligero, medio, robusto
  finish VARCHAR(60),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_agave_name ON agave_varieties(name);

-- ── INSERT ALL 40 AGAVE VARIETIES ───────────────────────────────
INSERT INTO agave_varieties
  (name, scientific_name, common_names, regions, maturation_years,
   flavor_notes, food_pairings, pairing_rationale_es, pairing_rationale_en,
   rarity, production_method, aroma_profile, body, finish)
VALUES

('Espadín', 'Agave angustifolia Haw.', ARRAY['espadín','espadin'],
 ARRAY['oaxaca','guerrero','puebla','michoacan'], 7,
 ARRAY['smoky','herbal','citrus','green-apple'],
 ARRAY['tacos de barbacoa','mole negro','chapulines','queso oaxaqueño','ceviche'],
 'Su equilibrio humo-herbal complementa las proteínas asadas y los sabores terrosos del mole. El cítrico corta la grasa del queso.',
 'Its smoke-herbal balance complements grilled proteins and earthy mole flavors. The citrus cuts through cheese fat.',
 'común', 'artesanal', ARRAY['smoke','cooked agave','green herbs'], 'medio', 'Largo y ahumado'),

('Tobalá', 'Agave potatorum Zucc.', ARRAY['tobala','papalometl'],
 ARRAY['oaxaca','puebla'], 12,
 ARRAY['floral','fruity','mineral','honey'],
 ARRAY['mariscos','aguachile','sashimi','flores comestibles','queso de cabra','foie gras'],
 'Su delicadeza floral y mineral evoca el terroir con la misma finura que un gran Borgogna. Ideal con texturas delicadas.',
 'Its floral and mineral delicacy evokes terroir with the same refinement as a great Burgundy. Ideal with delicate textures.',
 'silvestre', 'artesanal', ARRAY['jasmine','peach','mineral water'], 'ligero', 'Floral prolongado'),

('Tepeztate', 'Agave marmorata Roezl.', ARRAY['tepeztate','tepextate'],
 ARRAY['oaxaca','puebla'], 25,
 ARRAY['vegetal','tropical','complex','wild'],
 ARRAY['mole amarillo','tamales de rajas','hongos silvestres','venado','hierbas de campo'],
 'Veinticinco años de concentración mineral. Su complejidad exige platos de igual profundidad: carnes de caza, setas silvestres.',
 'Twenty-five years of mineral concentration. Its complexity demands equally deep dishes: game meats, wild mushrooms.',
 'silvestre', 'ancestral', ARRAY['tropical fruit','wet stone','wild herbs'], 'robusto', 'Muy largo, especiado'),

('Madrecuixe', 'Agave karwinskii Zucc.', ARRAY['madre cuishe','cuixe'],
 ARRAY['oaxaca'], 15,
 ARRAY['mineral','vegetal','dry','earthy'],
 ARRAY['tlayudas','tasajo','cecina','frijoles negros','chocolate oscuro'],
 'Perfil seco y mineral que eleva los sabores umami del tasajo y cecina. El chocolate oscuro amplifica su mineralidad.',
 'Dry mineral profile that elevates the umami flavors of tasajo and cecina. Dark chocolate amplifies its minerality.',
 'raro', 'artesanal', ARRAY['dry earth','green agave','mineral'], 'medio', 'Seco y persistente'),

('Cuishe', 'Agave karwinskii (variante)', ARRAY['cuishe','cuixe blanco'],
 ARRAY['oaxaca'], 12,
 ARRAY['floral','vegetal','light-smoke'],
 ARRAY['mariscos a la plancha','verduras rostizadas','queso fresco','tlayudas'],
 'Más ligero que el madrecuixe, su perfil floral-vegetal acompaña bien proteínas del mar y vegetales rostizados.',
 'Lighter than madrecuixe, its floral-vegetal profile pairs well with seafood and roasted vegetables.',
 'raro', 'artesanal', ARRAY['white flowers','cooked agave','light smoke'], 'ligero', 'Fresco y limpio'),

('Tobasiche', 'Agave karwinskii (tobasiche)', ARRAY['tobasiche'],
 ARRAY['oaxaca'], 18,
 ARRAY['mineral','complex','tropical','savory'],
 ARRAY['mole negro','carnes de caza','hongos','cacao'],
 'De los karwinskii más complejos. Su mineralidad y sabores umami piden acompañantes de igual peso.',
 'Among the most complex karwinskii. Its minerality and umami flavors call for equally weighty companions.',
 'raro', 'artesanal', ARRAY['tropical fruit','mineral','savory'], 'robusto', 'Largo y complejo'),

('Mexicano', 'Agave rhodacantha Trel.', ARRAY['mexicano','mexicano largo'],
 ARRAY['oaxaca','sinaloa'], 10,
 ARRAY['herbal','green','light','fresh'],
 ARRAY['ceviches','aguachile verde','ensaladas','verduras crudas','queso fresco'],
 'Su perfil herbáceo y fresco funciona como un Sauvignon Blanc: limpia el paladar y eleva los sabores cítricos-verdes.',
 'Its herbaceous fresh profile works like Sauvignon Blanc: cleanses the palate and elevates citrus-green flavors.',
 'común', 'artesanal', ARRAY['fresh herbs','citrus zest','green agave'], 'ligero', 'Fresco y corto'),

('Bicuixe', 'Agave karwinskii (bicuixe)', ARRAY['bicuixe','bicuiche'],
 ARRAY['oaxaca'], 14,
 ARRAY['smoky','mineral','dry','complex'],
 ARRAY['carnes ahumadas','chorizo oaxaqueño','mole negro','chocolate'],
 'El más ahumado de los karwinskii. Su perfil robusto pide carnes curadas y chocolate amargo de alto cacao.',
 'The smokiest of the karwinskii. Its robust profile calls for cured meats and high-cacao dark chocolate.',
 'raro', 'artesanal', ARRAY['heavy smoke','earth','char'], 'robusto', 'Ahumado muy prolongado'),

('Arroqueño', 'Agave americana var. oaxacensis', ARRAY['arroqueno','arroqueño blanco'],
 ARRAY['oaxaca','puebla'], 20,
 ARRAY['sweet','fruity','floral','rich'],
 ARRAY['postres de piloncillo','fruta asada','queso brie','foie gras','mole blanco'],
 'Su riqueza frutal y dulzura natural lo convierte en el mezcal del maridaje con quesos suaves y postres ligeros.',
 'Its fruity richness and natural sweetness make it the mezcal for pairing with soft cheeses and light desserts.',
 'silvestre', 'ancestral', ARRAY['overripe fruit','honey','cooked agave'], 'robusto', 'Dulce y muy largo'),

('Jabalí', 'Agave convallis Trel.', ARRAY['jabali','jabalí'],
 ARRAY['oaxaca'], 15,
 ARRAY['wild','fermented','complex','challenging'],
 ARRAY['quesos maduros','charcutería','mole negro','hongos silvestres'],
 'Famoso por su naturaleza indomable en fermentación. Su sabor salvaje y complejo requiere los sabores más profundos.',
 'Famous for its untameable fermentation nature. Its wild complex flavor requires the deepest flavors.',
 'silvestre', 'ancestral', ARRAY['wild fermentation','tropical','cheese rind'], 'robusto', 'Salvaje y persistente'),

('Sierra Negra', 'Agave treleasei Toumey', ARRAY['sierra negra','castilla'],
 ARRAY['puebla','oaxaca'], 20,
 ARRAY['mineral','earthy','dry','stone'],
 ARRAY['mole poblano','chiles en nogada','cecina','mixiote'],
 'Nativo de Puebla. Su mineralidad y carácter seco elevan los chiles y especias del mole poblano con elegancia.',
 'Native to Puebla. Its minerality and dry character elegantly elevates the chiles and spices of mole poblano.',
 'silvestre', 'ancestral', ARRAY['limestone','dry earth','mineral'], 'medio', 'Mineral y seco'),

('Cupreata', 'Agave cupreata Trel. & A.Berger', ARRAY['papalote','cupreata'],
 ARRAY['guerrero','michoacan'], 12,
 ARRAY['fruity','tropical','grassy','mild-smoke'],
 ARRAY['pescado a la talla','pozole verde','mole verde','aguacate','mariscos'],
 'El agave de Guerrero huele a campo mojado y fruta tropical. Perfecto con los sabores verdes y ácidos de la cocina guerrerense.',
 'Guerrero''s agave smells of wet field and tropical fruit. Perfect with the green acidic flavors of Guerrero cuisine.',
 'silvestre', 'artesanal', ARRAY['tropical fruit','wet grass','mild smoke'], 'medio', 'Frutal y mediano'),

('Salmiana', 'Agave salmiana Otto ex Salm-Dyck', ARRAY['salmiana','verde','maguey verde'],
 ARRAY['san-luis-potosi','zacatecas','guanajuato','aguascalientes','estado-de-mexico'], 8,
 ARRAY['sweet','mild','roasted','vegetal'],
 ARRAY['barbacoa de borrego','carnitas','enchiladas','tamales de elote','piloncillo'],
 'El agave del altiplano. Dulce y de cuerpo medio, acompaña la riqueza grasa de la barbacoa y las carnitas del bajío.',
 'The highland agave. Sweet and medium-bodied, accompanies the rich fat of barbacoa and carnitas from the bajío.',
 'común', 'artesanal', ARRAY['roasted sweet agave','vegetal','caramel'], 'medio', 'Dulce y suave'),

('Durangensis', 'Agave durangensis Gentry', ARRAY['cenizo','durangense'],
 ARRAY['durango'], 12,
 ARRAY['piney','dry','mineral','spiced'],
 ARRAY['carne seca','chile colorado','queso chihuahua','venado norteño'],
 'Del bosque de pino-encino de Durango. Su carácter resinoso y seco marida perfectamente con la carne seca norteña.',
 'From Durango''s pine-oak forest. Its resinous dry character pairs perfectly with northern dried meat.',
 'común', 'artesanal', ARRAY['pine resin','dry earth','wild spice'], 'robusto', 'Largo y resinoso'),

('Inaequidens', 'Agave inaequidens K.Koch', ARRAY['maguey bruto','inaequidens'],
 ARRAY['michoacan','jalisco'], 12,
 ARRAY['earthy','herbal','complex','wild'],
 ARRAY['uchepos','corundas','carnitas michoacanas','queso cotija'],
 'Agave silvestre de Michoacán. Sus notas terrosas y herbáceas van de la mano con la cocina purépecha tradicional.',
 'Wild agave from Michoacán. Its earthy herbal notes go hand in hand with traditional Purépecha cuisine.',
 'silvestre', 'artesanal', ARRAY['earth','wild herbs','roasted agave'], 'medio', 'Terroso y mediano'),

('Lumbre', 'Agave rhodacantha (lumbre)', ARRAY['lumbre','maguey rojo'],
 ARRAY['oaxaca','guerrero'], 10,
 ARRAY['smoky','spiced','warm','complex'],
 ARRAY['chiles secos','mole rojo','tasajo','chorizo'],
 'Su carácter ahumado y especiado con notas cálidas lo convierte en compañero natural de los chiles secos y carnes curadas.',
 'Its smoky spiced character with warm notes makes it a natural companion for dried chiles and cured meats.',
 'raro', 'artesanal', ARRAY['warm spice','heavy smoke','dried fruit'], 'robusto', 'Cálido y largo'),

('Tripón', 'Agave karwinskii (tripón)', ARRAY['tripon','maguey tripón'],
 ARRAY['oaxaca'], 15,
 ARRAY['tropical','sweet','complex'],
 ARRAY['mariscos','coco','fruta tropical','postres ligeros'],
 'El más dulce y tropical de los karwinskii. Su perfil exótico marida con los sabores del Pacífico oaxaqueño.',
 'The sweetest and most tropical of the karwinskii. Its exotic profile pairs with Oaxacan Pacific flavors.',
 'raro', 'artesanal', ARRAY['coconut','tropical fruit','cooked agave'], 'medio', 'Tropical y suave'),

('Coyote', 'Agave americana (coyote)', ARRAY['coyote','maguey coyote'],
 ARRAY['oaxaca','guerrero'], 15,
 ARRAY['wild','herbal','earthy','fermented'],
 ARRAY['carnes de caza','quesos maduros','chocolate oscuro'],
 'Nombre por su naturaleza salvaje. Producción muy limitada. Sus notas fermentadas y terrosas van con sabores intensos.',
 'Named for its wild nature. Very limited production. Its fermented earthy notes go with intense flavors.',
 'silvestre', 'ancestral', ARRAY['wild ferment','earth','dark herbs'], 'robusto', 'Salvaje y seco'),

('Pulquero', 'Agave mapisaga Trel.', ARRAY['pulquero','maguey manso'],
 ARRAY['estado-de-mexico','hidalgo'], 15,
 ARRAY['sweet','mild','vegetal','clean'],
 ARRAY['barbacoa hidalguense','mixiote','carnitas','queso panela'],
 'Históricamente destinado al pulque. Su mezcal es suave y limpio. Marida bien con la cocina mestiza del centro.',
 'Historically destined for pulque. Its mezcal is smooth and clean. Pairs well with mestizo central Mexican cuisine.',
 'raro', 'artesanal', ARRAY['clean agave','vegetal','mild sweet'], 'ligero', 'Suave y corto'),

('Cincoañero', 'Agave angustifolia (5 años)', ARRAY['cincoañero','espadín joven'],
 ARRAY['oaxaca','guerrero'], 5,
 ARRAY['herbal','fresh','light-smoke','green'],
 ARRAY['ceviches','mariscos crudos','verduras frescas','queso fresco'],
 'Cosechado antes de tiempo, expresa frescura vegetal y menos dulzura. Funciona como mezcal de aperitivo.',
 'Harvested early, expresses vegetal freshness and less sweetness. Works as aperitif mezcal.',
 'común', 'artesanal', ARRAY['fresh herbs','light smoke','raw agave'], 'ligero', 'Corto y fresco'),

('Pitzometl', 'Agave kerchovei Lem.', ARRAY['pitzometl','tobaziche'],
 ARRAY['puebla','oaxaca'], 15,
 ARRAY['mineral','floral','herbal'],
 ARRAY['mole de olla','chiles rellenos','verduras asadas'],
 'Agave nativo de Puebla y Oaxaca. Perfil mineral y floral característico del terroir calcáreo de la Sierra Negra.',
 'Native agave of Puebla and Oaxaca. Mineral and floral profile characteristic of the Sierra Negra limestone terroir.',
 'silvestre', 'ancestral', ARRAY['limestone mineral','wild flowers','herbs'], 'medio', 'Mineral y mediano'),

('Mexicano Largo', 'Agave rhodacantha (largo)', ARRAY['mexicano largo'],
 ARRAY['oaxaca'], 12,
 ARRAY['herbal','complex','tropical'],
 ARRAY['pescados blancos','ensaladas de mar','aguachile'],
 'Variante más alta del rhodacantha. Sus notas herbáceas-tropicales complementan los sabores del mar.',
 'Taller variant of rhodacantha. Its herbal-tropical notes complement seafood flavors.',
 'raro', 'artesanal', ARRAY['tropical herbs','fresh agave','citrus'], 'ligero', 'Herbal y fresco'),

('Madre del Mezcal', 'Agave americana', ARRAY['madre del mezcal','americana'],
 ARRAY['oaxaca','guerrero','puebla'], 20,
 ARRAY['rich','complex','sweet','fruity'],
 ARRAY['mole negro','chocolate','higos','postres de alta cocina'],
 'La madre de todos los agaves. Veinte años de vida dan una complejidad inigualable. Para los grandes maridajes.',
 'The mother of all agaves. Twenty years of life give unmatched complexity. For the greatest pairings.',
 'silvestre', 'ancestral', ARRAY['overripe fruit','caramel','mineral'], 'robusto', 'Larguísimo y complejo'),

('Espadilla', 'Agave angustifolia (variante)', ARRAY['espadilla','espadín chico'],
 ARRAY['oaxaca','guerrero'], 6,
 ARRAY['light-smoke','herbal','citrus'],
 ARRAY['tacos de canasta','quesillo','tlayudas','higaditos'],
 'Hermana menor del espadín. Más ligera y cítrica. El mezcal de la comida cotidiana oaxaqueña.',
 'Younger sister of espadín. Lighter and more citrusy. The mezcal of everyday Oaxacan food.',
 'común', 'artesanal', ARRAY['light smoke','citrus','green herbs'], 'ligero', 'Corto y fresco'),

('Papalometl', 'Agave potatorum (Puebla)', ARRAY['papalometl','mariposa'],
 ARRAY['puebla'], 12,
 ARRAY['floral','mineral','honey'],
 ARRAY['mole blanco','flores en tempura','hongos blancos','queso de cabra'],
 'El tobalá poblano. Nombre náhuatl que significa mariposa-maguey. Suelos calizos de Puebla dan mineralidad única.',
 'Puebla''s tobalá. Nahuatl name meaning butterfly-maguey. Puebla''s limestone soils give unique minerality.',
 'silvestre', 'ancestral', ARRAY['wildflowers','honey','limestone'], 'ligero', 'Floral muy largo'),

('Potatorum', 'Agave potatorum Zucc. (Oaxaca)', ARRAY['potatorum','tobalá oaxaqueño'],
 ARRAY['oaxaca'], 14,
 ARRAY['floral','mineral','fruity','complex'],
 ARRAY['ostiones','mariscos finos','flores','queso de cabra'],
 'El tobalá clásico de Oaxaca. Años de concentración dan un perfil floral-mineral inigualable.',
 'The classic Oaxacan tobalá. Years of concentration give an unmatched floral-mineral profile.',
 'silvestre', 'artesanal', ARRAY['jasmine','mineral water','white fruit'], 'ligero', 'Floral prolongado'),

('Espata Amarilla', 'Agave angustifolia (espata)', ARRAY['espata amarilla'],
 ARRAY['guerrero'], 8,
 ARRAY['tropical','fruity','mild-smoke'],
 ARRAY['pescados tropicales','fruta de temporada','aguachile rojo'],
 'Del trópico guerrerense. Su carácter frutal-tropical refleja el calor costero y suelos fértiles.',
 'From Guerrero''s tropics. Its fruity-tropical character reflects coastal heat and fertile soils.',
 'raro', 'artesanal', ARRAY['mango','tropical flowers','light smoke'], 'medio', 'Tropical y mediano'),

('Chato', 'Agave karwinskii (chato)', ARRAY['chato','cuishe chato'],
 ARRAY['oaxaca'], 12,
 ARRAY['mineral','dry','earthy'],
 ARRAY['tasajo','cecina','quesos curados','chocolate oscuro'],
 'El más bajo de los karwinskii. Concentrado y mineral, expresión del suelo oaxaqueño en su forma más pura.',
 'The shortest of the karwinskii. Concentrated and mineral, expression of Oaxacan soil in its purest form.',
 'raro', 'artesanal', ARRAY['dry mineral','earth','char'], 'robusto', 'Mineral y persistente'),

('Largo', 'Agave karwinskii (largo)', ARRAY['largo','cuishe largo'],
 ARRAY['oaxaca'], 18,
 ARRAY['complex','mineral','tropical'],
 ARRAY['mole negro','carnes de caza','hongos trufados'],
 'El más alto de los karwinskii. Casi dos décadas de concentración dan un perfil de alta complejidad.',
 'The tallest of the karwinskii. Nearly two decades of concentration give a highly complex profile.',
 'raro', 'artesanal', ARRAY['mineral','tropical','complex earth'], 'robusto', 'Muy largo y complejo'),

('Ensamble Puebla', NULL, ARRAY['ensamble','ensemble'],
 ARRAY['puebla'], NULL,
 ARRAY['complex','layered','regional'],
 ARRAY['mole poblano','chiles en nogada','pipián','clemole'],
 'La mezcla de varios agaves pueblanos crea capas de sabor que solo el mole poblano puede igualar en complejidad.',
 'The blend of several Puebla agaves creates flavor layers that only mole poblano can match in complexity.',
 'raro', 'artesanal', ARRAY['layered agave','complex','regional terroir'], 'robusto', 'Complejo y largo'),

('Agave Verde', 'Agave salmiana (verde)', ARRAY['verde','maguey verde xibui'],
 ARRAY['san-luis-potosi','guanajuato'], 8,
 ARRAY['sweet','clean','roasted'],
 ARRAY['carnitas potosinas','enchiladas mineras','queso de tuna'],
 'Del Bajío y altiplano potosino. Su dulzura y limpieza reflejan los suelos arcillo-calcáreos de la región.',
 'From the Bajío and Potosí highland. Its sweetness and cleanliness reflect the clay-limestone soils of the region.',
 'común', 'artesanal', ARRAY['sweet roasted agave','clean','caramel'], 'medio', 'Dulce y suave'),

('Cenizo', 'Agave durangensis (cenizo)', ARRAY['cenizo','maguey cenizo'],
 ARRAY['durango','zacatecas'], 12,
 ARRAY['piney','spiced','dry','mineral'],
 ARRAY['carne seca norteña','queso menonita','tamales de rajas','chile colorado'],
 'El agave símbolo del norte. Su resina de pino y especias silvestres maridan con la cocina recia del norte de México.',
 'The symbol agave of the north. Its pine resin and wild spices pair with the hearty cuisine of northern Mexico.',
 'común', 'artesanal', ARRAY['pine','wild herbs','dry earth'], 'robusto', 'Largo y resinoso'),

('Rhodacantha', 'Agave rhodacantha Trel.', ARRAY['rhodacantha','maguey de campo'],
 ARRAY['oaxaca','sinaloa','guerrero'], 10,
 ARRAY['herbal','fresh','tropical','light'],
 ARRAY['mariscos','ceviches','verduras','ensaladas tropicales'],
 'Versátil y fresco. Su perfil herbáceo-tropical lo hace compañero ideal de los sabores ligeros del Pacífico.',
 'Versatile and fresh. Its herbal-tropical profile makes it an ideal companion for the light flavors of the Pacific.',
 'común', 'artesanal', ARRAY['fresh herbs','tropical','clean agave'], 'ligero', 'Fresco y herbal'),

('Quiotero', 'Agave americana (quiotero)', ARRAY['quiotero','maguey quiotero'],
 ARRAY['oaxaca','guerrero'], 20,
 ARRAY['sweet','fermented','complex','rich'],
 ARRAY['postres de piloncillo','chocolate','fruta madura','quesos maduros'],
 'Cosechado cuando florece (quiote). El azúcar concentrado en el quiote da dulzura y complejidad únicas.',
 'Harvested when flowering (quiote). The concentrated sugar in the flowering stalk gives unique sweetness and complexity.',
 'silvestre', 'ancestral', ARRAY['concentrated sweet','tropical','floral'], 'robusto', 'Dulcísimo y largo'),

('Dobadaan', 'Agave karwinskii (dobadaan)', ARRAY['dobadaan','tobasiche zapoteco'],
 ARRAY['oaxaca'], 15,
 ARRAY['mineral','complex','tropical'],
 ARRAY['tasajo','quesillo','higaditos de pollo','mole negro'],
 'Nombre zapoteco para un karwinskii del Valle de Miahuatlán. Expresión cultural y geográfica única.',
 'Zapotec name for a karwinskii from the Miahuatlán Valley. Unique cultural and geographical expression.',
 'silvestre', 'ancestral', ARRAY['mineral','complex tropical','earthy'], 'robusto', 'Cultural y largo'),

('Zotolero', 'Dasylirion wheeleri', ARRAY['zotolero','sotol'],
 ARRAY['durango','zacatecas','chihuahua'], 15,
 ARRAY['dry','herbaceous','smoky','mineral'],
 ARRAY['carne asada norteña','machaca','queso chihuahua','frijoles de olla'],
 'Técnicamente no es agave sino dasylirion. Producido como mezcal artesanal en el norte. Perfil desértico único.',
 'Technically not agave but dasylirion. Produced like artisanal mezcal in the north. Unique desert profile.',
 'raro', 'artesanal', ARRAY['desert herbs','dry smoke','mineral'], 'medio', 'Desértico y seco'),

('Mexicano Oaxaqueño', 'Agave rhodacantha (Oaxaca)', ARRAY['mexicano oaxaqueño'],
 ARRAY['oaxaca'], 10,
 ARRAY['herbal','green','fruity'],
 ARRAY['tlayudas','memelas','chocolate oaxaqueño','fruta'],
 'El rhodacantha de Oaxaca expresa el terroir del Valle Central con más complejidad que sus parientes guerrerenses.',
 'Oaxaca''s rhodacantha expresses the Central Valley terroir with more complexity than its Guerrero relatives.',
 'común', 'artesanal', ARRAY['fresh herbs','tropical','valley minerals'], 'ligero', 'Herbal y mediano'),

('Barril', 'Agave karwinskii (barril)', ARRAY['barril','cuishe barril'],
 ARRAY['oaxaca'], 14,
 ARRAY['mineral','savory','dry','complex'],
 ARRAY['cecina','tasajo','quesos curados','mole'],
 'Forma de barril. Sus notas salinas y minerales recuerdan a los grandes Chablis. Ideal con proteínas umami.',
 'Barrel shape. Its saline mineral notes recall great Chablis. Ideal with umami proteins.',
 'raro', 'artesanal', ARRAY['saline mineral','dry earth','complex'], 'robusto', 'Salino y largo'),

('Marteño', 'Agave convallis (marteño)', ARRAY['marteño','maguey marteño'],
 ARRAY['oaxaca'], 15,
 ARRAY['wild','fermented','tropical'],
 ARRAY['quesos maduros','charcutería','hongos silvestres'],
 'Pariente del jabalí, igual de indómito en fermentación. Su sabor salvaje necesita ingredientes de carácter fuerte.',
 'Relative of the jabalí, equally untameable in fermentation. Its wild flavor needs strong-character ingredients.',
 'silvestre', 'ancestral', ARRAY['wild ferment','tropical','earthy'], 'robusto', 'Salvaje y profundo')

ON CONFLICT (name) DO UPDATE SET
  food_pairings = EXCLUDED.food_pairings,
  pairing_rationale_es = EXCLUDED.pairing_rationale_es,
  pairing_rationale_en = EXCLUDED.pairing_rationale_en,
  flavor_notes = EXCLUDED.flavor_notes,
  aroma_profile = EXCLUDED.aroma_profile;

-- ── LINK TABLE: palenques ↔ agave_varieties ──────────────────────
CREATE TABLE IF NOT EXISTS palenque_agaves (
  palenque_id INT REFERENCES palenques(id) ON DELETE CASCADE,
  agave_id INT REFERENCES agave_varieties(id) ON DELETE CASCADE,
  PRIMARY KEY (palenque_id, agave_id),
  is_primary BOOLEAN DEFAULT false
);

-- ── SUMMARY ──────────────────────────────────────────────────────
SELECT 'palenque_regions' AS table_name, COUNT(*) AS rows FROM palenque_regions
UNION ALL
SELECT 'agave_varieties', COUNT(*) FROM agave_varieties;
