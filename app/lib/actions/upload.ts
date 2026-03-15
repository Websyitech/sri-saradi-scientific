'use server';

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file) {
    return { error: "No file provided", success: false };
  }

  // Validate file type (images and PDFs)
  if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
    return { error: "Only image files and PDFs are allowed", success: false };
  }

  // Validate file size (150MB max for PDFs, 10MB for images)
  const maxSize = file.type === "application/pdf" ? 150 * 1024 * 1024 : 10 * 1024 * 1024;
  if (file.size > maxSize) {
    const maxSizeMB = file.type === "application/pdf" ? "150MB" : "10MB";
    return { 
      error: `File too large. Maximum size allowed: ${maxSizeMB}`,
      success: false
    };
  }

  try {
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
    return { success: true, url: publicUrl, filename };
  } catch (error) {
    console.error("Upload error:", error);
    return { error: "Failed to upload file", success: false };
  }
}

// Alternative upload function that accepts multiple files
export async function uploadMultipleFiles(formData: FormData) {
  const files = formData.getAll("files") as File[];

  if (!files || files.length === 0) {
    return { error: "No files provided", success: false, files: [] };
  }

  const uploadedFiles = [];
  const uploadDir = join(process.cwd(), "public", "uploads");

  try {
    // Ensure uploads directory exists
    await mkdir(uploadDir, { recursive: true });

    for (const file of files) {
      // Validate file type (images and PDFs)
      if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
        return { 
          error: `File "${file.name}" is not allowed. Only image files and PDFs are accepted.`,
          success: false,
          files: []
        };
      }

      // Validate file size (150MB max for PDFs, 10MB for images)
      const maxSize = file.type === "application/pdf" ? 150 * 1024 * 1024 : 10 * 1024 * 1024;
      if (file.size > maxSize) {
        const maxSizeMB = file.type === "application/pdf" ? "150MB" : "10MB";
        return { 
          error: `File "${file.name}" is too large. Maximum size allowed: ${maxSizeMB}`,
          success: false,
          files: []
        };
      }

      // Generate unique filename
      const timestamp = Date.now();
      const name = file.name.replace(/\s+/g, "_");
      const filename = `${timestamp}-${name}`;
      const filepath = join(uploadDir, filename);

      // Write file
      const buffer = await file.arrayBuffer();
      await writeFile(filepath, Buffer.from(buffer));

      uploadedFiles.push({
        id: filename,
        name: file.name,
        url: `/uploads/${filename}`,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
      });
    }

    return { success: true, files: uploadedFiles };
  } catch (error) {
    console.error("Upload error:", error);
    return { error: "Failed to upload files", success: false, files: [] };
  }
}