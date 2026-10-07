/**
 * Contact channels, read from the environment rather than written into components.
 *
 * `NEXT_PUBLIC_` because the WhatsApp link is built in the browser. The value is a public
 * business number that already appears on the contact page — nothing secret lives here.
 */

/** wa.me wants digits only: no `+`, spaces, dashes or parentheses. */
function toWhatsAppDigits(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length === 10 && /^[6-9]/.test(digits)) {
    return `91${digits}`;
  }
  return digits;
}

const RAW_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919832487454';

export const CONTACT = {
  /** Digits-only WhatsApp number, or '' when unconfigured (the button then hides). */
  whatsAppNumber: toWhatsAppDigits(RAW_WHATSAPP_NUMBER),
  phoneNumber: process.env.NEXT_PUBLIC_PHONE_NUMBER || '+91 9832487454',
} as const;

export const WHATSAPP_MESSAGES = {
  default: "Hi, I'm interested in your travel packages.",
  /** Used on a package page so the enquiry arrives with context. */
  package: (packageName: string) =>
    `Hi, I'm interested in the '${packageName}' package. Please share more details.`,
} as const;

/**
 * A wa.me deep link with the message pre-filled. Returns null when no number is
 * configured, so callers can render nothing rather than a dead link.
 */
export function whatsAppUrl(message: string): string | null {
  if (!CONTACT.whatsAppNumber) return null;
  return `https://wa.me/${CONTACT.whatsAppNumber}?text=${encodeURIComponent(message)}`;
}
