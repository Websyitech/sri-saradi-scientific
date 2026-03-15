import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const UPLOADS_DIR = join(process.cwd(), "public", "uploads");

// Configure the maximum size for uploads (150MB)
export const maxDuration = 300; // 5 minutes timeout
export const runtime = 'nodejs';

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
      // Validate file type (images and PDFs)
      if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
        return NextResponse.json({ 
          error: `File "${file.name}" is not allowed. Only image files and PDFs are accepted.` 
        }, { status: 400 });
      }

      // Validate file size (150MB max for PDFs, 10MB for images)
      const maxSize = file.type === "application/pdf" ? 150 * 1024 * 1024 : 10 * 1024 * 1024;
      if (file.size > maxSize) {
        const maxSizeMB = file.type === "application/pdf" ? "150MB" : "10MB";
        return NextResponse.json({ 
          error: `File "${file.name}" is too large. Maximum size allowed: ${maxSizeMB}` 
        }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
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

function getMimeType(filename: string): string {
  const ext = filename.toLowerCase().split('.').pop();
  const mimeTypes: { [key: string]: string } = {
    // Images
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg', 
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    // Documents
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'txt': 'text/plain',
  };
  return mimeTypes[ext || ''] || 'application/octet-stream';
}

async function getMediaFiles() {
  const fs = await import("fs/promises");
  const files = await fs.readdir(UPLOADS_DIR);

  const fileList = files.map((filename) => {
    const filepath = join(UPLOADS_DIR, filename);
    const stats = require("fs").statSync(filepath);

    return {
      id: filename,
      name: filename.replace(/^\d+-/, ""),
      url: `/uploads/${filename}`,
      size: stats.size,
      type: getMimeType(filename),
      uploadedAt: stats.birthtime.toISOString(),
    };
  });

  // Sort by uploadedAt date in descending order (newest first)
  return fileList.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
}
