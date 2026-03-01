import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/app/lib/adminAuth";

export async function GET(request: NextRequest) {
  const result = adminAuth(request);
  if (result instanceof NextResponse) return result;
  return NextResponse.json({ success: true, user: result });
}
