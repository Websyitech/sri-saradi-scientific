// A/B test switch: when NEXT_PUBLIC_GENOMIC_PRICE_ON_REQUEST=1 the /genomic page hides the price and
// online checkout and asks visitors to get the price on WhatsApp instead. Unset (or any other value)
// restores the normal priced page. NEXT_PUBLIC_ values are baked in at build time, so rebuild after changing it.
export const PRICE_ON_REQUEST = process.env.NEXT_PUBLIC_GENOMIC_PRICE_ON_REQUEST === '1';

export const PRICE_WHATSAPP_URL =
  'https://wa.me/917207607444?text=' +
  encodeURIComponent('Hi, please share the price of the Solarbio D1800 Blood Genomic DNA Extraction Kit (100T).');
