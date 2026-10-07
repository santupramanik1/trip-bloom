/**
 * Seed Dummy Testimonials for TripBloom / Travel Carvers
 * 
 * Creates realistic, high-quality customer testimonials and reviews,
 * including customer names, roles/locations, feedback, ratings, and avatar photos.
 * 
 * Run with:
 *   npm run seed:testimonials
 * or:
 *   npx tsx scripts/seed-testimonials.ts
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

interface DummyTestimonial {
  customer_name: string;
  customer_role: string;
  review_text: string;
  rating: number;
  photo_url: string;
  is_featured: boolean;
  display_order: number;
}

const TESTIMONIALS_DATA: DummyTestimonial[] = [
  {
    customer_name: 'Priya & Rohan Mehta',
    customer_role: 'Honeymoon Couple, Mumbai',
    review_text: 'Our Bali honeymoon booked through TripBloom was beyond our wildest dreams. The private pool villa in Ubud, sunset dinner on Uluwatu cliffs, and seamless private transfers made it completely stress-free!',
    rating: 5,
    photo_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    is_featured: true,
    display_order: 1,
  },
  {
    customer_name: 'Vikram Singhania',
    customer_role: 'Family Traveler, New Delhi',
    review_text: 'Took our two kids to Dubai for 5 days. The desert safari dune bashing, Burj Khalifa fast-track tickets, and marina dhow cruise were executed with military precision. Highly recommended for families!',
    rating: 5,
    photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    is_featured: true,
    display_order: 2,
  },
  {
    customer_name: 'Ananya Deshmukh',
    customer_role: 'Solo Explorer & Blogger, Pune',
    review_text: 'Travelling solo to Tokyo seemed daunting at first, but TripBloom arranged English-speaking coordinators, pocket WiFi, and incredible cultural tours to Mt. Fuji and Shibuya. Felt 100% safe throughout.',
    rating: 5,
    photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    is_featured: true,
    display_order: 3,
  },
  {
    customer_name: 'Rajesh & Sunita Iyer',
    customer_role: 'Anniversary Holiday, Chennai',
    review_text: 'Celebrated our 25th wedding anniversary in Paris. The Seine river champagne cruise and Eiffel Tower summit tour were memories we will cherish forever. Outstanding customer support!',
    rating: 5,
    photo_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    is_featured: true,
    display_order: 4,
  },
  {
    customer_name: 'Kunal Verma & Friends',
    customer_role: 'Group Adventure, Bengaluru',
    review_text: 'A group of 8 friends on the Bangkok & Pattaya fiesta tour. The speedboat to Coral Island and night street food crawls were insane. Great budget pricing without compromising hotel comfort!',
    rating: 5,
    photo_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    is_featured: true,
    display_order: 5,
  },
  {
    customer_name: 'Dr. Aris Thorne',
    customer_role: 'Luxury Traveler, London',
    review_text: 'The bespoke itinerary curated for Singapore was pristine. From Marina Bay Sands SkyPark to Universal Studios VIP passes, every element was tailored to perfection.',
    rating: 5,
    photo_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    is_featured: true,
    display_order: 6,
  },
  {
    customer_name: 'Shalini Nair',
    customer_role: 'Nature & Wildlife Enthusiast, Kochi',
    review_text: 'Everything ran right on schedule. The local tour guides were remarkably knowledgeable and courteous. Would definitely book my next international holiday with TripBloom.',
    rating: 4,
    photo_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    is_featured: true,
    display_order: 7,
  },
  {
    customer_name: 'Devendra Joshi',
    customer_role: 'Corporate Offsite Coordinator, Hyderabad',
    review_text: 'Organized a 20-person corporate offsite tour to Dubai. Seamless coordination, delicious dining choices, and punctual luxury coaches throughout the entire stay.',
    rating: 5,
    photo_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    is_featured: false,
    display_order: 8,
  },
  {
    customer_name: 'Tarun Bhatia',
    customer_role: 'Weekend Traveler, Chandigarh',
    review_text: 'Very comfortable hotel stays and prompt customer service whenever we had questions during our journey. Looking forward to our next holiday!',
    rating: 4,
    photo_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    is_featured: false,
    display_order: 9,
  },
];

async function seedTestimonials() {
  console.log('🚀 Starting Testimonials Seed...\n');

  const namesToDelete = TESTIMONIALS_DATA.map((t) => t.customer_name);
  console.log(`🧹 Cleaning prior dummy testimonials (${namesToDelete.length} records)...`);
  const { error: delErr } = await supabase
    .from('testimonials')
    .delete()
    .in('customer_name', namesToDelete);

  if (delErr) {
    console.warn('   Note on cleanup:', delErr.message);
  } else {
    console.log('   Prior dummy testimonials cleaned up successfully.');
  }

  console.log('\n💬 Inserting dummy testimonials...');

  const { data: inserted, error: insertErr } = await supabase
    .from('testimonials')
    .insert(TESTIMONIALS_DATA)
    .select('id, customer_name, rating, is_featured');

  if (insertErr) {
    console.error('❌ Error inserting testimonials:', insertErr);
    process.exit(1);
  }

  console.log(`\n✅ Successfully inserted ${inserted?.length || 0} testimonials:`);
  inserted?.forEach((t, i) => {
    const starStr = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating);
    const featuredTag = t.is_featured ? '[FEATURED / PUBLIC]' : '[DRAFT / ADMIN ONLY]';
    console.log(`   ${i + 1}. ${t.customer_name} ${starStr} ${featuredTag}`);
  });

  console.log('\n✨ Testimonials seeding completed successfully!');
}

seedTestimonials()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error('💥 Testimonials seed failed:', err);
    process.exit(1);
  });
