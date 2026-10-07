/**
 * Quick script to update site settings in Supabase with Santu Pramanik's contact details.
 * 
 * Run with:
 *   npx tsx scripts/update-contact.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { resolve } from 'path';

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
  } catch {}
  dotenv.config({ path: '.env.local' });
  dotenv.config();
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function updateContactSettings() {
  console.log('🔄 Updating contact settings in Supabase...');

  const newSettings = {
    contact_phone: '+91 9832487454',
    address: 'Bengaluru, Karnataka 560024',
    linkedin_url: 'https://www.linkedin.com/in/santu-pramanik/',
    facebook_url: '',
    instagram_url: '',
    twitter_url: '',
  };

  const { data: existing } = await supabase.from('site_settings').select('id').limit(1);

  if (existing && existing.length > 0) {
    const { error } = await supabase
      .from('site_settings')
      .update(newSettings)
      .eq('id', existing[0].id);
    if (error) throw error;
    console.log('✅ Updated existing site_settings record in Supabase.');
  } else {
    const { error } = await supabase.from('site_settings').insert({
      company_name: 'TripBloom',
      contact_email: 'info@travelcarvers.in',
      show_prices_globally: true,
      ...newSettings,
    });
    if (error) throw error;
    console.log('✅ Inserted new site_settings record into Supabase.');
  }

  console.log('🎉 Contact details updated:');
  console.log('   - Phone: +91 9832487454');
  console.log('   - Address: Bengaluru, Karnataka 560024');
  console.log('   - WhatsApp: +91 9832487454');
  console.log('   - Social: LinkedIn (https://www.linkedin.com/in/santu-pramanik/) only');
}

updateContactSettings()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Failed to update contact settings:', err);
    process.exit(1);
  });
