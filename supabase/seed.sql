-- Seed data for Travel Carvers
-- This file is automatically loaded by Supabase on db reset

-- Categories
INSERT INTO categories (name, slug, description, icon_name, display_order) VALUES
  ('Beach', 'beach', 'Tropical beach destinations', 'umbrella-beach', 1),
  ('Mountain', 'mountain', 'Mountain and hill stations', 'mountain', 2),
  ('Adventure', 'adventure', 'Adventure and trekking tours', 'hiking', 3),
  ('Cultural', 'cultural', 'Cultural and heritage tours', 'landmark', 4),
  ('Wildlife', 'wildlife', 'Wildlife safaris and nature tours', 'paw', 5);

-- Subcategories
INSERT INTO subcategories (name, slug, icon_name, display_order) VALUES
  ('Honeymoon', 'honeymoon', 'heart', 1),
  ('Family', 'family', 'users', 2),
  ('Budget', 'budget', 'dollar', 3),
  ('Luxury', 'luxury', 'crown', 4),
  ('Group', 'group', 'user-group', 5);

-- Homepage Sections
INSERT INTO homepage_sections (hero_title, hero_subtitle, hero_cta_text, featured_title, featured_description, trending_title, trending_description) VALUES
  ('Explore the World with Travel Carvers', 'Discover amazing destinations and create unforgettable memories', 'Browse Packages', 'Featured Destinations', 'Hand-picked destinations for an unforgettable experience', 'Trending Now', 'Most popular packages chosen by travelers');

-- Trust Badges
-- Numeric badges (start with a number) render as animated stat cards on the
-- homepage; text-only badges render as pills. Icons use lucide names.
INSERT INTO trust_badges (text, icon, display_order) VALUES
  ('10,000+ Happy Travellers', 'Smile', 1),
  ('50+ Destinations', 'Globe2', 2),
  ('15+ Years Experience', 'Award', 3),
  ('24/7 Support', 'Clock', 4),
  ('World Class', '', 5),
  ('Award Winning', '', 6),
  ('Best Price', '', 7),
  ('Secure Booking', '', 8),
  ('Expert Guides', '', 9);

-- Site Settings
INSERT INTO site_settings (company_name, contact_email, contact_phone, address, show_prices_globally, facebook_url, instagram_url, twitter_url, linkedin_url) VALUES
  ('Travel Carvers', 'info@travelcarvers.com', '+919876543210', '123 Travel Street, Adventure City, India', true, 'https://facebook.com/travelcarvers', 'https://instagram.com/travelcarvers', 'https://twitter.com/travelcarvers', 'https://linkedin.com/company/travelcarvers');

-- Static Pages
INSERT INTO static_pages (page_key, title, content, meta_title, meta_description, is_active) VALUES
  ('about', 'About Us', '<h1>About Travel Carvers</h1><p>We are passionate about creating unforgettable travel experiences...</p>', 'About Us - Travel Carvers', 'Learn more about Travel Carvers and our mission to create amazing travel experiences', true),
  ('contact', 'Contact Us', '<h1>Contact Us</h1><p>Get in touch with our travel experts...</p>', 'Contact Us - Travel Carvers', 'Contact Travel Carvers for inquiries and bookings', true);

-- Destinations

INSERT INTO destinations (name, country, city, slug, latitude, longitude, description, is_featured, is_popular) VALUES
  ('Dubai', 'United Arab Emirates', NULL, 'dubai', 25.19720000, 55.27440000,
   'A dazzling city where futuristic skyscrapers meet golden desert dunes.', true, true),
  ('Bali', 'Indonesia', 'Denpasar', 'bali', -8.50690000, 115.26250000,
   'The Island of the Gods blends emerald rice terraces, surf beaches and clifftop temples.', true, true),
  ('Singapore', 'Singapore', NULL, 'singapore', 1.28380000, 103.86070000,
   'A gleaming city-state of supertree gardens, hawker feasts and island theme parks.', false, true),
  ('Bangkok', 'Thailand', NULL, 'bangkok', 13.75000000, 100.49170000,
   'Thailand''s electric capital layers gilded temples over floating markets and street-food lanes.', false, true),
  ('Paris', 'France', NULL, 'paris', 48.85840000, 2.29450000,
   'The City of Light charms with grand boulevards, world-class art and riverside cafes.', true, false),
  ('Tokyo', 'Japan', NULL, 'tokyo', 35.65860000, 139.74540000,
   'A mesmerising mix of neon-lit districts, serene shrines and cutting-edge culture.', true, false)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================================
-- PACKAGES
-- =====================================================================
INSERT INTO packages (
  id, title, slug, short_description, full_description, status,
  price_adult, price_child, price_infant, show_price,
  duration_days, duration_nights, difficulty_level,
  group_size_min, group_size_max, age_restriction,
  destination_name, main_destination_lat, main_destination_lng,
  is_featured, is_trending, is_new, is_seasonal, is_best_seller, is_group_package,
  meta_title, meta_description, meta_keywords, og_image
) VALUES
(
  '11111111-0000-0000-0000-000000000001',
  'Dubai Glamour & Desert Safari Extravaganza',
  'dubai-glamour-and-desert-safari',
  'Futuristic skylines, golden dunes, luxury cruises and iconic landmarks in 5 thrilling days.',
  'Experience the magic of Dubai where modern architectural wonders meet Arabian heritage. Enjoy breathtaking views from the 124th floor of Burj Khalifa, thrill to 4x4 dune bashing across golden sands with a starlit BBQ dinner, and sail the serene Dubai Marina aboard a luxury dhow.',
  'published',
  64999, 39999, 7999, true,
  5, 4, 'easy',
  2, 16, 'All ages welcome',
  'Dubai, United Arab Emirates', 25.19720000, 55.27440000,
  true, true, false, false, true, false,
  'Dubai Tour Package | Desert Safari & City Tour',
  'Book 5 days Dubai package with Burj Khalifa tickets, desert safari BBQ, luxury marina dhow cruise and 4-star hotel stay.',
  'dubai tour, desert safari, burj khalifa, dubai marina, dubai holiday',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80'
),
(
  '11111111-0000-0000-0000-000000000002',
  'Bali Tropical Paradise & Ubud Heritage Retreat',
  'bali-tropical-paradise-retreat',
  'Emerald rice terraces, clifftop temples, tropical beaches and private pool villa bliss.',
  'Surrender to the mystical allure of the Island of the Gods. Explore the artistic soul of Ubud, swing over lush jungle gorges at Tegalalang, witness sacred sunset kecak dance atop Uluwatu cliffs, and unwind with soothing Balinese massages in private tropical villas.',
  'published',
  49999, 29999, 5999, true,
  6, 5, 'easy',
  2, 12, 'All ages welcome',
  'Bali, Indonesia', -8.50690000, 115.26250000,
  true, true, false, true, false, false,
  'Bali Honeymoon & Tour Package | Ubud & Kuta Beach',
  'Experience 6 days in Bali: Ubud jungle villas, Uluwatu sunset temple, Tegalalang rice terraces and Nusa Penida island excursion.',
  'bali tour, ubud villa, uluwatu temple, bali honeymoon, indonesia holiday',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80'
),
(
  '11111111-0000-0000-0000-000000000003',
  'Singapore City of Tomorrow & Sentosa Island Tour',
  'singapore-futuristic-city-and-sentosa',
  'Supertree groves, Marina Bay wonders, Universal Studios rides and cable car thrills in 5 days.',
  'Immerse yourself in Singapore’s futuristic vision where lush vertical gardens embrace soaring glass architecture. Walk under glowing Avatar-like Supertrees, experience movie thrills at Universal Studios on Sentosa, explore multicultural Chinatown, and shop the famous Orchard Road.',
  'published',
  54999, 34999, 6499, true,
  5, 4, 'easy',
  2, 20, 'All ages welcome',
  'Singapore', 1.28380000, 103.86070000,
  false, true, false, false, false, true,
  'Singapore Tour Package | Universal Studios & Sentosa',
  'Book 5-day Singapore holiday package with Gardens by the Bay, Universal Studios passes, Sentosa cable car and night safari.',
  'singapore package, gardens by the bay, universal studios singapore, sentosa island',
  'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80'
),
(
  '11111111-0000-0000-0000-000000000004',
  'Bangkok Temples & Pattaya Beach Fiesta',
  'bangkok-temples-pattaya-fiesta',
  'Golden temples, floating markets, coral island speedboats and legendary Thai street food.',
  'Discover the electric energy of Thailand. Cruise the Chao Phraya river past glittering gilded temples, taste award-winning pad thai in buzzing night bazaars, speed across azure waters to Coral Island in Pattaya for water sports, and enjoy world-class cabaret performances.',
  'published',
  27999, 16999, 3499, true,
  5, 4, 'easy',
  2, 24, 'All ages welcome',
  'Bangkok, Thailand', 13.75000000, 100.49170000,
  false, false, false, false, true, true,
  'Bangkok Pattaya Tour Package | 5 Days Thai Holiday',
  'Enjoy 5 days Bangkok and Pattaya tour with Coral Island speedboat trip, golden temple tour, Alcazar show and 4-star hotels.',
  'bangkok package, pattaya tour, coral island, thailand vacation, bangkok temples',
  'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80'
),
(
  '11111111-0000-0000-0000-000000000005',
  'Parisian Romance & French Riviera Highlights',
  'paris-romantic-lights-and-culture',
  'Eiffel Tower sunsets, Louvre art wonders, Seine champagne cruise and fairytale Versailles in 6 days.',
  'Fall head over heels for the world’s capital of romance and culture. Walk hand-in-hand along grand Haussmann boulevards, admire the Mona Lisa at the Louvre, ascend the Eiffel Tower for golden-hour vistas, explore the gilded Hall of Mirrors at Palace of Versailles, and savor buttery croissants at quaint roadside cafes.',
  'published',
  114999, 72999, 14999, true,
  6, 5, 'easy',
  2, 14, 'All ages welcome',
  'Paris, France', 48.85840000, 2.29450000,
  true, false, true, false, false, false,
  'Paris Holiday Package | Eiffel Tower, Louvre & Versailles',
  'Book a 6-day romantic Paris holiday: Eiffel Tower summit tickets, Seine River cruise, Louvre museum guided tour and Versailles palace.',
  'paris tour, eiffel tower, louvre museum, versailles palace, paris honeymoon',
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80'
),
(
  '11111111-0000-0000-0000-000000000006',
  'Tokyo Neon Dreams & Mount Fuji Discovery',
  'tokyo-neon-dreams-and-mount-fuji',
  'Bullet trains, ancient Shinto shrines, Akihabara tech marvels and majestic Mount Fuji vistas.',
  'Step into the future while honoring centuries of samurai tradition. Cross Shibuya’s world-famous intersection, find inner tranquility at Meiji Shrine, ride the lightning-fast Shinkansen bullet train to Mount Fuji’s 5th station, taste melt-in-the-mouth sushi at Tsukiji, and explore Tokyo’s vibrant anime subcultures.',
  'published',
  129999, 82999, 17999, true,
  7, 6, 'moderate',
  2, 16, 'Suitable for ages 5+',
  'Tokyo, Japan', 35.65860000, 139.74540000,
  true, true, true, false, false, true,
  'Tokyo Japan Tour Package | Mount Fuji & Bullet Train',
  'Book 7-day Tokyo Japan tour with Mount Fuji day excursion, Shinkansen train, Shibuya crossing, Akihabara and Asakusa temple.',
  'tokyo tour, mount fuji, shibuya crossing, japan bullet train, tokyo package',
  'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80'
)
ON CONFLICT (slug) DO NOTHING;

-- Package Category Junction
INSERT INTO package_categories (package_id, category_id)
SELECT p.pid, c.id FROM (VALUES
  ('11111111-0000-0000-0000-000000000001'::uuid, 'cultural'),
  ('11111111-0000-0000-0000-000000000001'::uuid, 'beach'),
  ('11111111-0000-0000-0000-000000000002'::uuid, 'beach'),
  ('11111111-0000-0000-0000-000000000002'::uuid, 'adventure'),
  ('11111111-0000-0000-0000-000000000003'::uuid, 'cultural'),
  ('11111111-0000-0000-0000-000000000003'::uuid, 'adventure'),
  ('11111111-0000-0000-0000-000000000004'::uuid, 'cultural'),
  ('11111111-0000-0000-0000-000000000004'::uuid, 'beach'),
  ('11111111-0000-0000-0000-000000000005'::uuid, 'cultural'),
  ('11111111-0000-0000-0000-000000000006'::uuid, 'cultural'),
  ('11111111-0000-0000-0000-000000000006'::uuid, 'mountain'),
  ('11111111-0000-0000-0000-000000000006'::uuid, 'adventure')
) AS p(pid, cslug)
JOIN categories c ON c.slug = p.cslug
ON CONFLICT DO NOTHING;

-- Package Subcategory Junction
INSERT INTO package_subcategories (package_id, subcategory_id)
SELECT p.pid, s.id FROM (VALUES
  ('11111111-0000-0000-0000-000000000001'::uuid, 'luxury'),
  ('11111111-0000-0000-0000-000000000001'::uuid, 'family'),
  ('11111111-0000-0000-0000-000000000002'::uuid, 'honeymoon'),
  ('11111111-0000-0000-0000-000000000002'::uuid, 'luxury'),
  ('11111111-0000-0000-0000-000000000003'::uuid, 'family'),
  ('11111111-0000-0000-0000-000000000003'::uuid, 'group'),
  ('11111111-0000-0000-0000-000000000004'::uuid, 'budget'),
  ('11111111-0000-0000-0000-000000000004'::uuid, 'group'),
  ('11111111-0000-0000-0000-000000000005'::uuid, 'honeymoon'),
  ('11111111-0000-0000-0000-000000000005'::uuid, 'luxury'),
  ('11111111-0000-0000-0000-000000000006'::uuid, 'group'),
  ('11111111-0000-0000-0000-000000000006'::uuid, 'luxury')
) AS p(pid, sslug)
JOIN subcategories s ON s.slug = p.sslug
ON CONFLICT DO NOTHING;

-- Package Destinations Junction
INSERT INTO package_destinations (package_id, destination_id)
SELECT p.pid, d.id FROM (VALUES
  ('11111111-0000-0000-0000-000000000001'::uuid, 'dubai'),
  ('11111111-0000-0000-0000-000000000002'::uuid, 'bali'),
  ('11111111-0000-0000-0000-000000000003'::uuid, 'singapore'),
  ('11111111-0000-0000-0000-000000000004'::uuid, 'bangkok'),
  ('11111111-0000-0000-0000-000000000005'::uuid, 'paris'),
  ('11111111-0000-0000-0000-000000000006'::uuid, 'tokyo')
) AS p(pid, dslug)
JOIN destinations d ON d.slug = p.dslug
ON CONFLICT DO NOTHING;

-- Package Galleries
INSERT INTO package_gallery (package_id, image_url, is_cover, display_order) VALUES
  ('11111111-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80', true, 0),
  ('11111111-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80', false, 1),
  ('11111111-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1600&q=80', false, 2),
  ('11111111-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80', true, 0),
  ('11111111-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1600&q=80', false, 1),
  ('11111111-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1600&q=80', false, 2),
  ('11111111-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80', true, 0),
  ('11111111-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1506351421178-63788970ee5b?auto=format&fit=crop&w=1600&q=80', false, 1),
  ('11111111-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1600&q=80', true, 0),
  ('11111111-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1563492065599-3580f777d066?auto=format&fit=crop&w=1600&q=80', false, 1),
  ('11111111-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80', true, 0),
  ('11111111-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1520939817895-060bdef4df1a?auto=format&fit=crop&w=1600&q=80', false, 1),
  ('11111111-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80', true, 0),
  ('11111111-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80', false, 1);

-- Package Inclusions
INSERT INTO package_inclusions (package_id, item_text, icon_name, is_included, display_order) VALUES
  ('11111111-0000-0000-0000-000000000001', '4 Nights luxury hotel accommodation in central Dubai', 'Hotel', true, 0),
  ('11111111-0000-0000-0000-000000000001', 'Daily international breakfast buffet', 'Utensils', true, 1),
  ('11111111-0000-0000-0000-000000000001', 'Airport pickup and drop in private vehicle', 'Car', true, 2),
  ('11111111-0000-0000-0000-000000000001', 'Burj Khalifa 124th floor non-prime tickets', 'Ticket', true, 3),
  ('11111111-0000-0000-0000-000000000001', 'Desert safari with 4x4 dune bashing & BBQ dinner', 'Sun', true, 4),
  ('11111111-0000-0000-0000-000000000001', 'Dubai Marina dhow cruise with dinner buffet', 'Ship', true, 5),
  ('11111111-0000-0000-0000-000000000001', 'International airfare to/from Dubai', 'Plane', false, 6),
  ('11111111-0000-0000-0000-000000000001', 'UAE Tourist Visa fee & Tourism Dirham tax', 'ShieldCheck', false, 7),
  ('11111111-0000-0000-0000-000000000002', '3 Nights Ubud jungle resort + 2 Nights Seminyak beachfront villa', 'Hotel', true, 0),
  ('11111111-0000-0000-0000-000000000002', 'Daily breakfast (including 1 floating breakfast experience)', 'Utensils', true, 1),
  ('11111111-0000-0000-0000-000000000002', 'All airport and inter-hotel transfers in private AC vehicle', 'Car', true, 2),
  ('11111111-0000-0000-0000-000000000002', 'Ubud swing, rice terrace and Kintamani volcano tour with lunch', 'Ticket', true, 3),
  ('11111111-0000-0000-0000-000000000002', 'Uluwatu temple entry with Kecak dance show tickets', 'Music', true, 4),
  ('11111111-0000-0000-0000-000000000002', 'International flight tickets', 'Plane', false, 5),
  ('11111111-0000-0000-0000-000000000003', '4 Nights 4-star hotel in downtown Singapore', 'Hotel', true, 0),
  ('11111111-0000-0000-0000-000000000003', 'Gardens by the Bay (Flower Dome + Cloud Forest) tickets', 'Ticket', true, 1),
  ('11111111-0000-0000-0000-000000000003', 'Universal Studios Singapore 1-day pass', 'Ticket', true, 2),
  ('11111111-0000-0000-0000-000000000003', 'International flights', 'Plane', false, 3),
  ('11111111-0000-0000-0000-000000000004', '2 Nights in Pattaya + 2 Nights in Bangkok (4-star hotels)', 'Hotel', true, 0),
  ('11111111-0000-0000-0000-000000000004', 'Coral Island tour by speedboat with lunch included', 'Ship', true, 1),
  ('11111111-0000-0000-0000-000000000004', 'Alcazar Cabaret Show standard ticket', 'Ticket', true, 2),
  ('11111111-0000-0000-0000-000000000004', 'Chao Phraya river dinner cruise with buffet', 'Ship', true, 3),
  ('11111111-0000-0000-0000-000000000005', '5 Nights 4-star boutique hotel in central Paris', 'Hotel', true, 0),
  ('11111111-0000-0000-0000-000000000005', 'Eiffel Tower priority summit access tickets', 'Ticket', true, 1),
  ('11111111-0000-0000-0000-000000000005', 'Louvre Museum fast-track admission ticket', 'Ticket', true, 2),
  ('11111111-0000-0000-0000-000000000005', 'Palace of Versailles entry with audio tour', 'Castle', true, 3),
  ('11111111-0000-0000-0000-000000000006', '6 Nights 4-star hotel in Shinjuku / Tokyo', 'Hotel', true, 0),
  ('11111111-0000-0000-0000-000000000006', 'Mount Fuji 5th station + Lake Ashi cruise + Shinkansen ticket', 'Ticket', true, 1),
  ('11111111-0000-0000-0000-000000000006', 'TeamLab Planets digital art museum ticket', 'Ticket', true, 2);

-- Stay Details
INSERT INTO stay_details (package_id, hotel_name, location, rating, room_type, amenities, image_url, check_in_date, check_out_date, display_order) VALUES
  ('11111111-0000-0000-0000-000000000001', 'Millennium Place Marina Hotel', 'Dubai Marina, Dubai', 4, 'Superior City View Room', ARRAY['Swimming Pool', 'Free High-Speed WiFi', 'Fitness Center', 'Spa'], 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80', 'Day 1', 'Day 5', 0),
  ('11111111-0000-0000-0000-000000000002', 'The Kayon Jungle Resort & Courtyard Seminyak', 'Ubud & Seminyak, Bali', 5, 'Private Pool Villa & Deluxe Balcony Room', ARRAY['Private Pool', 'Free WiFi', 'Luxury Spa', 'Rainforest Views'], 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80', 'Day 1', 'Day 6', 0),
  ('11111111-0000-0000-0000-000000000003', 'PARKROYAL on Kitchener Road', 'Little India / Central, Singapore', 4, 'Superior Deluxe Room', ARRAY['Pool', 'WiFi', 'Gym', 'Metro Station Nearby'], 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80', 'Day 1', 'Day 5', 0),
  ('11111111-0000-0000-0000-000000000004', 'A-One The Royal Cruise & Centara Watergate', 'Pattaya Beach & Bangkok Central', 4, 'Deluxe City View Room', ARRAY['Swimming Pool', 'Free WiFi', 'Rooftop Bar', 'Spa'], 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80', 'Day 1', 'Day 5', 0),
  ('11111111-0000-0000-0000-000000000005', 'Pullman Paris Tour Eiffel', 'Central Paris, France', 4, 'Classic Balcony Room', ARRAY['Eiffel Tower View', 'Free WiFi', 'Bar & Lounge', 'Fitness Center'], 'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=1000&q=80', 'Day 1', 'Day 6', 0),
  ('11111111-0000-0000-0000-000000000006', 'Keio Plaza Hotel Tokyo', 'Shinjuku, Tokyo', 4, 'Superior Twin Room', ARRAY['Skyline Views', 'Free High Speed WiFi', 'Multiple Restaurants'], 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1000&q=80', 'Day 1', 'Day 7', 0);

-- Package Highlights
INSERT INTO package_highlights (package_id, highlight_text, display_order) VALUES
  ('11111111-0000-0000-0000-000000000001', 'Take in panoramic 360-degree views from Burj Khalifa Level 124.', 0),
  ('11111111-0000-0000-0000-000000000001', 'Thrilling 4x4 red dune bashing with sandboarding and camel rides.', 1),
  ('11111111-0000-0000-0000-000000000001', 'Luxury evening dinner cruise along the glittering Dubai Marina.', 2),
  ('11111111-0000-0000-0000-000000000002', 'Experience the iconic Bali swing soaring over jungle ravines.', 0),
  ('11111111-0000-0000-0000-000000000002', 'Spectacular sunset Kecak fire dance over Uluwatu coastal cliffs.', 1),
  ('11111111-0000-0000-0000-000000000003', 'Full-day adventure pass to Universal Studios on Sentosa Island.', 0),
  ('11111111-0000-0000-0000-000000000003', 'Supertree Grove light show and indoor waterfall at Cloud Forest.', 1),
  ('11111111-0000-0000-0000-000000000004', 'Speedboat excursion to Coral Island with turquoise swimming waters.', 0),
  ('11111111-0000-0000-0000-000000000004', 'VIP dinner cruise sailing past Wat Arun on Chao Phraya river.', 1),
  ('11111111-0000-0000-0000-000000000005', 'Summit views from the Eiffel Tower overlooking the entire city.', 0),
  ('11111111-0000-0000-0000-000000000005', 'Skip-the-line entrance to the Louvre and Palace of Versailles.', 1),
  ('11111111-0000-0000-0000-000000000006', 'Mount Fuji day tour including Lake Ashi cruise and Shinkansen ride.', 0),
  ('11111111-0000-0000-0000-000000000006', 'Sensory immersion at TeamLab Planets digital art museum.', 1);

-- Travel Tips
INSERT INTO travel_tips (package_id, tip_text, display_order) VALUES
  ('11111111-0000-0000-0000-000000000001', 'Wear modest, breathable clothing when visiting mosques and historical souks.', 0),
  ('11111111-0000-0000-0000-000000000001', 'Pre-book Dubai Frame and Museum of the Future slots early to secure entry.', 1),
  ('11111111-0000-0000-0000-000000000002', 'Bring sarongs or lightweight cover-ups for sacred temple entries.', 0),
  ('11111111-0000-0000-0000-000000000003', 'Purchase an EZ-Link card or use contactless credit cards for convenient MRT rides.', 0),
  ('11111111-0000-0000-0000-000000000004', 'Remove shoes and dress respectfully before entering Buddhist temples.', 0),
  ('11111111-0000-0000-0000-000000000005', 'Comfortable walking shoes are essential for cobbles and museum galleries.', 0),
  ('11111111-0000-0000-0000-000000000006', 'Japan is punctilious about timing; bullet trains depart to the exact second.', 0);

-- Best Time to Visit
INSERT INTO best_time_to_visit (package_id, month_start, month_end, description, weather_condition) VALUES
  ('11111111-0000-0000-0000-000000000001', 'November', 'March', 'Pleasant winter temperatures between 20°C and 28°C.', 'Warm, sunny and dry'),
  ('11111111-0000-0000-0000-000000000002', 'April', 'October', 'Dry season boasting warm sunny days and low humidity.', 'Sunny & tropical breeze'),
  ('11111111-0000-0000-0000-000000000003', 'January', 'December', 'Singapore is a true year-round destination.', 'Tropical & warm'),
  ('11111111-0000-0000-0000-000000000004', 'November', 'April', 'Pleasant tropical weather with minimal rainfall.', 'Warm & clear skies'),
  ('11111111-0000-0000-0000-000000000005', 'April', 'October', 'Spring blossoms and crisp golden autumn days.', 'Mild, pleasant & sunny'),
  ('11111111-0000-0000-0000-000000000006', 'March', 'May', 'Cherry blossom season in spring and red leaves in autumn.', 'Crisp, sunny & scenic');

-- Places to Visit
INSERT INTO places_to_visit (package_id, place_name, description, distance_from_hotel, entry_fee) VALUES
  ('11111111-0000-0000-0000-000000000001', 'Burj Khalifa', 'The tallest building on the planet standing at 828 meters.', '18 km', 'Included'),
  ('11111111-0000-0000-0000-000000000001', 'Dubai Marina Walk', 'Vibrant 7 km palm-fringed waterfront promenade.', '1 km', 'Free'),
  ('11111111-0000-0000-0000-000000000002', 'Tegalalang Rice Terraces', 'Famous UNESCO heritage terraced landscapes.', '8 km', 'Included'),
  ('11111111-0000-0000-0000-000000000002', 'Uluwatu Temple', 'Ancient cliff-edge sea sanctuary 70 meters above sea level.', '25 km', 'Included'),
  ('11111111-0000-0000-0000-000000000003', 'Gardens by the Bay', 'Futuristic botanical wonderland with 50-meter Supertrees.', '4 km', 'Included'),
  ('11111111-0000-0000-0000-000000000004', 'Coral Island (Koh Larn)', 'Pristine beach island perfect for watersports.', '7 km offshore', 'Included'),
  ('11111111-0000-0000-0000-000000000005', 'Eiffel Tower', 'The 330m iron icon of France.', '1 km', 'Included'),
  ('11111111-0000-0000-0000-000000000006', 'Mount Fuji & Lake Ashi', 'Japan’s iconic snow-capped volcanic peak.', '100 km', 'Included');

-- Cancellation Policies
INSERT INTO cancellation_policies (package_id, window_label, refund_text, display_order) VALUES
  ('11111111-0000-0000-0000-000000000001', '30+ days before departure', '100% refund (minus processing fee)', 0),
  ('11111111-0000-0000-0000-000000000001', '15 to 29 days before departure', '50% refund', 1),
  ('11111111-0000-0000-0000-000000000001', 'Under 14 days before departure', 'Non-refundable', 2),
  ('11111111-0000-0000-0000-000000000002', '45+ days before departure', '100% refund', 0),
  ('11111111-0000-0000-0000-000000000002', 'Under 20 days before departure', 'Non-refundable', 1),
  ('11111111-0000-0000-0000-000000000005', '60+ days before departure', '90% refund', 0),
  ('11111111-0000-0000-0000-000000000005', 'Under 30 days before departure', 'Non-refundable', 1);

-- Required Documents
INSERT INTO required_documents (package_id, document_text, display_order) VALUES
  ('11111111-0000-0000-0000-000000000001', 'Valid Passport with at least 6 months validity', 0),
  ('11111111-0000-0000-0000-000000000001', 'UAE Tourist Visa (can be arranged on request)', 1),
  ('11111111-0000-0000-0000-000000000002', 'Passport valid for at least 6 months past return date', 0),
  ('11111111-0000-0000-0000-000000000003', 'Singapore SG Arrival Card and Tourist Visa', 0),
  ('11111111-0000-0000-0000-000000000005', 'Valid Schengen Tourist Visa and Travel Insurance', 0),
  ('11111111-0000-0000-0000-000000000006', 'Valid Japan Tourist Visa and Visit Japan Web registration', 0);

-- Reviews
INSERT INTO reviews (package_id, reviewer_name, reviewer_email, rating, review_text, is_approved) VALUES
  ('11111111-0000-0000-0000-000000000001', 'Aravind Swaminathan', 'aravind.s@example.com', 5, 'Dubai trip was seamlessly arranged! The desert safari driver was awesome and the marina dhow dinner had delicious food.', true),
  ('11111111-0000-0000-0000-000000000002', 'Tanvi Saxena', 'tanvi.s@example.com', 5, 'Bali with TripBloom was a dream! The Ubud villa was mesmerizing and our private driver was so polite.', true),
  ('11111111-0000-0000-0000-000000000003', 'Pooja Venkatesh', 'pooja.v@example.com', 5, 'The best family vacation we ever had! Kids loved Universal Studios and the night safari was extraordinary.', true),
  ('11111111-0000-0000-0000-000000000005', 'Meenakshi Sundaram', 'meenakshi@example.com', 5, 'Paris was pure poetry. The hotel was right by the Eiffel Tower and all tickets were pre-booked.', true);
