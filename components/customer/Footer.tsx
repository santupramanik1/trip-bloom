'use client';

import { useState, type ComponentType, type SVGProps } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Clock } from 'lucide-react';
import { usePublicSiteSettings } from '@/lib/hooks/useSiteSettings';
import { useNavCategories } from '@/lib/hooks/useNavCategories';
import { useCategories } from '@/lib/hooks/useCategories';
import { useDestinations } from '@/lib/hooks/useDestinations';
import AllCategoriesModal from '@/components/customer/AllCategoriesModal';

interface FooterLink {
  label: string;
  href: string;
}

const MAX_FOOTER_CATEGORIES = 6;
const MAX_FOOTER_DESTINATIONS = 6;

const QUICK_LINKS: FooterLink[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Packages', href: '/packages' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Visa Services', href: '/visa' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
];

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const LinkedinIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const WhatsAppIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.945c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 005.683 1.448h.005c6.581 0 11.94-5.359 11.943-11.945A11.821 11.821 0 0020.52 3.45" />
  </svg>
);

const SOCIAL_DEFS: { label: string; Icon: IconType; defaultUrl: string }[] = [
  { label: 'LinkedIn', Icon: LinkedinIcon, defaultUrl: 'https://www.linkedin.com/in/santu-pramanik/' },
];

interface ContactItem {
  Icon: IconType;
  label: string;
  value: string;
  href?: string;
}


function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-white flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
      {children}
    </h3>
  );
}

function FooterNavLink({ link }: { link: FooterLink }) {
  return (
    <Link
      href={link.href}
      className="group inline-flex items-center gap-1.5 text-sm text-white/75 transition-all duration-300 hover:text-white hover:translate-x-1"
    >
      <span className="text-white/40 group-hover:text-amber-400 transition-colors">›</span>
      <span>{link.label}</span>
    </Link>
  );
}

function ExploreRow({
  label,
  links,
  isLoading,
  viewAll,
  onViewAll,
}: {
  label: string;
  links: FooterLink[];
  isLoading: boolean;
  viewAll: FooterLink;
  onViewAll?: () => void;
}) {
  const viewAllClasses =
    'ml-1 text-xs font-bold uppercase tracking-wider text-amber-300 transition-colors hover:text-amber-200';

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
      <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300 sm:w-28">
        {label}
      </span>

      <div className="flex flex-wrap items-center gap-2">
        {isLoading ? (
          <span className="sr-only">Loading {label.toLowerCase()}</span>
        ) : (
          links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/85 transition-colors hover:border-amber-400/60 hover:bg-white/15 hover:text-white"
            >
              {link.label}
            </Link>
          ))
        )}

        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              aria-hidden="true"
              className="h-7 w-24 animate-pulse rounded-full bg-white/10"
            />
          ))}

        {onViewAll ? (
          <button type="button" onClick={onViewAll} className={viewAllClasses}>
            {viewAll.label} →
          </button>
        ) : (
          <Link href={viewAll.href} className={viewAllClasses}>
            {viewAll.label} →
          </Link>
        )}
      </div>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Contact details + social links are admin-managed (Admin → Settings) and read
  // from the single site-settings row, so the footer stays in sync with them.
  const { data: siteSettings } = usePublicSiteSettings();

  const linkedinHref =
    siteSettings?.linkedin_url?.trim() || 'https://www.linkedin.com/in/santu-pramanik/';

  const socialLinks = [
    {
      label: 'LinkedIn',
      Icon: LinkedinIcon,
      href: linkedinHref,
    },
  ];

  const addressValue = siteSettings?.address || 'Bengaluru, Karnataka 560024';
  const emailValue = siteSettings?.contact_email || 'santu700141@gmail.com';

  const contactDetails: ContactItem[] = [
    {
      Icon: WhatsAppIcon,
      label: 'WhatsApp',
      value: '+91 9832487454',
      href: `https://wa.me/919832487454?text=${encodeURIComponent("Hi, I'm interested in your travel packages.")}`,
    },
    {
      Icon: Mail,
      label: 'Email',
      value: emailValue,
      href: `mailto:${emailValue}`,
    },
    {
      Icon: MapPin,
      label: 'Office',
      value: addressValue,
    },
    {
      Icon: Clock,
      label: 'Working Hours',
      value: 'Mon – Sat: 9:00 AM – 7:00 PM',
    },
  ];

  // The same categories the navbar shows, so the two menus never drift apart.
  const { data: navCategories, isLoading: categoriesLoading } = useNavCategories();
  const { data: destinations, isLoading: destinationsLoading } = useDestinations();

  const { data: allCategories } = useCategories();
  const [showAllCategories, setShowAllCategories] = useState(false);

  const categoryLinks: FooterLink[] = (navCategories ?? [])
    .slice(0, MAX_FOOTER_CATEGORIES)
    .map((category) => ({
      label: category.name,
      href: `/categories/${category.slug}`,
    }));

  // Real destination pages, not the query-string filter the old hardcoded list used.
  const destinationLinks: FooterLink[] = (destinations ?? [])
    .slice(0, MAX_FOOTER_DESTINATIONS)
    .map((destination) => ({
      label: destination.name,
      href: `/destinations/${destination.slug}`,
    }));

  return (
    <footer aria-labelledby="footer-heading" className="bg-brand-footer text-white relative overflow-hidden border-t border-white/10">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      {/* Decorative ambient background blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
          
          {/* ---------------- Column 1: Company Info (4 Cols) ---------------- */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <Link href="/" className="mb-4 inline-flex items-center gap-3 group" aria-label="TripBloom home">
                <Image
                  src="/logo.png"
                  alt="TripBloom"
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover border-2 border-white/50 shadow-md group-hover:scale-105 transition-transform"
                />
                <div>
                  <span className="text-xl font-black text-white tracking-wide">TripBloom</span>
                  <p className="text-[11px] text-white/70 font-medium">Explore Your Next Adventure</p>
                </div>
              </Link>
              <p className="text-sm leading-relaxed text-white/80 font-medium max-w-sm mt-3">
                Crafting unforgettable journeys across India and the world. From dreamy beaches to soaring mountains, we design travel experiences tailored precisely to your soul.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-3">Connect With Us</p>
              <ul className="flex items-center gap-2.5">
                {socialLinks.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${label}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-brand-accent hover:text-brand-forest shadow-sm"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ---------------- Column 2: Quick Links (4 Cols) ---------------- */}
          <nav aria-label="Quick links" className="lg:col-span-4">
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul className="flex flex-col gap-2.5 mt-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterNavLink link={link} />
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------------- Column 3: Contact (4 Cols) ---------------- */}
          <div className="lg:col-span-4">
            <ColumnHeading>Get In Touch</ColumnHeading>
            <ul className="flex flex-col gap-3 text-xs text-white/80 mt-2 font-medium">
              {contactDetails.map(({ Icon, label, value, href }) => (
                <li key={value} className="flex items-start gap-2.5">
                  <Icon className="h-3.5 w-3.5 text-amber-300 shrink-0 mt-0.5" />
                  <span>
                    <span className="block text-[10px] uppercase tracking-wider text-white/50">
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="hover:text-white transition-colors underline decoration-white/30"
                      >
                        {value}
                      </a>
                    ) : (
                      <span>{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* -------- Explore band: a taste of what we run, not the whole index -------- */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.2em] text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Explore
          </p>

          <div className="flex flex-col gap-4">
            <ExploreRow
              label="Categories"
              links={categoryLinks}
              isLoading={categoriesLoading}
              viewAll={{ label: 'All categories', href: '/packages' }}
              onViewAll={() => setShowAllCategories(true)}
            />
            <ExploreRow
              label="Destinations"
              links={destinationLinks}
              isLoading={destinationsLoading}
              viewAll={{ label: 'All destinations', href: '/destinations' }}
            />
          </div>
        </div>
      </div>

      {/* ---------------- Bottom Bar ---------------- */}
      <div className="border-t border-white/10 bg-brand-footer-deep">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 sm:px-6 lg:px-8 py-6 text-xs text-white/70 sm:flex-row sm:justify-between font-medium">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <p>
              &copy; {currentYear} TripBloom. All Rights Reserved.
            </p>
            <span className="hidden sm:inline text-white/30">•</span>
            <p>
              Developed by developer{' '}
              <a
                href="https://www.linkedin.com/in/santu-pramanik/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-amber-300 hover:text-amber-200 underline decoration-amber-400/50 hover:decoration-amber-300 transition-colors"
              >
                Santu Pramanik
              </a>
            </p>
          </div>

          <nav aria-label="Legal" className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors"
            >
              Terms &amp; Conditions
            </Link>
          </nav>
        </div>
      </div>

      {/* Portals to <body>, so the dark footer's stacking context doesn't trap it. */}
      <AllCategoriesModal
        open={showAllCategories}
        categories={allCategories ?? []}
        onClose={() => setShowAllCategories(false)}
      />
    </footer>
  );
}