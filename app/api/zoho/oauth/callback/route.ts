import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/app/lib/adminAuth";
import { exchangeAuthCode, oauthRedirectUri } from "@/app/lib/zohoPayments";
import { requestOrigin } from "../origin";

function page(title: string, body: string, status = 200) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<title>${title}</title><style>body{font-family:system-ui,sans-serif;max-width:720px;margin:60px auto;padding:0 20px;color:#1a1a2e;line-height:1.5}
code,pre{background:#f0f2f5;padding:2px 6px;border-radius:4px;word-break:break-all;white-space:pre-wrap}pre{padding:14px}</style></head>
<body><h1>${title}</h1>${body}</body></html>`;
  return new NextResponse(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" },
  });
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Authorized Redirect URI registered in the Zoho Developer Console.
 * Zoho sends the admin back here with ?code=...; the code is exchanged for a
 * refresh token, which is shown once so it can be saved as ZOHO_PAY_REFRESH_TOKEN.
 */
export async function GET(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) {
    return page("Admin login required", "<p>Log in at <code>/admin/login</code>, then start again from <code>/api/zoho/oauth/start</code>.</p>", 401);
  }

  const params = request.nextUrl.searchParams;
  const error = params.get("error");
  if (error) return page("Zoho declined the request", `<p>Zoho returned: <code>${esc(error)}</code></p>`, 400);

  const code = params.get("code");
  const state = params.get("state");
  const expectedState = request.cookies.get("zoho_oauth_state")?.value;
  if (!code || !state || !expectedState || state !== expectedState) {
    return page("Authorization could not be verified", "<p>Start again from <code>/api/zoho/oauth/start</code>. The link is valid for 10 minutes.</p>", 400);
  }

  try {
    const tokens = await exchangeAuthCode(code, oauthRedirectUri(requestOrigin(request)));
    const response = tokens.refresh_token
      ? page(
          "Zoho Payments connected",
          `<p>Add this line to the server's <code>.env</code> file, then restart the site. It is shown only once.</p>
<pre>ZOHO_PAY_REFRESH_TOKEN=${esc(tokens.refresh_token)}</pre>
<p>Treat it like a password. Do not share it or commit it.</p>`
        )
      : page("No refresh token returned", "<p>Zoho returned an access token only. Start again from <code>/api/zoho/oauth/start</code>.</p>", 502);
    response.cookies.delete({ name: "zoho_oauth_state", path: "/api/zoho/oauth" });
    return response;
  } catch (err) {
    console.error("Zoho OAuth callback failed:", err);
    return page(
      "Token exchange failed",
      "<p>The authorization code is valid for one minute and the redirect URI must match the one registered in the Zoho Developer Console exactly. Start again from <code>/api/zoho/oauth/start</code>.</p>",
      502
    );
  }
}
