# Zoho Payments Setup

Online checkout uses the Zoho Payments checkout widget. The amount is always
computed on the server, and an order is marked paid only after the server has
re-read the payment from Zoho.

## 1. Environment variables

Add these to `.env` on the server (never commit them), then restart the site.

```
ZOHO_PAY_ACCOUNT_ID=            # Zoho Payments > Settings > Account Details
ZOHO_PAY_API_KEY=               # Settings > Developer Space > Authentication Keys
ZOHO_PAY_SIGNING_KEY=           # Settings > Developer Space > Signing Key (widget response)
ZOHO_PAY_CLIENT_ID=             # Zoho Developer Console (client type ORG)
ZOHO_PAY_CLIENT_SECRET=         # Zoho Developer Console
ZOHO_PAY_REFRESH_TOKEN=         # produced by step 3 below
ZOHO_PAY_WEBHOOK_SIGNING_KEY=   # shown when the webhook is registered (step 4)
ZOHO_PAY_SANDBOX=false          # true while testing against paymentssandbox.zoho.in
# ZOHO_PAY_REDIRECT_URI=        # optional override; defaults to <site origin>/api/zoho/oauth/callback
```

## 2. Register the client (Zoho Developer Console)

Open https://api-console.zoho.in/add?client_type=ORG and enter:

| Field | Value |
| --- | --- |
| Homepage URL | `https://srisaradiscientific.com` |
| Authorized Redirect URI | `https://srisaradiscientific.com/api/zoho/oauth/callback` |
| Authorized Redirect URI (local testing) | `http://localhost:3000/api/zoho/oauth/callback` |

The redirect URI is used once, to authorize the server. It is not tied to any
landing page; one URI serves checkout on every page. If the live site is served
from `www.`, register that exact host instead (it must match character for character).

Copy the Client ID and Client Secret into `.env` and restart.

## 3. Authorize (one time)

1. Add a long random value as `ZOHO_PAY_SETUP_KEY` in `.env` and restart
   (for example the output of `openssl rand -hex 24`).
2. Open `/api/zoho/oauth/start?key=<that value>` and click **Accept** on Zoho.
3. The callback page shows a `ZOHO_PAY_REFRESH_TOKEN=...` line. Paste it into `.env` and restart.

## 4. Webhook

In Zoho Payments > Settings > Developer Space > Webhooks, add
`https://srisaradiscientific.com/api/payments/webhook` for `payment.succeeded`
and `payment.failed`. Copy the signing key into `ZOHO_PAY_WEBHOOK_SIGNING_KEY`
and restart. Until the key is set, webhook events are acknowledged but ignored.

## 5. Sandbox testing

Ask Zoho support to enable the sandbox, set `ZOHO_PAY_SANDBOX=true`, and use the
sandbox account ID, API key, signing key and a sandbox refresh token (repeat
step 3; scopes and SOID switch automatically). Sandbox UPI succeeds for amounts
up to ₹500 only, so test with a low-priced test product.

## Adding checkout to another landing page

1. Add the product to `app/lib/payableProducts.ts` (SKU, name, price, GST, thank-you path).
2. In the page's client component:

```tsx
const checkout = useZohoCheckout(); // app/components/checkout/useZohoCheckout.ts
checkout.pay({ sku: 'your-sku', quantity, customer: { name, email, phone, address } });
```

Show `checkout.message` to the customer and disable the button while `checkout.busy`.

## Where orders appear

Admin > Orders. Online orders start as **Payment pending** and become **Paid online**
once verified. The Zoho payment ID is appended to the order notes.
