import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const UPLOADS_DIR = join(process.cwd(), "public", "uploads");

export async function GET() {
  try {
    if (!existsSync(UPLOADS_DIR)) {
      return NextResponse.json({ files: [] });
    }

    const files = await getMediaFiles();
    return NextResponse.json({ files });
  } catch (error) {
    console.error("Failed to fetch media:", error);
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!existsSync(UPLOADS_DIR)) {
      await mkdir(UPLOADS_DIR, { recursive: true });
    }

    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const uploadedFiles = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name}`;
      const filepath = join(UPLOADS_DIR, filename);

      await writeFile(filepath, buffer);

      uploadedFiles.push({
        id: filename,
        name: file.name,
        url: `/uploads/${filename}`,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ files: uploadedFiles });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

async function getMediaFiles() {
  const fs = await import("fs/promises");
  const files = await fs.readdir(UPLOADS_DIR);

  return files.map((filename) => {
    const filepath = join(UPLOADS_DIR, filename);
    const stats = require("fs").statSync(filepath);

    return {
      id: filename,
      name: filename.replace(/^\d+-/, ""),
      url: `/uploads/${filename}`,
      size: stats.size,
      type: "application/octet-stream",
      uploadedAt: stats.birthtime.toISOString(),
    };
  });
}
