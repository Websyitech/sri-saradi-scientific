import { NextResponse } from "next/server";
import { SITE_SETTINGS } from "@/app/lib/siteSettings";

export function GET() {
  return NextResponse.json(SITE_SETTINGS);
}
