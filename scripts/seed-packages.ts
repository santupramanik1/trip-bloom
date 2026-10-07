/**
 * Seed Dummy Tour Packages for TripBloom / Travel Carvers
 * 
 * Creates realistic, rich tour packages across destinations and categories,
 * complete with galleries, itineraries, inclusions, hotel stays, highlights,
 * travel tips, best time to visit, places to visit, and cancellation policies.
 * 
 * Run with:
 *   npm run seed:packages
 * or:
 *   npx tsx scripts/seed-packages.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// 1. Environment Loading
function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), '.env.local');
    const envContent = readFileSync(envPath, 'utf-8');

    envContent.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
        if (key && value && !process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  } catch {
    // Fall back to dotenv
  }
  dotenv.config({ path: '.env.local' });
  dotenv.config();
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY is not defined in .env.local');
  console.error('   Please ensure your service role key is set.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// 2. Dummy Package Definitions
interface ItineraryDayInput {
  day_number: number;
  title: string;
  morning_activity: string;
  afternoon_activity: string;
  evening_activity: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  entries: Array<{
    name: string;
    time_label?: string;
    description: string;
    icon_name?: string;
    image_url?: string;
  }>;
}

interface PackageDefinition {
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  status: 'published' | 'draft' | 'archived' | 'sold_out';
  price_adult: number;
  price_child: number;
  price_infant: number;
  show_price: boolean;
  duration_days: number;
  duration_nights: number;
  difficulty_level: 'easy' | 'moderate' | 'hard';
  group_size_min: number;
  group_size_max: number;
  age_restriction: string;
  destination_name: string;
  destination_slug?: string;
  main_destination_lat: number;
  main_destination_lng: number;
  is_featured: boolean;
  is_trending: boolean;
  is_new: boolean;
  is_seasonal: boolean;
  is_best_seller: boolean;
  is_group_package: boolean;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_image: string;
  category_slugs: string[];
  subcategory_slugs: string[];
  gallery: Array<{ image_url: string; is_cover: boolean }>;
  video_url?: string;
  itinerary: ItineraryDayInput[];
  inclusions: Array<{ item_text: string; icon_name: string; is_included: boolean }>;
  stay: {
    hotel_name: string;
    location: string;
    rating: number;
    room_type: string;
    amenities: string[];
    image_url: string;
    check_in_date: string;
    check_out_date: string;
  };
  highlights: string[];
  tips: string[];
  best_time: {
    month_start: string;
    month_end: string;
    description: string;
    weather_condition: string;
  };
  places: Array<{
    place_name: string;
    description: string;
    distance_from_hotel: string;
    entry_fee: string;
  }>;
  cancellation_rules: Array<{ window_label: string; refund_text: string }>;
  required_docs: string[];
  reviews: Array<{
    reviewer_name: string;
    reviewer_email: string;
    rating: number;
    review_text: string;
  }>;
}

const PACKAGES_DATA: PackageDefinition[] = [
  // 1. Dubai
  {
    title: 'Dubai Glamour & Desert Safari Extravaganza',
    slug: 'dubai-glamour-and-desert-safari',
    short_description: 'Futuristic skylines, golden dunes, luxury cruises and iconic landmarks in 5 thrilling days.',
    full_description: 'Experience the magic of Dubai where modern architectural wonders meet Arabian heritage. Enjoy breathtaking views from the 124th floor of Burj Khalifa, thrill to 4x4 dune bashing across golden sands with a starlit BBQ dinner, and sail the serene Dubai Marina aboard a luxury dhow.',
    status: 'published',
    price_adult: 64999,
    price_child: 39999,
    price_infant: 7999,
    show_price: true,
    duration_days: 5,
    duration_nights: 4,
    difficulty_level: 'easy',
    group_size_min: 2,
    group_size_max: 16,
    age_restriction: 'All ages welcome',
    destination_name: 'Dubai, United Arab Emirates',
    destination_slug: 'dubai',
    main_destination_lat: 25.1972,
    main_destination_lng: 55.2744,
    is_featured: true,
    is_trending: true,
    is_new: false,
    is_seasonal: false,
    is_best_seller: true,
    is_group_package: false,
    meta_title: 'Dubai Tour Package | Desert Safari & City Tour',
    meta_description: 'Book 5 days Dubai package with Burj Khalifa tickets, desert safari BBQ, luxury marina dhow cruise and 4-star hotel stay.',
    meta_keywords: 'dubai tour, desert safari, burj khalifa, dubai marina, dubai holiday',
    og_image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    category_slugs: ['cultural', 'beach'],
    subcategory_slugs: ['luxury', 'family'],
    gallery: [
      { image_url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80', is_cover: true },
      { image_url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80', is_cover: false },
      { image_url: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1600&q=80', is_cover: false },
      { image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80', is_cover: false },
    ],
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    itinerary: [
      {
        day_number: 1,
        title: 'Arrival in Dubai & Marina Dhow Cruise',
        morning_activity: 'Arrival at Dubai International Airport with VIP private transfer to hotel.',
        afternoon_activity: 'Check-in, relax and refresh after your flight.',
        evening_activity: 'Board a traditional 2-hour Dhow cruise along Dubai Marina with dinner buffet and live music.',
        breakfast: false, lunch: false, dinner: true,
        entries: [
          { name: 'Airport Welcome & Hotel Transfer', time_label: '10:00 AM', description: 'Private AC transfer to hotel with assistance.', icon_name: 'Car' },
          { name: 'Marina Dhow Dinner Cruise', time_label: '07:30 PM', description: 'Spectacular illuminated views of marina towers with international buffet.', icon_name: 'Ship' },
        ],
      },
      {
        day_number: 2,
        title: 'Dubai City Tour & Burj Khalifa At The Top',
        morning_activity: 'Guided tour covering Dubai Frame, Palm Jumeirah and Jumeirah Beach.',
        afternoon_activity: 'Explore Dubai Mall and underwater zoo.',
        evening_activity: 'Ascend to 124th floor observation deck of Burj Khalifa followed by dancing fountains.',
        breakfast: true, lunch: false, dinner: false,
        entries: [
          { name: 'Historic & Modern City Tour', time_label: '09:00 AM', description: 'Photo stops at Burj Al Arab, Atlantis and Blue Waters.', icon_name: 'Camera' },
          { name: 'Burj Khalifa Observation Deck', time_label: '05:30 PM', description: 'Fast-track entry to levels 124 & 125 at golden hour.', icon_name: 'Landmark' },
        ],
      },
      {
        day_number: 3,
        title: 'Red Dune Desert Safari & Arabian BBQ',
        morning_activity: 'Free morning for shopping at Gold Souk or relaxation.',
        afternoon_activity: '4x4 Land Cruiser dune bashing across Lahbab high red dunes with sandboarding.',
        evening_activity: 'Bedouin campsite dinner with tanoura dance, fire show, camel rides and shisha.',
        breakfast: true, lunch: false, dinner: true,
        entries: [
          { name: '4x4 Red Dunes Safari', time_label: '03:00 PM', description: 'High-adrenaline dune bashing with expert safari marshals.', icon_name: 'Sun' },
          { name: 'Camp BBQ & Cultural Shows', time_label: '07:00 PM', description: 'Live entertainment with grilled BBQ buffet under desert skies.', icon_name: 'Sparkles' },
        ],
      },
      {
        day_number: 4,
        title: 'Abu Dhabi Day Trip or Miracle Garden',
        morning_activity: 'Visit the world-famous Miracle Garden and Global Village.',
        afternoon_activity: 'Free time for designer shopping or visiting Museum of the Future.',
        evening_activity: 'Fine dining experience at Bluewaters Island overlooking Ain Dubai.',
        breakfast: true, lunch: false, dinner: true,
        entries: [
          { name: 'Miracle Garden Exploration', time_label: '10:00 AM', description: 'Millions of blooming floral sculptures and structures.', icon_name: 'Flower2' },
          { name: 'Museum of the Future Photo Stop', time_label: '03:00 PM', description: 'Marvel at Dubai’s most innovative architectural wonder.', icon_name: 'Building2' },
        ],
      },
      {
        day_number: 5,
        title: 'Souvenir Shopping & Farewell Departure',
        morning_activity: 'Breakfast at hotel and checkout.',
        afternoon_activity: 'Private transfer to Dubai International Airport for departure flight.',
        evening_activity: 'Board return flight home with unforgettable memories.',
        breakfast: true, lunch: false, dinner: false,
        entries: [
          { name: 'Checkout & Transfer', time_label: '12:00 PM', description: 'Private vehicle transfer to DXB Airport.', icon_name: 'PlaneTakeoff' },
        ],
      },
    ],
    inclusions: [
      { item_text: '4 Nights luxury hotel accommodation in central Dubai', icon_name: 'Hotel', is_included: true },
      { item_text: 'Daily international breakfast buffet', icon_name: 'Utensils', is_included: true },
      { item_text: 'Airport pickup and drop in private vehicle', icon_name: 'Car', is_included: true },
      { item_text: 'Burj Khalifa 124th floor non-prime tickets', icon_name: 'Ticket', is_included: true },
      { item_text: 'Desert safari with 4x4 dune bashing & BBQ dinner', icon_name: 'Sun', is_included: true },
      { item_text: 'Dubai Marina dhow cruise with dinner buffet', icon_name: 'Ship', is_included: true },
      { item_text: 'International airfare to/from Dubai', icon_name: 'Plane', is_included: false },
      { item_text: 'UAE Tourist Visa fee & Tourism Dirham tax', icon_name: 'ShieldCheck', is_included: false },
      { item_text: 'Personal expenses, tips and optional activities', icon_name: 'Wallet', is_included: false },
    ],
    stay: {
      hotel_name: 'Millennium Place Marina Hotel',
      location: 'Dubai Marina, Dubai',
      rating: 4,
      room_type: 'Superior City View Room',
      amenities: ['Swimming Pool', 'Free High-Speed WiFi', 'Fitness Center', 'Spa', 'Restaurant'],
      image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
      check_in_date: 'Day 1',
      check_out_date: 'Day 5',
    },
    highlights: [
      'Take in panoramic 360-degree views from Burj Khalifa Level 124.',
      'Thrilling 4x4 red dune bashing with sandboarding and camel rides.',
      'Luxury evening dinner cruise along the glittering Dubai Marina.',
      'Centrally located 4-star hotel close to metro and shopping attractions.',
    ],
    tips: [
      'Wear modest, breathable clothing when visiting mosques and historical souks.',
      'Pre-book Dubai Frame and Museum of the Future slots early to secure entry.',
      'Keep your international debit/credit cards active for cashless payments.',
    ],
    best_time: {
      month_start: 'November',
      month_end: 'March',
      description: 'Pleasant winter temperatures ranging between 20°C and 28°C, ideal for outdoor exploration.',
      weather_condition: 'Warm, sunny and dry',
    },
    places: [
      { place_name: 'Burj Khalifa', description: 'The tallest building on the planet standing at 828 meters.', distance_from_hotel: '18 km', entry_fee: 'Included' },
      { place_name: 'Dubai Mall & Fountains', description: 'Massive shopping, dining and spectacle complex.', distance_from_hotel: '18 km', entry_fee: 'Free' },
      { place_name: 'Dubai Marina Walk', description: 'Vibrant 7 km palm-fringed waterfront promenade.', distance_from_hotel: '1 km', entry_fee: 'Free' },
    ],
    cancellation_rules: [
      { window_label: '30+ days before departure', refund_text: '100% refund (minus processing fee)' },
      { window_label: '15 to 29 days before departure', refund_text: '50% refund' },
      { window_label: 'Under 14 days before departure', refund_text: 'Non-refundable' },
    ],
    required_docs: [
      'Valid Passport with at least 6 months validity',
      'UAE Tourist Visa (can be arranged on request)',
      'Return flight ticket confirmation',
    ],
    reviews: [
      { reviewer_name: 'Aravind Swaminathan', reviewer_email: 'aravind.s@example.com', rating: 5, review_text: 'Dubai trip was seamlessly arranged! The desert safari driver was awesome and the marina dhow dinner had delicious food.' },
      { reviewer_name: 'Sneha Patel', reviewer_email: 'sneha.patel@example.com', rating: 5, review_text: 'Every transfer was on time. The Burj Khalifa sunset view was mind-blowing. Highly recommended for couples and families!' },
    ],
  },

  // 2. Bali
  {
    title: 'Bali Tropical Paradise & Ubud Heritage Retreat',
    slug: 'bali-tropical-paradise-retreat',
    short_description: 'Emerald rice terraces, clifftop temples, tropical beaches and private pool villa bliss.',
    full_description: 'Surrender to the mystical allure of the Island of the Gods. Explore the artistic soul of Ubud, swing over lush jungle gorges at Tegalalang, witness sacred sunset kecak dance atop Uluwatu cliffs, and unwind with soothing Balinese massages in private tropical villas.',
    status: 'published',
    price_adult: 49999,
    price_child: 29999,
    price_infant: 5999,
    show_price: true,
    duration_days: 6,
    duration_nights: 5,
    difficulty_level: 'easy',
    group_size_min: 2,
    group_size_max: 12,
    age_restriction: 'All ages welcome',
    destination_name: 'Bali, Indonesia',
    destination_slug: 'bali',
    main_destination_lat: -8.5069,
    main_destination_lng: 115.2625,
    is_featured: true,
    is_trending: true,
    is_new: false,
    is_seasonal: true,
    is_best_seller: false,
    is_group_package: false,
    meta_title: 'Bali Honeymoon & Tour Package | Ubud & Kuta Beach',
    meta_description: 'Experience 6 days in Bali: Ubud jungle villas, Uluwatu sunset temple, Tegalalang rice terraces and Nusa Penida island excursion.',
    meta_keywords: 'bali tour, ubud villa, uluwatu temple, bali honeymoon, indonesia holiday',
    og_image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    category_slugs: ['beach', 'adventure'],
    subcategory_slugs: ['honeymoon', 'luxury'],
    gallery: [
      { image_url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80', is_cover: true },
      { image_url: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1600&q=80', is_cover: false },
      { image_url: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1600&q=80', is_cover: false },
      { image_url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80', is_cover: false },
    ],
    video_url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    itinerary: [
      {
        day_number: 1,
        title: 'Arrival in Denpasar & Transfer to Ubud',
        morning_activity: 'Touchdown at Ngurah Rai International Airport; welcome garland by local escort.',
        afternoon_activity: 'Scenic drive through green country lanes to Ubud jungle resort.',
        evening_activity: 'Relax by infinity pool and welcome candlelight dinner.',
        breakfast: false, lunch: false, dinner: true,
        entries: [
          { name: 'Airport VIP Pickup', time_label: '11:00 AM', description: 'Private transfer with flower garland welcome.', icon_name: 'Car' },
          { name: 'Resort Check-in & Spa', time_label: '04:00 PM', description: 'Traditional welcome drink and complimentary 30-min foot reflexology.', icon_name: 'Hotel' },
        ],
      },
      {
        day_number: 2,
        title: 'Ubud Art Villages, Tegalalang & Swing',
        morning_activity: 'Visit sacred Monkey Forest and Celuk silvercraft village.',
        afternoon_activity: 'Tegalalang rice terrace walk and iconic Bali jungle swing ride.',
        evening_activity: 'Stroll through Ubud Royal Palace and local craft market.',
        breakfast: true, lunch: true, dinner: false,
        entries: [
          { name: 'Tegalalang Rice Terraces', time_label: '10:00 AM', description: 'Walk through cascading emerald paddy terraces.', icon_name: 'Mountain' },
          { name: 'Aloha Jungle Swing', time_label: '02:00 PM', description: 'Fly high above the rainforest for Instagram-worthy photographs.', icon_name: 'Camera' },
        ],
      },
      {
        day_number: 3,
        title: 'Kintamani Volcano & Coffee Plantation',
        morning_activity: 'Drive to Kintamani overlooking Mount Batur and scenic crater lake.',
        afternoon_activity: 'Buffet lunch with volcano panorama and Luwak coffee tasting.',
        evening_activity: 'Return to resort; free time for wellness treatments.',
        breakfast: true, lunch: true, dinner: false,
        entries: [
          { name: 'Mount Batur Viewpoint', time_label: '11:00 AM', description: 'Cool mountain breeze and majestic volcanic caldera views.', icon_name: 'Mountain' },
          { name: 'Herbal Plantation & Coffee Tasting', time_label: '03:00 PM', description: 'Taste 8 varieties of Balinese teas and artisanal coffees.', icon_name: 'Utensils' },
        ],
      },
      {
        day_number: 4,
        title: 'Transfer to Kuta/Seminyak & Tanah Lot',
        morning_activity: 'Check-out from Ubud and drive toward southern beaches.',
        afternoon_activity: 'Check in to beachfront resort in Seminyak; chill at beach club.',
        evening_activity: 'Dramatic sunset at offshore Tanah Lot temple on sea rock.',
        breakfast: true, lunch: false, dinner: true,
        entries: [
          { name: 'Tanah Lot Sea Temple', time_label: '05:00 PM', description: 'Golden sunset backdrop over the roaring Indian Ocean waves.', icon_name: 'Landmark' },
        ],
      },
      {
        day_number: 5,
        title: 'Water Sports at Tanjung Benoa & Uluwatu Clifftop',
        morning_activity: 'Banana boat, parasailing and jet-ski thrills at Tanjung Benoa.',
        afternoon_activity: 'Relax at Padang Padang beach or beachside cafe.',
        evening_activity: 'Uluwatu clifftop temple visit with traditional Kecak fire dance.',
        breakfast: true, lunch: true, dinner: false,
        entries: [
          { name: 'Tanjung Benoa Watersports', time_label: '09:30 AM', description: 'Included banana boat ride and scenic beach fun.', icon_name: 'Ship' },
          { name: 'Uluwatu Sunset Kecak Dance', time_label: '06:00 PM', description: 'Enthralling choral performance against sheer 70m ocean cliffs.', icon_name: 'Music' },
        ],
      },
      {
        day_number: 6,
        title: 'Balinese Souvenir Shopping & Departure',
        morning_activity: 'Floating breakfast in villa pool and souvenir shopping at Krishna Oleh-Oleh.',
        afternoon_activity: 'Private transfer to Denpasar airport for journey home.',
        evening_activity: 'Departure flight.',
        breakfast: true, lunch: false, dinner: false,
        entries: [
          { name: 'Airport Transfer', time_label: '01:00 PM', description: 'Comfortable transfer to airport for boarding.', icon_name: 'PlaneTakeoff' },
        ],
      },
    ],
    inclusions: [
      { item_text: '3 Nights Ubud jungle resort + 2 Nights Seminyak beachfront villa', icon_name: 'Hotel', is_included: true },
      { item_text: 'Daily breakfast (including 1 floating breakfast experience)', icon_name: 'Utensils', is_included: true },
      { item_text: 'All airport and inter-hotel transfers in private AC vehicle', icon_name: 'Car', is_included: true },
      { item_text: 'Ubud swing, rice terrace and Kintamani volcano tour with lunch', icon_name: 'Ticket', is_included: true },
      { item_text: 'Uluwatu temple entry with Kecak dance show tickets', icon_name: 'Music', is_included: true },
      { item_text: 'Tanjung Benoa banana boat ride', icon_name: 'Ship', is_included: true },
      { item_text: 'International flight tickets', icon_name: 'Plane', is_included: false },
      { item_text: 'Indonesia Visa on Arrival (approx $35 per person)', icon_name: 'ShieldCheck', is_included: false },
      { item_text: 'Personal water sports upgrades and gratuities', icon_name: 'Wallet', is_included: false },
    ],
    stay: {
      hotel_name: 'The Kayon Jungle Resort & Courtyard Seminyak',
      location: 'Ubud & Seminyak, Bali',
      rating: 5,
      room_type: 'Private Pool Villa & Deluxe Balcony Room',
      amenities: ['Private Pool', 'Free WiFi', 'Luxury Spa', 'Rainforest Views', 'Shuttle Service'],
      image_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
      check_in_date: 'Day 1',
      check_out_date: 'Day 6',
    },
    highlights: [
      'Experience the iconic Bali swing soaring over jungle ravines.',
      'Spectacular sunset Kecak fire dance over Uluwatu coastal cliffs.',
      'Split stay: serene Ubud jungle peace followed by vibrant Seminyak beaches.',
      'Romantic floating breakfast included for honeymooners.',
    ],
    tips: [
      'Bring sarongs or lightweight cover-ups for sacred temple entries.',
      'Exchange currency at licensed money changers with zero commission boards.',
      'Stay hydrated in tropical humidity and apply reef-safe sun lotion.',
    ],
    best_time: {
      month_start: 'April',
      month_end: 'October',
      description: 'Dry season boasting warm sunny days and low humidity, perfect for beach life and island tours.',
      weather_condition: 'Sunny & tropical breeze',
    },
    places: [
      { place_name: 'Tegalalang Rice Terraces', description: 'Famous UNESCO heritage terraced landscapes.', distance_from_hotel: '8 km', entry_fee: 'Included' },
      { place_name: 'Uluwatu Temple', description: 'Ancient cliff-edge sea sanctuary 70 meters above sea level.', distance_from_hotel: '25 km', entry_fee: 'Included' },
      { place_name: 'Tanah Lot', description: 'Iconic offshore rock formation with crashing ocean waves.', distance_from_hotel: '15 km', entry_fee: 'Included' },
    ],
    cancellation_rules: [
      { window_label: '45+ days before departure', refund_text: '100% refund' },
      { window_label: '20 to 44 days before departure', refund_text: '60% refund' },
      { window_label: 'Under 20 days before departure', refund_text: 'Non-refundable' },
    ],
    required_docs: [
      'Passport valid for at least 6 months past return date',
      'Indonesia Electronic Customs Declaration (e-CD)',
      'Return ticket confirmation',
    ],
    reviews: [
      { reviewer_name: 'Tanvi Saxena', reviewer_email: 'tanvi.s@example.com', rating: 5, review_text: 'Bali with TripBloom was a dream! The Ubud villa was mesmerizing and our private driver Ketut was so polite and punctual.' },
      { reviewer_name: 'Rohit Kulkarni', reviewer_email: 'rohit.k@example.com', rating: 5, review_text: 'The floating breakfast and Uluwatu sunset show were highlights of our honeymoon. Great coordination.' },
    ],
  },

  // 3. Singapore
  {
    title: 'Singapore City of Tomorrow & Sentosa Island Tour',
    slug: 'singapore-futuristic-city-and-sentosa',
    short_description: 'Supertree groves, Marina Bay wonders, Universal Studios rides and cable car thrills in 5 days.',
    full_description: 'Immerse yourself in Singapore’s futuristic vision where lush vertical gardens embrace soaring glass architecture. Walk under glowing Avatar-like Supertrees, experience movie thrills at Universal Studios on Sentosa, explore multicultural Chinatown, and shop the famous Orchard Road.',
    status: 'published',
    price_adult: 54999,
    price_child: 34999,
    price_infant: 6499,
    show_price: true,
    duration_days: 5,
    duration_nights: 4,
    difficulty_level: 'easy',
    group_size_min: 2,
    group_size_max: 20,
    age_restriction: 'All ages welcome',
    destination_name: 'Singapore',
    destination_slug: 'singapore',
    main_destination_lat: 1.2838,
    main_destination_lng: 103.8607,
    is_featured: false,
    is_trending: true,
    is_new: false,
    is_seasonal: false,
    is_best_seller: false,
    is_group_package: true,
    meta_title: 'Singapore Tour Package | Universal Studios & Sentosa',
    meta_description: 'Book 5-day Singapore holiday package with Gardens by the Bay, Universal Studios passes, Sentosa cable car and night safari.',
    meta_keywords: 'singapore package, gardens by the bay, universal studios singapore, sentosa island',
    og_image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    category_slugs: ['cultural', 'adventure'],
    subcategory_slugs: ['family', 'group'],
    gallery: [
      { image_url: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80', is_cover: true },
      { image_url: 'https://images.unsplash.com/photo-1506351421178-63788970ee5b?auto=format&fit=crop&w=1600&q=80', is_cover: false },
      { image_url: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1600&q=80', is_cover: false },
    ],
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    itinerary: [
      {
        day_number: 1,
        title: 'Arrival in Singapore & Night Safari',
        morning_activity: 'Land at award-winning Changi Airport; transfer to city hotel.',
        afternoon_activity: 'Rest and explore nearby Marina Bay or Jewel Changi Rain Vortex.',
        evening_activity: 'Experience the world-renowned Singapore Night Safari tram tour among nocturnal wildlife.',
        breakfast: false, lunch: false, dinner: false,
        entries: [
          { name: 'Changi Airport Meet & Greet', time_label: '11:00 AM', description: 'Private transfer to central hotel.', icon_name: 'Car' },
          { name: 'World Famous Night Safari', time_label: '07:00 PM', description: 'Guided open tram journey through illuminated rainforest habitats.', icon_name: 'Clock' },
        ],
      },
      {
        day_number: 2,
        title: 'City Highlights & Gardens by the Bay',
        morning_activity: 'City tour covering Merlion Park, Little India and Chinatown heritage streets.',
        afternoon_activity: 'Walk inside the Flower Dome and misty Cloud Forest at Gardens by the Bay.',
        evening_activity: 'Watch the dazzling Garden Rhapsody sound and light show at the Supertree Grove.',
        breakfast: true, lunch: false, dinner: false,
        entries: [
          { name: 'Merlion Park Photo Stop', time_label: '09:30 AM', description: 'Iconic landmark with Marina Bay Sands backdrop.', icon_name: 'Camera' },
          { name: 'Cloud Forest & Supertree Light Show', time_label: '04:30 PM', description: 'Indoor 35m waterfall and magical synchronised evening lights.', icon_name: 'Sparkles' },
        ],
      },
      {
        day_number: 3,
        title: 'Full Day Sentosa & Universal Studios',
        morning_activity: 'Scenic cable car ride across harbour to Sentosa Island.',
        afternoon_activity: 'Spend the entire day thrilling to world-class rides at Universal Studios Singapore.',
        evening_activity: 'Enjoy Wings of Time laser, fire and water fountain show on Siloso Beach.',
        breakfast: true, lunch: false, dinner: false,
        entries: [
          { name: 'Universal Studios Full Day Pass', time_label: '10:00 AM', description: 'Sci-Fi City, Ancient Egypt and Far Far Away attractions.', icon_name: 'FerrisWheel' },
          { name: 'Wings of Time Spectacular', time_label: '07:40 PM', description: 'Pyrotechnics show set against the open sea.', icon_name: 'Sparkles' },
        ],
      },
      {
        day_number: 4,
        title: 'Marina Bay Sands SkyPark & Shopping',
        morning_activity: 'Ascend to Marina Bay Sands SkyPark observation deck for 360-degree city views.',
        afternoon_activity: 'Shopping spree on Orchard Road or visit the Science Centre.',
        evening_activity: 'Sample street cuisine at Lau Pa Sat Satay Street under the city stars.',
        breakfast: true, lunch: false, dinner: true,
        entries: [
          { name: 'MBS SkyPark Observation Deck', time_label: '10:30 AM', description: 'Panoramic views from 57 levels above the bay.', icon_name: 'Landmark' },
          { name: 'Satay Street Feast at Lau Pa Sat', time_label: '08:00 PM', description: 'Authentic Singapore culinary tasting experience.', icon_name: 'Utensils' },
        ],
      },
      {
        day_number: 5,
        title: 'Jewel Changi Experience & Departure',
        morning_activity: 'Check out of hotel; visit Jewel Changi Airport to admire HSBC Rain Vortex.',
        afternoon_activity: 'Duty-free shopping and boarding flight back home.',
        evening_activity: 'Arrival back home.',
        breakfast: true, lunch: false, dinner: false,
        entries: [
          { name: 'Jewel Changi Tour & Transfer', time_label: '12:00 PM', description: 'Explore lush indoor canopy park before takeoff.', icon_name: 'PlaneTakeoff' },
        ],
      },
    ],
    inclusions: [
      { item_text: '4 Nights 4-star hotel in downtown Singapore', icon_name: 'Hotel', is_included: true },
      { item_text: 'Daily international breakfast', icon_name: 'Utensils', is_included: true },
      { item_text: 'All airport and attraction transfers in AC coach', icon_name: 'Car', is_included: true },
      { item_text: 'Gardens by the Bay (Flower Dome + Cloud Forest) tickets', icon_name: 'Ticket', is_included: true },
      { item_text: 'Universal Studios Singapore 1-day pass', icon_name: 'Ticket', is_included: true },
      { item_text: 'Sentosa one-way cable car ride + Wings of Time show', icon_name: 'Ship', is_included: true },
      { item_text: 'International flights', icon_name: 'Plane', is_included: false },
      { item_text: 'Singapore entry visa charges', icon_name: 'ShieldCheck', is_included: false },
    ],
    stay: {
      hotel_name: 'PARKROYAL on Kitchener Road',
      location: 'Little India / Central, Singapore',
      rating: 4,
      room_type: 'Superior Deluxe Room',
      amenities: ['Pool', 'WiFi', 'Gym', 'Metro Station Nearby', 'Multi-cuisine Restaurant'],
      image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
      check_in_date: 'Day 1',
      check_out_date: 'Day 5',
    },
    highlights: [
      'Full-day adventure pass to Universal Studios on Sentosa Island.',
      'Supertree Grove light show and indoor waterfall at Cloud Forest.',
      'World’s first Night Safari tram ride through nocturnal habitats.',
      'Spectacular views from Marina Bay Sands 57th floor SkyPark.',
    ],
    tips: [
      'Singapore has very strict cleanliness laws; never litter or chew gum.',
      'Purchase an EZ-Link card or use contactless credit cards for convenient MRT rides.',
      'Dress in light clothing and carry an umbrella for sudden tropical showers.',
    ],
    best_time: {
      month_start: 'January',
      month_end: 'December',
      description: 'Singapore is a true year-round destination with warm tropical weather and exciting cultural festivals.',
      weather_condition: 'Tropical & warm',
    },
    places: [
      { place_name: 'Gardens by the Bay', description: 'Futuristic botanical wonderland with 50-meter Supertrees.', distance_from_hotel: '4 km', entry_fee: 'Included' },
      { place_name: 'Universal Studios Sentosa', description: 'Southeast Asia’s top Hollywood movie theme park.', distance_from_hotel: '10 km', entry_fee: 'Included' },
      { place_name: 'Marina Bay Sands', description: 'World-famous integrated resort and observation deck.', distance_from_hotel: '4 km', entry_fee: 'Included' },
    ],
    cancellation_rules: [
      { window_label: '30+ days before departure', refund_text: '100% refund' },
      { window_label: '15 to 29 days before departure', refund_text: '50% refund' },
      { window_label: 'Under 14 days before departure', refund_text: 'Non-refundable' },
    ],
    required_docs: [
      'Passport valid for at least 6 months from arrival date',
      'Singapore SG Arrival Card (submitted within 3 days before arrival)',
      'Singapore Tourist Visa',
    ],
    reviews: [
      { reviewer_name: 'Pooja Venkatesh', reviewer_email: 'pooja.v@example.com', rating: 5, review_text: 'The best family vacation we ever had! Kids loved Universal Studios and the night safari was extraordinary.' },
    ],
  },

  // 4. Bangkok
  {
    title: 'Bangkok Temples & Pattaya Beach Fiesta',
    slug: 'bangkok-temples-pattaya-fiesta',
    short_description: 'Golden temples, floating markets, coral island speedboats and legendary Thai street food.',
    full_description: 'Discover the electric energy of Thailand. Cruise the Chao Phraya river past glittering gilded temples, taste award-winning pad thai in buzzing night bazaars, speed across azure waters to Coral Island in Pattaya for water sports, and enjoy world-class cabaret performances.',
    status: 'published',
    price_adult: 27999,
    price_child: 16999,
    price_infant: 3499,
    show_price: true,
    duration_days: 5,
    duration_nights: 4,
    difficulty_level: 'easy',
    group_size_min: 2,
    group_size_max: 24,
    age_restriction: 'All ages welcome',
    destination_name: 'Bangkok, Thailand',
    destination_slug: 'bangkok',
    main_destination_lat: 13.75,
    main_destination_lng: 100.4917,
    is_featured: false,
    is_trending: false,
    is_new: false,
    is_seasonal: false,
    is_best_seller: true,
    is_group_package: true,
    meta_title: 'Bangkok Pattaya Tour Package | 5 Days Thai Holiday',
    meta_description: 'Enjoy 5 days Bangkok and Pattaya tour with Coral Island speedboat trip, golden temple tour, Alcazar show and 4-star hotels.',
    meta_keywords: 'bangkok package, pattaya tour, coral island, thailand vacation, bangkok temples',
    og_image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80',
    category_slugs: ['cultural', 'beach'],
    subcategory_slugs: ['budget', 'group'],
    gallery: [
      { image_url: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1600&q=80', is_cover: true },
      { image_url: 'https://images.unsplash.com/photo-1563492065599-3580f777d066?auto=format&fit=crop&w=1600&q=80', is_cover: false },
      { image_url: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=80', is_cover: false },
    ],
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    itinerary: [
      {
        day_number: 1,
        title: 'Arrival in Bangkok & Drive to Pattaya',
        morning_activity: 'Arrival at Suvarnabhumi Airport; scenic expressway drive to coastal Pattaya.',
        afternoon_activity: 'Check-in at Pattaya hotel and unwind at the beach.',
        evening_activity: 'Experience the world-renowned Alcazar Cabaret Show with VIP seating.',
        breakfast: false, lunch: false, dinner: true,
        entries: [
          { name: 'Airport Transfer to Pattaya', time_label: '11:00 AM', description: 'Expressway transit to Pattaya resort.', icon_name: 'Car' },
          { name: 'Alcazar Cabaret Show', time_label: '06:30 PM', description: 'Spectacular glitzy dance extravaganza with high-tech audio visuals.', icon_name: 'Music' },
        ],
      },
      {
        day_number: 2,
        title: 'Coral Island Speedboat Excursion',
        morning_activity: 'Board speedboat to Koh Larn (Coral Island) across crystal-clear blue waters.',
        afternoon_activity: 'Relax on white sand beach, swim and enjoy Indian buffet lunch.',
        evening_activity: 'Explore vibrant Pattaya Walking Street or night market.',
        breakfast: true, lunch: true, dinner: false,
        entries: [
          { name: 'Speedboat to Coral Island', time_label: '09:00 AM', description: 'Scenic boat ride with optional parasailing stops.', icon_name: 'Ship' },
          { name: 'Koh Larn Beach Relaxation', time_label: '11:00 AM', description: 'Sunbathing and swimming in turquoise sea.', icon_name: 'Sun' },
        ],
      },
      {
        day_number: 3,
        title: 'Pattaya to Bangkok & Temple Tour',
        morning_activity: 'Check-out from Pattaya; visit Gems Gallery en route to Bangkok.',
        afternoon_activity: 'Guided tour of Wat Traimit (Golden Buddha) and Wat Pho (Reclining Buddha).',
        evening_activity: 'Check in to Bangkok hotel; browse night street stalls in Sukhumvit.',
        breakfast: true, lunch: false, dinner: false,
        entries: [
          { name: 'Wat Traimit & Wat Pho Tour', time_label: '02:00 PM', description: 'Explore centuries-old gilded temples and giant Buddha statues.', icon_name: 'Landmark' },
        ],
      },
      {
        day_number: 4,
        title: 'Chao Phraya Princess Dinner Cruise',
        morning_activity: 'Free morning for shopping at Platinum Fashion Mall and MBK Center.',
        afternoon_activity: 'Explore ICONSIAM luxury mall along the riverside.',
        evening_activity: 'Luxurious evening dinner cruise on Chao Phraya Princess with live saxophone music.',
        breakfast: true, lunch: false, dinner: true,
        entries: [
          { name: 'Chao Phraya Luxury Dinner Cruise', time_label: '07:30 PM', description: 'Dine under illuminated temples along the river of kings.', icon_name: 'Ship' },
        ],
      },
      {
        day_number: 5,
        title: 'Bangkok Departure',
        morning_activity: 'Breakfast at hotel, free time for last-minute shopping.',
        afternoon_activity: 'Transfer to airport for return flight.',
        evening_activity: 'Arrive home.',
        breakfast: true, lunch: false, dinner: false,
        entries: [
          { name: 'Airport Drop-off', time_label: '12:00 PM', description: 'Private transfer to BKK airport.', icon_name: 'PlaneTakeoff' },
        ],
      },
    ],
    inclusions: [
      { item_text: '2 Nights in Pattaya + 2 Nights in Bangkok (4-star hotels)', icon_name: 'Hotel', is_included: true },
      { item_text: 'Daily buffet breakfast', icon_name: 'Utensils', is_included: true },
      { item_text: 'Coral Island tour by speedboat with lunch included', icon_name: 'Ship', is_included: true },
      { item_text: 'Alcazar Cabaret Show standard ticket', icon_name: 'Ticket', is_included: true },
      { item_text: 'Bangkok city and Golden Buddha temple tour', icon_name: 'Landmark', is_included: true },
      { item_text: 'Chao Phraya river dinner cruise with buffet', icon_name: 'Ship', is_included: true },
      { item_text: 'International flight tickets', icon_name: 'Plane', is_included: false },
      { item_text: 'Thailand tourist visa (if applicable)', icon_name: 'ShieldCheck', is_included: false },
    ],
    stay: {
      hotel_name: 'A-One The Royal Cruise Pattaya & Centara Watergate Bangkok',
      location: 'Pattaya Beach & Bangkok Central',
      rating: 4,
      room_type: 'Deluxe City View Room',
      amenities: ['Swimming Pool', 'Free WiFi', 'Rooftop Bar', 'Spa', 'Centrally Located'],
      image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
      check_in_date: 'Day 1',
      check_out_date: 'Day 5',
    },
    highlights: [
      'Speedboat excursion to Coral Island with turquoise swimming waters.',
      'VIP dinner cruise sailing past Wat Arun on Chao Phraya river.',
      'Visit Thailand’s sacred solid-gold Buddha at Wat Traimit.',
      'Unmatched budget value with high quality 4-star stays.',
    ],
    tips: [
      'Remove your shoes and dress respectfully before entering Buddhist temples.',
      'Negotiate tuk-tuk fares before getting in or use Grab ride app.',
      'Try the mouthwatering mango sticky rice at street night markets.',
    ],
    best_time: {
      month_start: 'November',
      month_end: 'April',
      description: 'Pleasant tropical weather with minimal rainfall and cool evenings.',
      weather_condition: 'Warm & clear skies',
    },
    places: [
      { place_name: 'Coral Island (Koh Larn)', description: 'Pristine beach island perfect for watersports.', distance_from_hotel: '7 km offshore', entry_fee: 'Included' },
      { place_name: 'Wat Pho', description: 'Ancient temple housing the colossal 46m Reclining Buddha.', distance_from_hotel: '6 km', entry_fee: 'Included' },
      { place_name: 'ICONSIAM', description: 'Mega riverside shopping complex with indoor floating market.', distance_from_hotel: '4 km', entry_fee: 'Free' },
    ],
    cancellation_rules: [
      { window_label: '30+ days before departure', refund_text: '100% refund' },
      { window_label: '14 to 29 days before departure', refund_text: '50% refund' },
      { window_label: 'Under 14 days before departure', refund_text: 'Non-refundable' },
    ],
    required_docs: [
      'Passport valid for at least 6 months',
      'Proof of confirmed return flight ticket',
      'Proof of accommodation bookings',
    ],
    reviews: [
      { reviewer_name: 'Karthik Raman', reviewer_email: 'karthik.r@example.com', rating: 5, review_text: 'Best value for money package! The Coral island boat ride and dinner cruise in Bangkok were unforgettable.' },
    ],
  },

  // 5. Paris
  {
    title: 'Parisian Romance & French Riviera Highlights',
    slug: 'paris-romantic-lights-and-culture',
    short_description: 'Eiffel Tower sunsets, Louvre art wonders, Seine champagne cruise and fairytale Versailles in 6 days.',
    full_description: 'Fall head over heels for the world’s capital of romance and culture. Walk hand-in-hand along grand Haussmann boulevards, admire the Mona Lisa at the Louvre, ascend the Eiffel Tower for golden-hour vistas, explore the gilded Hall of Mirrors at Palace of Versailles, and savor buttery croissants at quaint roadside cafes.',
    status: 'published',
    price_adult: 114999,
    price_child: 72999,
    price_infant: 14999,
    show_price: true,
    duration_days: 6,
    duration_nights: 5,
    difficulty_level: 'easy',
    group_size_min: 2,
    group_size_max: 14,
    age_restriction: 'All ages welcome',
    destination_name: 'Paris, France',
    destination_slug: 'paris',
    main_destination_lat: 48.8584,
    main_destination_lng: 2.2945,
    is_featured: true,
    is_trending: false,
    is_new: true,
    is_seasonal: false,
    is_best_seller: false,
    is_group_package: false,
    meta_title: 'Paris Holiday Package | Eiffel Tower, Louvre & Versailles',
    meta_description: 'Book a 6-day romantic Paris holiday: Eiffel Tower summit tickets, Seine River cruise, Louvre museum guided tour and Versailles palace.',
    meta_keywords: 'paris tour, eiffel tower, louvre museum, versailles palace, paris honeymoon',
    og_image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    category_slugs: ['cultural'],
    subcategory_slugs: ['honeymoon', 'luxury'],
    gallery: [
      { image_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80', is_cover: true },
      { image_url: 'https://images.unsplash.com/photo-1520939817895-060bdef4df1a?auto=format&fit=crop&w=1600&q=80', is_cover: false },
      { image_url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1600&q=80', is_cover: false },
    ],
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    itinerary: [
      {
        day_number: 1,
        title: 'Bienvenue à Paris & Romantic Seine Cruise',
        morning_activity: 'Arrival at Paris Charles de Gaulle (CDG) Airport; private luxury vehicle transfer.',
        afternoon_activity: 'Check-in to boutique hotel near Champs-Élysées; fresh café au lait and macarons.',
        evening_activity: 'Evening 1-hour Seine river cruise gliding past glowing illuminated monuments.',
        breakfast: false, lunch: false, dinner: true,
        entries: [
          { name: 'VIP CDG Airport Transfer', time_label: '11:00 AM', description: 'Private transfer directly to central hotel.', icon_name: 'Car' },
          { name: 'Illuminated Seine Cruise', time_label: '07:00 PM', description: 'Cruise under historic bridges with champagne glass.', icon_name: 'Ship' },
        ],
      },
      {
        day_number: 2,
        title: 'Eiffel Tower Summit & Montmartre Artists Quarter',
        morning_activity: 'Priority elevator ascent to the summit of Eiffel Tower.',
        afternoon_activity: 'Wander the cobbled streets of Montmartre up to Sacré-Cœur basilica.',
        evening_activity: 'Wine and French cheese tasting in a historic Latin Quarter bistro.',
        breakfast: true, lunch: false, dinner: true,
        entries: [
          { name: 'Eiffel Tower Summit Access', time_label: '09:30 AM', description: 'Stunning bird-eye panorama across all of Paris.', icon_name: 'Landmark' },
          { name: 'Sacré-Cœur & Place du Tertre', time_label: '03:00 PM', description: 'Watch portrait painters and browse bohemian art galleries.', icon_name: 'Camera' },
        ],
      },
      {
        day_number: 3,
        title: 'The Masterpieces of the Louvre & Tuileries Garden',
        morning_activity: 'Fast-track entrance to Louvre Museum with expert audio guide.',
        afternoon_activity: 'Stroll through the manicured Tuileries Gardens to Place de la Concorde.',
        evening_activity: 'Gourmet dinner overlooking the sparkling Arc de Triomphe.',
        breakfast: true, lunch: false, dinner: false,
        entries: [
          { name: 'Louvre Museum Guided Discovery', time_label: '10:00 AM', description: 'Admire the Mona Lisa, Venus de Milo and Winged Victory.', icon_name: 'Landmark' },
        ],
      },
      {
        day_number: 4,
        title: 'Royal Palace of Versailles Excursion',
        morning_activity: 'Morning private drive to the Sun King’s Palace of Versailles.',
        afternoon_activity: 'Marvel at the breathtaking Hall of Mirrors and royal landscaped gardens.',
        evening_activity: 'Return to Paris; evening free for shopping on Boulevard Haussmann.',
        breakfast: true, lunch: true, dinner: false,
        entries: [
          { name: 'Versailles Hall of Mirrors', time_label: '10:30 AM', description: 'Gilded Baroque splendour and manicured fountain grounds.', icon_name: 'Castle' },
        ],
      },
      {
        day_number: 5,
        title: 'Champs-Élysées & Latin Quarter Discovery',
        morning_activity: 'Walk down Avenue des Champs-Élysées and climb Arc de Triomphe.',
        afternoon_activity: 'Explore Shakespeare and Company bookstore and Notre-Dame cathedral square.',
        evening_activity: 'Romantic farewell candlelit dinner with traditional French delicacies.',
        breakfast: true, lunch: false, dinner: true,
        entries: [
          { name: 'Arc de Triomphe Rooftop', time_label: '11:00 AM', description: 'Stunning radial views of Paris avenues.', icon_name: 'Camera' },
        ],
      },
      {
        day_number: 6,
        title: 'Au Revoir Paris',
        morning_activity: 'Final Parisian breakfast with freshly baked baguettes.',
        afternoon_activity: 'Private transfer to airport for departure.',
        evening_activity: 'Flight home.',
        breakfast: true, lunch: false, dinner: false,
        entries: [
          { name: 'Airport Departure Transfer', time_label: '12:00 PM', description: 'Transfer to CDG airport.', icon_name: 'PlaneTakeoff' },
        ],
      },
    ],
    inclusions: [
      { item_text: '5 Nights 4-star boutique hotel in central Paris', icon_name: 'Hotel', is_included: true },
      { item_text: 'Daily French artisan breakfast', icon_name: 'Utensils', is_included: true },
      { item_text: 'Round-trip private airport transfers', icon_name: 'Car', is_included: true },
      { item_text: 'Eiffel Tower priority summit access tickets', icon_name: 'Ticket', is_included: true },
      { item_text: 'Louvre Museum fast-track admission ticket', icon_name: 'Ticket', is_included: true },
      { item_text: 'Palace of Versailles entry with audio tour and return transit', icon_name: 'Castle', is_included: true },
      { item_text: 'Seine River evening cruise with champagne', icon_name: 'Ship', is_included: true },
      { item_text: 'Schengen Visa fee and travel insurance', icon_name: 'ShieldCheck', is_included: false },
      { item_text: 'International flight tickets', icon_name: 'Plane', is_included: false },
    ],
    stay: {
      hotel_name: 'Pullman Paris Tour Eiffel / Hotel Rochester Champs Elysees',
      location: 'Central Paris, France',
      rating: 4,
      room_type: 'Classic Balcony Room',
      amenities: ['Eiffel Tower View', 'Free WiFi', 'Bar & Lounge', 'Fitness Center', 'Room Service'],
      image_url: 'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=1000&q=80',
      check_in_date: 'Day 1',
      check_out_date: 'Day 6',
    },
    highlights: [
      'Summit views from the Eiffel Tower overlooking the entire city.',
      'Skip-the-line entrance to the Louvre and Palace of Versailles.',
      'Romantic Seine river cruise with champagne under historic bridges.',
      'Stay in central Paris steps away from cafes and designer boutiques.',
    ],
    tips: [
      'Greet shopkeepers and cafe staff with a polite "Bonjour" before speaking.',
      'Comfortable walking shoes are essential for cobbles and museum galleries.',
      'Keep your belongings safe when using the Paris Metro.',
    ],
    best_time: {
      month_start: 'April',
      month_end: 'October',
      description: 'Spring blossoms and crisp golden autumn days make Paris glorious for walking and outdoor terraces.',
      weather_condition: 'Mild, pleasant & sunny',
    },
    places: [
      { place_name: 'Eiffel Tower', description: 'The 330m iron icon of France.', distance_from_hotel: '1 km', entry_fee: 'Included' },
      { place_name: 'Louvre Museum', description: 'The world’s largest and most famous art museum.', distance_from_hotel: '3 km', entry_fee: 'Included' },
      { place_name: 'Palace of Versailles', description: 'UNESCO world heritage royal estate with Hall of Mirrors.', distance_from_hotel: '20 km', entry_fee: 'Included' },
    ],
    cancellation_rules: [
      { window_label: '60+ days before departure', refund_text: '90% refund' },
      { window_label: '30 to 59 days before departure', refund_text: '50% refund' },
      { window_label: 'Under 30 days before departure', refund_text: 'Non-refundable' },
    ],
    required_docs: [
      'Valid Passport with at least 6 months validity',
      'Valid Schengen Tourist Visa',
      'Travel and medical insurance policy',
    ],
    reviews: [
      { reviewer_name: 'Meenakshi Sundaram', reviewer_email: 'meenakshi@example.com', rating: 5, review_text: 'Paris was pure poetry. The hotel was right by the Eiffel Tower and our tickets were completely pre-booked so zero waiting in lines!' },
    ],
  },

  // 6. Tokyo
  {
    title: 'Tokyo Neon Dreams & Mount Fuji Discovery',
    slug: 'tokyo-neon-dreams-and-mount-fuji',
    short_description: 'Bullet trains, ancient Shinto shrines, Akihabara tech marvels and majestic Mount Fuji vistas.',
    full_description: 'Step into the future while honoring centuries of samurai tradition. Cross Shibuya’s world-famous intersection, find inner tranquility at Meiji Shrine, ride the lightning-fast Shinkansen bullet train to Mount Fuji’s 5th station, taste melt-in-the-mouth sushi at Tsukiji, and explore Tokyo’s vibrant anime subcultures.',
    status: 'published',
    price_adult: 129999,
    price_child: 82999,
    price_infant: 17999,
    show_price: true,
    duration_days: 7,
    duration_nights: 6,
    difficulty_level: 'moderate',
    group_size_min: 2,
    group_size_max: 16,
    age_restriction: 'Suitable for ages 5+',
    destination_name: 'Tokyo, Japan',
    destination_slug: 'tokyo',
    main_destination_lat: 35.6586,
    main_destination_lng: 139.7454,
    is_featured: true,
    is_trending: true,
    is_new: true,
    is_seasonal: false,
    is_best_seller: false,
    is_group_package: true,
    meta_title: 'Tokyo Japan Tour Package | Mount Fuji & Bullet Train',
    meta_description: 'Book 7-day Tokyo Japan tour with Mount Fuji day excursion, Shinkansen train, Shibuya crossing, Akihabara and Asakusa temple.',
    meta_keywords: 'tokyo tour, mount fuji, shibuya crossing, japan bullet train, tokyo package',
    og_image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    category_slugs: ['cultural', 'mountain', 'adventure'],
    subcategory_slugs: ['group', 'luxury'],
    gallery: [
      { image_url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80', is_cover: true },
      { image_url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80', is_cover: false },
      { image_url: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1600&q=80', is_cover: false },
    ],
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    itinerary: [
      {
        day_number: 1,
        title: 'Arrival in Tokyo (Narita/Haneda)',
        morning_activity: 'Arrival in Tokyo; English-speaking assistant greeting at arrivals.',
        afternoon_activity: 'Airport Limousine Bus transfer to hotel in Shinjuku.',
        evening_activity: 'Night stroll among the neon-lit alleys of Omoide Yokocho.',
        breakfast: false, lunch: false, dinner: true,
        entries: [
          { name: 'Airport Welcome & Hotel Transfer', time_label: '02:00 PM', description: 'Assisted transit to central Shinjuku hotel.', icon_name: 'Car' },
        ],
      },
      {
        day_number: 2,
        title: 'Traditional Asakusa & Modern Shibuya',
        morning_activity: 'Visit Senso-ji temple and stroll Nakamise shopping street.',
        afternoon_activity: 'Visit Meiji Shrine surrounded by 170 acres of evergreen forest.',
        evening_activity: 'Cross Shibuya Crossing and see Hachiko statue.',
        breakfast: true, lunch: false, dinner: false,
        entries: [
          { name: 'Senso-ji Temple Discovery', time_label: '09:30 AM', description: 'Tokyo’s oldest temple founded in 645 AD.', icon_name: 'Landmark' },
          { name: 'Shibuya Crossing & Sky Deck', time_label: '05:00 PM', description: 'Experience the busiest pedestrian scramble crossing.', icon_name: 'Camera' },
        ],
      },
      {
        day_number: 3,
        title: 'Mount Fuji & Lake Ashi Bullet Train Tour',
        morning_activity: 'Drive up Mount Fuji to the 5th Station (2,300m above sea level).',
        afternoon_activity: 'Cruise across peaceful Lake Ashi and ride Komagatake ropeway.',
        evening_activity: 'Return to Tokyo aboard the high-speed Shinkansen bullet train.',
        breakfast: true, lunch: true, dinner: false,
        entries: [
          { name: 'Mount Fuji 5th Station', time_label: '11:00 AM', description: 'Panoramic views above the clouds on Japan’s sacred volcano.', icon_name: 'Mountain' },
          { name: 'Shinkansen Bullet Train Ride', time_label: '06:00 PM', description: 'Speed back to Tokyo at nearly 300 km/h.', icon_name: 'Car' },
        ],
      },
      {
        day_number: 4,
        title: 'Tsukiji Market & Akihabara Tech Town',
        morning_activity: 'Fresh seafood tasting tour at Tsukiji Outer Market.',
        afternoon_activity: 'Explore electronics and gaming paradise Akihabara Electric Town.',
        evening_activity: 'Stroll through upscale Ginza for dining and shopping.',
        breakfast: true, lunch: true, dinner: false,
        entries: [
          { name: 'Tsukiji Food Walk', time_label: '09:00 AM', description: 'Taste fresh tamagoyaki, wagyu skewers and sushi.', icon_name: 'Utensils' },
        ],
      },
      {
        day_number: 5,
        title: 'TeamLab Planets & Odaiba Bay',
        morning_activity: 'Immerse your senses inside TeamLab Planets digital art museum.',
        afternoon_activity: 'Explore futuristic Odaiba island and see life-size Unicorn Gundam statue.',
        evening_activity: 'Rainbow Bridge sunset view across Tokyo Bay.',
        breakfast: true, lunch: false, dinner: false,
        entries: [
          { name: 'TeamLab Planets Digital Museum', time_label: '10:00 AM', description: 'Wade through water and infinite crystal light installations.', icon_name: 'Sparkles' },
        ],
      },
      {
        day_number: 6,
        title: 'Day Trip to Kamakura Ancient Capital',
        morning_activity: 'Scenic train ride to coastal Kamakura; visit the Great Bronze Buddha.',
        afternoon_activity: 'Hase-dera temple gardens overlooking the Pacific Ocean.',
        evening_activity: 'Celebratory Japanese Izakaya farewell dinner.',
        breakfast: true, lunch: false, dinner: true,
        entries: [
          { name: 'Kamakura Great Buddha (Kotoku-in)', time_label: '11:00 AM', description: 'Monumental 13m outdoor bronze Buddha statue.', icon_name: 'Landmark' },
        ],
      },
      {
        day_number: 7,
        title: 'Sayonara Japan',
        morning_activity: 'Japanese breakfast and checkout.',
        afternoon_activity: 'Airport Limousine transfer to Narita or Haneda Airport.',
        evening_activity: 'Return flight.',
        breakfast: true, lunch: false, dinner: false,
        entries: [
          { name: 'Airport Limousine Bus Transfer', time_label: '12:00 PM', description: 'Direct transit to airport.', icon_name: 'PlaneTakeoff' },
        ],
      },
    ],
    inclusions: [
      { item_text: '6 Nights 4-star hotel accommodation in Shinjuku / Tokyo', icon_name: 'Hotel', is_included: true },
      { item_text: 'Daily Japanese & Continental breakfast', icon_name: 'Utensils', is_included: true },
      { item_text: 'Round-trip airport limousine transfers', icon_name: 'Car', is_included: true },
      { item_text: 'Mount Fuji 5th station + Lake Ashi cruise + Shinkansen bullet train ticket', icon_name: 'Ticket', is_included: true },
      { item_text: 'TeamLab Planets digital art museum ticket', icon_name: 'Ticket', is_included: true },
      { item_text: 'Kamakura ancient capital day trip with rail pass', icon_name: 'Car', is_included: true },
      { item_text: 'Japan Tourist Visa fees', icon_name: 'ShieldCheck', is_included: false },
      { item_text: 'International flight tickets', icon_name: 'Plane', is_included: false },
    ],
    stay: {
      hotel_name: 'Keio Plaza Hotel Tokyo / Shinjuku Granbell',
      location: 'Shinjuku, Tokyo',
      rating: 4,
      room_type: 'Superior Twin / Double Room',
      amenities: ['Skyline Views', 'Free High Speed WiFi', 'Multiple Restaurants', 'Metro Accessible'],
      image_url: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1000&q=80',
      check_in_date: 'Day 1',
      check_out_date: 'Day 7',
    },
    highlights: [
      'Mount Fuji day tour including Lake Ashi cruise and Shinkansen ride.',
      'Sensory overload at TeamLab Planets digital art museum.',
      'Tokyo’s top contrasts: ancient Asakusa Sensoji vs electric Shibuya Crossing.',
      'Tsukiji food tour tasting fresh Japanese delicacies.',
    ],
    tips: [
      'Cash is still preferred in small ramen shops and traditional bakeries.',
      'Japan is punctilious about timing; trains depart to the exact second.',
      'Tipping is not customary in Japan and may cause confusion.',
    ],
    best_time: {
      month_start: 'March',
      month_end: 'May',
      description: 'Cherry blossom season (Sakura) in spring and vibrant red maple leaves in autumn.',
      weather_condition: 'Crisp, sunny & scenic',
    },
    places: [
      { place_name: 'Mount Fuji & Lake Ashi', description: 'Japan’s iconic snow-capped volcanic peak.', distance_from_hotel: '100 km', entry_fee: 'Included' },
      { place_name: 'Shibuya Crossing', description: 'World-famous buzzing multi-directional intersection.', distance_from_hotel: '4 km', entry_fee: 'Free' },
      { place_name: 'Senso-ji Temple', description: 'Sacred Buddhist temple in traditional Asakusa.', distance_from_hotel: '8 km', entry_fee: 'Free' },
    ],
    cancellation_rules: [
      { window_label: '45+ days before departure', refund_text: '80% refund' },
      { window_label: '20 to 44 days before departure', refund_text: '40% refund' },
      { window_label: 'Under 20 days before departure', refund_text: 'Non-refundable' },
    ],
    required_docs: [
      'Passport valid for at least 6 months past departure date',
      'Japan Tourist eVisa or Embassy Visa sticker',
      'Visit Japan Web QR codes for immigration and customs',
    ],
    reviews: [
      { reviewer_name: 'Devendra Joshi', reviewer_email: 'dev.joshi@example.com', rating: 5, review_text: 'Japan was an extraordinary experience! Seeing Mt. Fuji in clear weather was breathtaking. The bullet train was super fast.' },
    ],
  },
];

async function seedPackages() {
  console.log('🚀 Starting Tour Package Seed...\n');

  // Fetch category, subcategory and destination maps
  console.log('🔍 Fetching taxonomy metadata from database...');
  const { data: categories, error: catErr } = await supabase.from('categories').select('id, slug, name');
  if (catErr) throw catErr;

  const { data: subcategories, error: subErr } = await supabase.from('subcategories').select('id, slug, name');
  if (subErr) throw subErr;

  const { data: destinations, error: destErr } = await supabase.from('destinations').select('id, slug, name');
  if (destErr) throw destErr;

  const categoryMap = new Map((categories || []).map((c) => [c.slug, c.id]));
  const subcategoryMap = new Map((subcategories || []).map((s) => [s.slug, s.id]));
  const destinationMap = new Map((destinations || []).map((d) => [d.slug, d.id]));

  console.log(`   Found ${categoryMap.size} categories, ${subcategoryMap.size} subcategories, and ${destinationMap.size} destinations.\n`);

  const slugsToDelete = PACKAGES_DATA.map((p) => p.slug);
  console.log(`🧹 Cleaning prior seeded dummy packages (${slugsToDelete.length} slugs)...`);
  const { error: delErr } = await supabase.from('packages').delete().in('slug', slugsToDelete);
  if (delErr) {
    console.warn('   Note on cleanup:', delErr.message);
  } else {
    console.log('   Prior dummy packages cleaned up successfully.');
  }

  console.log('\n📦 Inserting dummy packages...');

  let successCount = 0;

  for (const pkg of PACKAGES_DATA) {
    console.log(`\n👉 Processing package: "${pkg.title}" (${pkg.slug})`);

    // 1. Insert package row
    const { data: insertedPkg, error: pkgErr } = await supabase
      .from('packages')
      .insert({
        title: pkg.title,
        slug: pkg.slug,
        short_description: pkg.short_description,
        full_description: pkg.full_description,
        status: pkg.status,
        price_adult: pkg.price_adult,
        price_child: pkg.price_child,
        price_infant: pkg.price_infant,
        show_price: pkg.show_price,
        duration_days: pkg.duration_days,
        duration_nights: pkg.duration_nights,
        difficulty_level: pkg.difficulty_level,
        group_size_min: pkg.group_size_min,
        group_size_max: pkg.group_size_max,
        age_restriction: pkg.age_restriction,
        destination_name: pkg.destination_name,
        main_destination_lat: pkg.main_destination_lat,
        main_destination_lng: pkg.main_destination_lng,
        is_featured: pkg.is_featured,
        is_trending: pkg.is_trending,
        is_new: pkg.is_new,
        is_seasonal: pkg.is_seasonal,
        is_best_seller: pkg.is_best_seller,
        is_group_package: pkg.is_group_package,
        meta_title: pkg.meta_title.slice(0, 60),
        meta_description: pkg.meta_description.slice(0, 160),
        meta_keywords: pkg.meta_keywords,
        og_image: pkg.og_image,
      })
      .select('id')
      .single();

    if (pkgErr || !insertedPkg) {
      console.error(`❌ Failed to insert package "${pkg.title}":`, pkgErr);
      continue;
    }

    const packageId = insertedPkg.id;

    // 2. Link categories
    const catInserts = pkg.category_slugs
      .map((slug) => categoryMap.get(slug))
      .filter((id): id is string => Boolean(id))
      .map((catId) => ({ package_id: packageId, category_id: catId }));

    if (catInserts.length > 0) {
      await supabase.from('package_categories').insert(catInserts);
    }

    // 3. Link subcategories
    const subInserts = pkg.subcategory_slugs
      .map((slug) => subcategoryMap.get(slug))
      .filter((id): id is string => Boolean(id))
      .map((subId) => ({ package_id: packageId, subcategory_id: subId }));

    if (subInserts.length > 0) {
      await supabase.from('package_subcategories').insert(subInserts);
    }

    // 4. Link destination (if matched)
    if (pkg.destination_slug && destinationMap.has(pkg.destination_slug)) {
      const destId = destinationMap.get(pkg.destination_slug)!;
      await supabase.from('package_destinations').insert({
        package_id: packageId,
        destination_id: destId,
      });
    }

    // 5. Gallery
    if (pkg.gallery && pkg.gallery.length > 0) {
      const galleryRows = pkg.gallery.map((g, idx) => ({
        package_id: packageId,
        image_url: g.image_url,
        is_cover: g.is_cover,
        display_order: idx,
      }));
      await supabase.from('package_gallery').insert(galleryRows);
    }

    // 6. Video
    if (pkg.video_url) {
      await supabase.from('package_videos').insert({
        package_id: packageId,
        video_url: pkg.video_url,
        display_order: 0,
      });
    }

    // 7. Itinerary days & entries
    if (pkg.itinerary && pkg.itinerary.length > 0) {
      for (const day of pkg.itinerary) {
        const { data: insertedDay, error: dayErr } = await supabase
          .from('itinerary_days')
          .insert({
            package_id: packageId,
            day_number: day.day_number,
            title: day.title,
            morning_activity: day.morning_activity,
            afternoon_activity: day.afternoon_activity,
            evening_activity: day.evening_activity,
            breakfast: day.breakfast,
            lunch: day.lunch,
            dinner: day.dinner,
          })
          .select('id')
          .single();

        if (dayErr || !insertedDay) {
          console.warn(`   Warning: Day ${day.day_number} failed:`, dayErr?.message);
          continue;
        }

        if (day.entries && day.entries.length > 0) {
          const entryRows = day.entries.map((entry, idx) => ({
            itinerary_day_id: insertedDay.id,
            name: entry.name,
            time_label: entry.time_label || null,
            description: entry.description,
            icon_name: entry.icon_name || 'MapPin',
            image_url: entry.image_url || null,
            display_order: idx,
          }));
          await supabase.from('itinerary_entries').insert(entryRows);
        }
      }
    }

    // 8. Inclusions & Exclusions
    if (pkg.inclusions && pkg.inclusions.length > 0) {
      const incRows = pkg.inclusions.map((inc, idx) => ({
        package_id: packageId,
        item_text: inc.item_text,
        icon_name: inc.icon_name,
        is_included: inc.is_included,
        display_order: idx,
      }));
      await supabase.from('package_inclusions').insert(incRows);
    }

    // 9. Stay details
    if (pkg.stay) {
      await supabase.from('stay_details').insert({
        package_id: packageId,
        hotel_name: pkg.stay.hotel_name,
        location: pkg.stay.location,
        rating: pkg.stay.rating,
        room_type: pkg.stay.room_type,
        amenities: pkg.stay.amenities,
        image_url: pkg.stay.image_url,
        check_in_date: pkg.stay.check_in_date,
        check_out_date: pkg.stay.check_out_date,
        display_order: 0,
      });
    }

    // 10. Highlights
    if (pkg.highlights && pkg.highlights.length > 0) {
      const hRows = pkg.highlights.map((hl, idx) => ({
        package_id: packageId,
        highlight_text: hl,
        display_order: idx,
      }));
      await supabase.from('package_highlights').insert(hRows);
    }

    // 11. Tips
    if (pkg.tips && pkg.tips.length > 0) {
      const tRows = pkg.tips.map((tip, idx) => ({
        package_id: packageId,
        tip_text: tip,
        display_order: idx,
      }));
      await supabase.from('travel_tips').insert(tRows);
    }

    // 12. Best time to visit
    if (pkg.best_time) {
      await supabase.from('best_time_to_visit').insert({
        package_id: packageId,
        month_start: pkg.best_time.month_start,
        month_end: pkg.best_time.month_end,
        description: pkg.best_time.description,
        weather_condition: pkg.best_time.weather_condition,
      });
    }

    // 13. Places to visit
    if (pkg.places && pkg.places.length > 0) {
      const pRows = pkg.places.map((place) => ({
        package_id: packageId,
        place_name: place.place_name,
        description: place.description,
        distance_from_hotel: place.distance_from_hotel,
        entry_fee: place.entry_fee,
      }));
      await supabase.from('places_to_visit').insert(pRows);
    }

    // 14. Cancellation policies
    if (pkg.cancellation_rules && pkg.cancellation_rules.length > 0) {
      const cRows = pkg.cancellation_rules.map((rule, idx) => ({
        package_id: packageId,
        window_label: rule.window_label,
        refund_text: rule.refund_text,
        display_order: idx,
      }));
      await supabase.from('cancellation_policies').insert(cRows);
    }

    // 15. Required documents
    if (pkg.required_docs && pkg.required_docs.length > 0) {
      const dRows = pkg.required_docs.map((doc, idx) => ({
        package_id: packageId,
        document_text: doc,
        display_order: idx,
      }));
      await supabase.from('required_documents').insert(dRows);
    }

    // 16. Reviews
    if (pkg.reviews && pkg.reviews.length > 0) {
      const rRows = pkg.reviews.map((rev) => ({
        package_id: packageId,
        reviewer_name: rev.reviewer_name,
        reviewer_email: rev.reviewer_email,
        rating: rev.rating,
        review_text: rev.review_text,
        is_approved: true,
      }));
      await supabase.from('reviews').insert(rRows);
    }

    console.log(`   ✅ Successfully created package with gallery, itinerary, stay, inclusions & reviews.`);
    successCount++;
  }

  console.log(`\n🎉 Seed completed! Successfully seeded ${successCount} of ${PACKAGES_DATA.length} packages.`);
}

seedPackages()
  .then(() => {
    console.log('\n✨ Database is now populated with rich dummy packages!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('💥 Error seeding packages:', err);
    process.exit(1);
  });
