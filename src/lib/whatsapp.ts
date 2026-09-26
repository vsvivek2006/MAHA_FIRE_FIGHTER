/**
 * Helper to construct WhatsApp (wa.me) pre-filled redirection links.
 * wa.me requires a clean phone number with country code (e.g. 919873514657)
 * without leading '+' or '0'.
 */
export function buildWhatsAppLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
