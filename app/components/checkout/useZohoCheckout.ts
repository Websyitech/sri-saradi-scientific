'use client';

import { useCallback, useRef, useState } from 'react';

/**
 * Reusable Zoho Payments checkout for any landing page.
 *
 *   const { pay, busy, message } = useZohoCheckout();
 *   pay({ sku: 'solarbio-d1800-100t', quantity: 2, customer: {...} });
 *
 * The product must be listed in app/lib/payableProducts.ts. The amount is
 * always calculated on the server from the SKU and quantity.
 */

const WIDGET_SRC = 'https://static.zohocdn.com/zpay/zpay-js/v1/zpayments.js';

export interface CheckoutCustomer {
  name: string;
  email: string;
  phone: string;
  company?: string;
  address: string;
  gstin?: string;
}

export interface CheckoutRequest {
  sku: string;
  quantity: number;
  customer: CheckoutCustomer;
}

interface ZPaymentsInstance {
  requestPaymentMethod(options: Record<string, unknown>): Promise<{ payment_id?: string; signature?: string }>;
  close(): Promise<void>;
}

declare global {
  interface Window {
    ZPayments?: new (config: Record<string, unknown>) => ZPaymentsInstance;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadWidgetScript(): Promise<void> {
  if (typeof window !== 'undefined' && window.ZPayments) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = WIDGET_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        scriptPromise = null;
        script.remove();
        reject(new Error('Could not load the payment widget.'));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

async function postJson(url: string, body: unknown) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

export function useZohoCheckout() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const running = useRef(false);

  const pay = useCallback(async ({ sku, quantity, customer }: CheckoutRequest) => {
    if (running.current) return;
    running.current = true;
    setBusy(true);
    setIsError(false);
    setMessage('Preparing secure checkout…');

    const fail = (text: string) => {
      setIsError(true);
      setMessage(text);
    };

    try {
      const created = await postJson('/api/payments/create-session', {
        sku,
        quantity,
        ...customer,
        pageUrl: window.location.href,
      });
      if (!created.ok) {
        fail(created.data.error || 'Could not start the payment. Please try again.');
        return;
      }
      const order = created.data as {
        orderId: string;
        paymentSessionId: string;
        amount: string;
        currency: string;
        description: string;
        thankYouPath: string;
        widget: { accountId: string; apiKey: string; testMode: boolean };
      };

      await loadWidgetScript();
      if (!window.ZPayments) throw new Error('Payment widget unavailable.');

      const instance = new window.ZPayments({
        account_id: order.widget.accountId,
        domain: 'IN',
        otherOptions: {
          api_key: order.widget.apiKey,
          ...(order.widget.testMode ? { is_test_mode: true } : {}),
        },
      });

      let paymentId: string | undefined;
      let signature: string | undefined;
      let widgetError: { code?: string; message?: string } | null = null;

      setMessage('Complete the payment in the secure Zoho Payments window.');
      try {
        const result = await instance.requestPaymentMethod({
          amount: order.amount,
          currency_code: order.currency,
          payments_session_id: order.paymentSessionId,
          currency_symbol: '₹',
          business: 'Sri Saradi Scientific',
          description: order.description,
          invoice_number: order.orderId,
          reference_number: order.orderId,
          address: { name: customer.name, email: customer.email, phone: customer.phone },
        });
        paymentId = result?.payment_id;
        signature = result?.signature;
      } catch (err) {
        widgetError = (err || {}) as { code?: string; message?: string };
      } finally {
        try {
          await instance.close();
        } catch {}
      }

      // Always ask the server: the customer may have paid and then closed the window.
      setMessage('Confirming your payment…');
      const verified = await postJson('/api/payments/verify', {
        orderId: order.orderId,
        paymentSessionId: order.paymentSessionId,
        paymentId,
        signature,
      });

      if (verified.data.paid) {
        const query = new URLSearchParams({
          ref: order.orderId,
          paid: '1',
          name: customer.name,
          email: customer.email,
          qty: `${quantity} kit${quantity > 1 ? 's' : ''}`,
        });
        if (customer.company) query.set('org', customer.company);
        window.location.assign(`${order.thankYouPath}?${query.toString()}`);
        return;
      }

      if (paymentId) {
        fail(
          `We could not confirm your payment yet. If money was debited, it is safe: quote Order ID ${order.orderId} to info@srisaradiscientific.com and we will confirm it.`
        );
      } else if (widgetError?.code === 'widget_closed' || !widgetError) {
        fail('Payment was not completed. No money was taken. You can try again.');
      } else {
        fail(widgetError.message || 'The payment could not be processed. Please try again.');
      }
    } catch {
      fail('Something went wrong while starting the payment. Please try again.');
    } finally {
      running.current = false;
      setBusy(false);
    }
  }, []);

  return { pay, busy, message, isError };
}
