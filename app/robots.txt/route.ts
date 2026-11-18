import { NextResponse } from "next/server";

// robots.txt is defined in code (the old Admin → Settings "robots_txt" value is no longer used).
const blocked = ["/admin/", "/api/", "/login", "/pay-test", "/track-order", "/thank-you", "/solarbio/thank-you"];

// AI assistants and answer engines are welcome: they cite and link the pages they read.
const aiBots = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User", "Google-Extended", "PerplexityBot", "Perplexity-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User", "Applebot-Extended", "Bingbot", "CCBot",
];

const group = (agent: string) => [`User-agent: ${agent}`, "Allow: /", ...blocked.map((p) => `Disallow: ${p}`)].join("\n");

const robots = `${["*", ...aiBots].map(group).join("\n\n")}

Sitemap: https://srisaradiscientific.com/sitemap.xml
`;

export function GET() {
  return new NextResponse(robots, { headers: { "Content-Type": "text/plain" } });
}
