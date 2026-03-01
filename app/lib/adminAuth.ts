import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";

export function adminAuth(request: NextRequest): { id: string; email: string; role: string } | NextResponse {
  const token = request.cookies.get("admin_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
  return decoded;
}
