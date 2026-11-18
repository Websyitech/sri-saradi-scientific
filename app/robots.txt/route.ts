import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const robotsSetting = await prisma.siteSetting.findFirst({
      where: { key: "robots_txt" },
    });

    const blocked = ["/admin/", "/api/", "/login", "/pay-test", "/track-order", "/thank-you", "/solarbio/thank-you"];
    // AI assistants and answer engines are welcome: they cite and link the pages they read.
    const aiBots = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "Google-Extended", "PerplexityBot", "Perplexity-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "Applebot-Extended", "Bingbot", "CCBot"];
    const group = (agent: string) => [`User-agent: ${agent}`, "Allow: /", ...blocked.map((p) => `Disallow: ${p}`)].join("\n");

    const defaultRobots = `${[group("*"), ...aiBots.map(group)].join("\n\n")}

Sitemap: https://srisaradiscientific.com/sitemap.xml`;

    const content = robotsSetting?.value || defaultRobots;

    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch {
    return new NextResponse(
      `User-agent: *
Allow: /`,
      {
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
  }
}
