import crypto from "crypto";

/**
 * Server-side Zoho Payments client (India data centre).
 * Docs: https://www.zoho.com/in/payments/developerdocs/web-integration/integrate-widget/
 *
 * Never import this file from a client component: it reads secrets.
 */

const ACCOUNTS_URL = "https://accounts.zoho.in";
export const ZOHO_OAUTH_CALLBACK_PATH = "/api/zoho/oauth/callback";

export function isSandbox(): boolean {
  return process.env.ZOHO_PAY_SANDBOX === "true";
}

function apiBase(): string {
  return isSandbox() ? "https://paymentssandbox.zoho.in/api/v1" : "https://payments.zoho.in/api/v1";
}

export function oauthScopes(): string {
  const prefix = isSandbox() ? "ZohoPaySandbox" : "ZohoPay";
  return [`${prefix}.payments.CREATE`, `${prefix}.payments.READ`, `${prefix}.payments.UPDATE`].join(",");
}

export function oauthSoid(): string {
  return `${isSandbox() ? "zohopaysandbox" : "zohopay"}.${process.env.ZOHO_PAY_ACCOUNT_ID || ""}`;
}

/** The redirect URI registered in the Zoho Developer Console. */
export function oauthRedirectUri(requestOrigin: string): string {
  if (process.env.ZOHO_PAY_REDIRECT_URI) return process.env.ZOHO_PAY_REDIRECT_URI;
  return `${requestOrigin.replace(/\/$/, "")}${ZOHO_OAUTH_CALLBACK_PATH}`;
}

export class ZohoPayError extends Error {
  status: number;
  constructor(message: string, status = 502) {
    super(message);
    this.status = status;
  }
}

/** Names of required settings that are missing, so errors can say what to fix. */
export function missingConfig(): string[] {
  const required = [
    "ZOHO_PAY_ACCOUNT_ID",
    "ZOHO_PAY_API_KEY",
    "ZOHO_PAY_CLIENT_ID",
    "ZOHO_PAY_CLIENT_SECRET",
    "ZOHO_PAY_REFRESH_TOKEN",
  ];
  return required.filter((k) => !process.env[k]);
}

/** Values the browser widget needs. The API key is meant for client code. */
export function widgetConfig() {
  return {
    accountId: process.env.ZOHO_PAY_ACCOUNT_ID || "",
    apiKey: process.env.ZOHO_PAY_API_KEY || "",
    testMode: isSandbox(),
  };
}

// ---- OAuth -----------------------------------------------------------------

let cachedToken: { value: string; expiresAt: number } | null = null;
let pendingToken: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_PAY_REFRESH_TOKEN || "",
    client_id: process.env.ZOHO_PAY_CLIENT_ID || "",
    client_secret: process.env.ZOHO_PAY_CLIENT_SECRET || "",
    grant_type: "refresh_token",
  });
  const res = await fetch(`${ACCOUNTS_URL}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    throw new ZohoPayError(`Zoho OAuth token refresh failed: ${data.error || res.status}`);
  }
  const ttlMs = (Number(data.expires_in) || 3600) * 1000;
  cachedToken = { value: data.access_token, expiresAt: Date.now() + ttlMs - 5 * 60 * 1000 };
  return data.access_token;
}

async function getAccessToken(forceRefresh = false): Promise<string> {
  if (!forceRefresh && cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.value;
  if (!pendingToken) {
    pendingToken = refreshAccessToken().finally(() => {
      pendingToken = null;
    });
  }
  return pendingToken;
}

/** One-time exchange of the authorization code for tokens (OAuth step 3). */
export async function exchangeAuthCode(code: string, redirectUri: string) {
  const params = new URLSearchParams({
    code,
    client_id: process.env.ZOHO_PAY_CLIENT_ID || "",
    client_secret: process.env.ZOHO_PAY_CLIENT_SECRET || "",
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });
  const res = await fetch(`${ACCOUNTS_URL}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.error) {
    throw new ZohoPayError(`Zoho OAuth code exchange failed: ${data.error || res.status}`);
  }
  return data as { access_token?: string; refresh_token?: string; expires_in?: number };
}

export function buildAuthorizeUrl(redirectUri: string, state: string): string {
  const params = new URLSearchParams({
    scope: oauthScopes(),
    client_id: process.env.ZOHO_PAY_CLIENT_ID || "",
    soid: oauthSoid(),
    state,
    response_type: "code",
    redirect_uri: redirectUri,
    access_type: "offline",
    prompt: "consent",
  });
  return `${ACCOUNTS_URL}/oauth/v2/org/auth?${params.toString()}`;
}

// ---- API calls -------------------------------------------------------------

async function zohoFetch<T>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  const missing = missingConfig();
  if (missing.length) throw new ZohoPayError(`Zoho Payments is not configured. Missing: ${missing.join(", ")}`, 503);

  const sep = path.includes("?") ? "&" : "?";
  const url = `${apiBase()}${path}${sep}account_id=${encodeURIComponent(process.env.ZOHO_PAY_ACCOUNT_ID || "")}`;

  const call = async (token: string) =>
    fetch(url, {
      method: init.method || "GET",
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        ...(init.body ? { "Content-Type": "application/json" } : {}),
      },
      body: init.body ? JSON.stringify(init.body) : undefined,
      cache: "no-store",
    });

  let res = await call(await getAccessToken());
  if (res.status === 401) res = await call(await getAccessToken(true));

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ZohoPayError(`Zoho Payments API ${res.status}: ${data.message || "request failed"}`);
  }
  return data as T;
}

export interface ZohoPaymentSession {
  payments_session_id: string;
  amount: string;
  currency: string;
  status?: string;
  reference_number?: string;
  payments?: { payment_id: string; status: string }[];
}

export interface ZohoPayment {
  payment_id: string;
  amount: string;
  currency: string;
  status: string;
  payments_session_id?: string;
  reference_number?: string;
  payment_method?: { type?: string };
}

export async function createPaymentSession(input: {
  amount: number;
  description: string;
  referenceNumber: string;
  metaData?: { key: string; value: string }[];
}): Promise<ZohoPaymentSession> {
  const data = await zohoFetch<{ payments_session: ZohoPaymentSession }>("/paymentsessions", {
    method: "POST",
    body: {
      amount: input.amount,
      currency: "INR",
      description: input.description.slice(0, 500),
      reference_number: input.referenceNumber.slice(0, 50),
      invoice_number: input.referenceNumber.slice(0, 50),
      meta_data: input.metaData,
    },
  });
  if (!data.payments_session?.payments_session_id) throw new ZohoPayError("Zoho Payments returned no session id");
  return data.payments_session;
}

export async function getPaymentSession(sessionId: string): Promise<ZohoPaymentSession> {
  const data = await zohoFetch<{ payments_session: ZohoPaymentSession }>(
    `/paymentsessions/${encodeURIComponent(sessionId)}`
  );
  return data.payments_session;
}

export async function getPayment(paymentId: string): Promise<ZohoPayment> {
  const data = await zohoFetch<{ payment: ZohoPayment }>(`/payments/${encodeURIComponent(paymentId)}`);
  return data.payment;
}

// ---- Signatures ------------------------------------------------------------

function safeEqualHex(a: string, b: string): boolean {
  const x = Buffer.from(a.toLowerCase());
  const y = Buffer.from(b.toLowerCase());
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

/**
 * Widget response signature: HMAC-SHA256 of "payment_id|payment_session_id".
 * Returns null when no signing key is configured (signature cannot be checked).
 */
export function verifyWidgetSignature(paymentId: string, sessionId: string, signature: string): boolean | null {
  const key = process.env.ZOHO_PAY_SIGNING_KEY;
  if (!key) return null;
  if (!signature) return false;
  const expected = crypto.createHmac("sha256", key).update(`${paymentId}|${sessionId}`).digest("hex");
  return safeEqualHex(expected, signature);
}

/** Webhook header "t=<ms>,v=<hex>": HMAC-SHA256 of "<t>.<raw body>". */
export function verifyWebhookSignature(rawBody: string, header: string | null): boolean {
  const key = process.env.ZOHO_PAY_WEBHOOK_SIGNING_KEY;
  if (!key || !header) return false;
  const parts: Record<string, string> = {};
  for (const piece of header.split(",")) {
    const i = piece.indexOf("=");
    if (i > 0) parts[piece.slice(0, i).trim()] = piece.slice(i + 1).trim();
  }
  if (!parts.t || !parts.v) return false;
  const expected = crypto.createHmac("sha256", key).update(`${parts.t}.${rawBody}`).digest("hex");
  return safeEqualHex(expected, parts.v);
}
