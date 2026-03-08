import { NextRequest, NextResponse } from "next/server";
import { getImportState } from "@/app/lib/import-state";

const activeImports = new Map<string, {
  current: number;
  total: number;
  created: number;
  skipped: number;
  status: string;
  errors: Array<{ row: number; catalogNumber: string; name: string; message: string }>;
}>();

export function registerImportProgress(
  importId: string,
  current: number,
  total: number,
  created: number,
  skipped: number,
  status: string,
  errors: Array<{ row: number; message: string }>
) {
  if (!activeImports.has(importId)) {
    activeImports.set(importId, {
      current: 0,
      total,
      created: 0,
      skipped: 0,
      status: "Starting...",
      errors: [],
    });
  }

  const data = activeImports.get(importId)!;
  data.current = current;
  data.created = created;
  data.skipped = skipped;
  data.status = status;

  errors.forEach((err) => {
    if (!data.errors.some((e) => e.row === err.row)) {
      const parts = err.message.split(" - ");
      data.errors.push({
        row: err.row,
        catalogNumber: parts[0] || "N/A",
        name: parts[1] || "N/A",
        message: parts.slice(2).join(" - ") || err.message,
      });
    }
  });
}

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
