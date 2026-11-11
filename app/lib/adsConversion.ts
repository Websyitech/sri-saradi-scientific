'use client';

type Gtag = (...args: unknown[]) => void;

/**
 * Report a Google Ads conversion once per reference (order/enquiry id).
 * Does nothing unless NEXT_PUBLIC_GOOGLE_ADS_ID and the given label are set.
 * Waits briefly for gtag.js, which loads after the page becomes interactive.
 */
export function reportAdsConversion(opts: {
  label: string | undefined;
  transactionId: string;
  value?: number;
  currency?: string;
}) {
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  if (!adsId || !opts.label || !opts.transactionId || typeof window === 'undefined') return;

  const key = `ads_conv_${opts.label}_${opts.transactionId}`;
  try {
    if (window.sessionStorage.getItem(key)) return;
  } catch {
    /* storage unavailable: Google still de-duplicates by transaction_id */
  }

  let tries = 0;
  const send = () => {
    const gtag = (window as unknown as { gtag?: Gtag }).gtag;
    if (!gtag) {
      if (tries++ < 40) window.setTimeout(send, 250);
      return;
    }
    gtag('event', 'conversion', {
      send_to: `${adsId}/${opts.label}`,
      transaction_id: opts.transactionId,
      ...(opts.value ? { value: opts.value, currency: opts.currency || 'INR' } : {}),
    });
    try {
      window.sessionStorage.setItem(key, '1');
    } catch {
      /* ignore */
    }
  };
  send();
}
