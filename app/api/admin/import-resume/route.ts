import { NextRequest, NextResponse } from "next/server";
import { setImportPaused } from "@/app/lib/import-state";

export async function POST(request: NextRequest) {
  try {
    const { importId } = await request.json();
    
    if (!importId) {
      return NextResponse.json(
        { error: "Import ID required" },
        { status: 400 }
      );
    }

    setImportPaused(importId, false);

    return NextResponse.json({ success: true, message: "Import resumed" });
  } catch (error) {
    console.error("Resume error:", error);
    return NextResponse.json(
      { error: "Failed to resume import" },
      { status: 500 }
    );
  }
}
