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

    setImportPaused(importId, true);

    return NextResponse.json({ success: true, message: "Import paused" });
  } catch (error) {
    console.error("Pause error:", error);
    return NextResponse.json(
      { error: "Failed to pause import" },
      { status: 500 }
    );
  }
}
