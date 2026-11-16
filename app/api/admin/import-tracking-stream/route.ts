import { NextRequest, NextResponse } from "next/server";
import { getImportState } from "@/app/lib/import-state";
import { activeImports } from "@/app/lib/importProgress";

export async function GET(request: NextRequest) {
  const importId = request.nextUrl.searchParams.get("importId");

  if (!importId) {
    return NextResponse.json({ error: "Import ID required" }, { status: 400 });
  }

  const readable = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const sendData = (data: any) => {
        controller.enqueue(encoder.encode("data: " + JSON.stringify(data) + "\n\n"));
      };

      const pollInterval = setInterval(() => {
        const importData = activeImports.get(importId);
        if (importData) {
          sendData(importData);
        }
      }, 500);

      const timeout = setTimeout(() => {
        clearInterval(pollInterval);
        activeImports.delete(importId);
        controller.close();
      }, 24 * 60 * 60 * 1000);

      request.signal.addEventListener("abort", () => {
        clearInterval(pollInterval);
        clearTimeout(timeout);
        activeImports.delete(importId);
      });
    },
  });

  return new NextResponse(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
