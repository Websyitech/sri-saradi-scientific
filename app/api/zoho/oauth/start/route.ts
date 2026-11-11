import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { buildAuthorizeUrl, oauthRedirectUri } from "@/app/lib/zohoPayments";
import { requestOrigin } from "../origin";

// One-time setup: open /api/zoho/oauth/start?key=<ZOHO_PAY_SETUP_KEY> to grant the site access to Zoho Payments.
export async function GET(request: NextRequest) {
  const setupKey = process.env.ZOHO_PAY_SETUP_KEY;
  const given = request.nextUrl.searchParams.get("key") || "";
  if (
    !setupKey ||
    given.length !== setupKey.length ||
    !crypto.timingSafeEqual(Buffer.from(given), Buffer.from(setupKey))
  ) {
    return NextResponse.json({ error: "Set ZOHO_PAY_SETUP_KEY in .env, then open this URL with ?key=<that value>." }, { status: 401 });
  }

  const missing = ["ZOHO_PAY_ACCOUNT_ID", "ZOHO_PAY_CLIENT_ID", "ZOHO_PAY_CLIENT_SECRET"].filter((k) => !process.env[k]);
  if (missing.length) {
    return NextResponse.json({ error: `Set these in .env and restart first: ${missing.join(", ")}` }, { status: 503 });
  }

  const state = crypto.randomBytes(24).toString("hex");
  const redirectUri = oauthRedirectUri(requestOrigin(request));
  const response = NextResponse.redirect(buildAuthorizeUrl(redirectUri, state));
  response.cookies.set("zoho_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: redirectUri.startsWith("https://"),
    path: "/api/zoho/oauth",
    maxAge: 600,
  });
  return response;
}
