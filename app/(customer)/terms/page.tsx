import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';
import TermsClient from './TermsClient';

export const metadata: Metadata = createMetadata({
  title: 'Terms & Conditions | TripBloom',
  description: 'Read the terms of use, booking policies, and legal guidelines for the TripBloom website before scheduling your next journey.',
  path: '/terms',
});

export default function TermsPage() {
  return <TermsClient />;
}

