/**
 * Products that can be bought online through Zoho Payments.
 *
 * Prices live on the server only. The browser sends a SKU and a quantity;
 * the amount charged is always computed here, never taken from the client.
 * To enable checkout on another landing page, add its product here and
 * render <ZohoCheckout sku="..." /> on that page.
 */
export interface PayableProduct {
  sku: string;
  name: string;
  /** Price per unit before tax, in INR. */
  unitPrice: number;
  /** GST rate as a fraction, e.g. 0.18. */
  gstRate: number;
  maxQuantity: number;
  /** Where the customer lands after paying. */
  thankYouPath: string;
}

export const PAYABLE_PRODUCTS: Record<string, PayableProduct> = {
  "solarbio-d1800-100t": {
    sku: "solarbio-d1800-100t",
    name: "Solarbio D1800 Blood Genomic DNA Extraction Kit (100T)",
    unitPrice: 19000,
    gstRate: 0.18,
    maxQuantity: 99,
    thankYouPath: "/genomic/thank-you",
  },
};

export function getPayableProduct(sku: string): PayableProduct | null {
  return Object.prototype.hasOwnProperty.call(PAYABLE_PRODUCTS, sku) ? PAYABLE_PRODUCTS[sku] : null;
}

/** Total payable in INR (tax included), rounded to paise. */
export function computeOrderTotal(product: PayableProduct, quantity: number): number {
  const perUnit = Math.round(product.unitPrice * (1 + product.gstRate) * 100) / 100;
  return Math.round(perUnit * quantity * 100) / 100;
}
