// src/services/r2Upload.service.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";

// Initialize R2 client
const r2Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT!, // e.g., https://your-account-id.r2.cloudflarestorage.com
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || "aptitude-images";
const PUBLIC_URL =
  process.env.R2_PUBLIC_URL || "https://your-r2-public-domain.com";

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export async function uploadImageToR2(
  fileBuffer: Buffer,
  originalFilename: string,
  mimeType: string,
): Promise<UploadResult> {
  try {
    // Generate unique filename
    const fileExtension = originalFilename.split(".").pop() || "jpg";
    const uniqueFilename = `${crypto.randomUUID()}.${fileExtension}`;
    const key = `questions/${uniqueFilename}`;

    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ContentType: mimeType,
    });

    await r2Client.send(command);

    // Return public URL
    const publicUrl = `${PUBLIC_URL}/${key}`;

    return {
      success: true,
      url: publicUrl,
    };
  } catch (error) {
    console.error("R2 upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Upload failed",
    };
  }
}
