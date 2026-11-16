import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/app/lib/adminAuth";
import { buildAuthorizeUrl, oauthRedirectUri } from "@/app/lib/zohoPayments";
import { requestOrigin } from "../origin";

// One-time setup: an admin opens this URL to grant the site access to Zoho Payments.
export async function GET(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) {
    return NextResponse.json({ error: "Log in at /admin/login first, then open this URL again." }, { status: 401 });
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
