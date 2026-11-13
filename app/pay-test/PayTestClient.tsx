'use client';

import { useState } from 'react';
import { useZohoCheckout } from '../components/checkout/useZohoCheckout';

// Internal page for a ₹1 live payment test. The item only exists while ZOHO_PAY_TEST_ITEM=1.
export default function PayTestClient() {
  const checkout = useZohoCheckout();
  const [f, setF] = useState({ name: '', email: '', phone: '', address: '' });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-2 text-2xl font-bold text-[#2D2B7F]">Payment test – ₹1</h1>
      <p className="mb-6 text-sm text-gray-600">Internal page for checking Zoho Payments. Not linked from the site.</p>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          checkout.pay({ sku: 'payment-test-1-inr', quantity: 1, customer: f });
        }}
      >
        {(['name', 'email', 'phone', 'address'] as const).map((k) => (
          <input
            key={k}
            required
            placeholder={k[0].toUpperCase() + k.slice(1)}
            type={k === 'email' ? 'email' : 'text'}
            value={f[k]}
            onChange={set(k)}
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
        ))}
        <button disabled={checkout.busy} className="w-full rounded bg-[#2D2B7F] py-2.5 font-semibold text-white disabled:opacity-50">
          {checkout.busy ? 'Please wait…' : 'Pay ₹1'}
        </button>
      </form>
      {checkout.message && <p className="mt-4 text-sm text-gray-700">{checkout.message}</p>}
    </div>
  );
}
