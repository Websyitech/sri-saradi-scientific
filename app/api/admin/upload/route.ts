import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { adminAuth } from "@/app/lib/adminAuth";

export async function POST(request: NextRequest) {
  const auth = adminAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type (images and PDFs)
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only image files and PDFs are allowed" }, { status: 400 });
    }

    // Validate file size (150MB max for PDFs, 10MB for images)
    const maxSize = file.type === "application/pdf" ? 150 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      const maxSizeMB = file.type === "application/pdf" ? "150MB" : "10MB";
      return NextResponse.json({ 
        error: `File too large. Maximum size allowed: ${maxSizeMB}` 
      }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const name = file.name.replace(/\s+/g, "_");
    const filename = `${timestamp}-${name}`;
    const uploadDir = join(process.cwd(), "public", "uploads");

    // Ensure uploads directory exists
    await mkdir(uploadDir, { recursive: true });

    // Write file
    const buffer = await file.arrayBuffer();
    const filepath = join(uploadDir, filename);
    await writeFile(filepath, Buffer.from(buffer));

    // Return the public URL
    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({ success: true, url: publicUrl, filename }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
