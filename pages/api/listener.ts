// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IncomingForm } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";
import fs from "fs";
import path from "path";

type Data = {
  message: string;
  files?: Array<{
    filename: string;
    originalName: string;
    size: number;
    mimetype: string;
    r2Key: string;
    r2Url: string;
  }>;
};

const schema = z.object({
  subject: z.string(),
});


export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }



  try {
    const form = new IncomingForm({
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
    });

    const [fields, files] = await form.parse(req);

    console.log("Fields:", fields);
    console.log("Files:", files);

    // Process uploaded files and upload to Cloudflare R2
    const processedFiles = [];

    for (const [fieldName, fileArray] of Object.entries(files)) {
      if (Array.isArray(fileArray)) {
        for (const file of fileArray) {
          if (file && file.filepath) {
            try {
              // Generate a unique R2 key
              const timestamp = Date.now();
              const originalName = file.originalFilename || "unknown";
              const extension = path.extname(originalName);
              const baseName = path.basename(originalName, extension);
              const r2Key = `uploads/${baseName}_${timestamp}${extension}`;

              // Read file content
              const fileContent = fs.readFileSync(file.filepath);

              // Upload to Cloudflare R2
              const uploadCommand = new PutObjectCommand({
                Bucket: "auto",
                Key: r2Key,
                Body: fileContent,
                ContentType: file.mimetype || "application/octet-stream",
                ContentDisposition: `attachment; filename="${originalName}"`,
                Metadata: {
                  originalName: originalName,
                  uploadedAt: new Date().toISOString(),
                  fieldName: fieldName,
                },
              });

              await r2.send(uploadCommand);

              // Generate R2 URL (use custom domain if available, otherwise default R2 URL)
              const r2Url = `${process.env.R2_ENDPOINT}/${r2Key}`;

              processedFiles.push({
                filename: `${baseName}_${timestamp}${extension}`,
                originalName: originalName,
                size: file.size || 0,
                mimetype: file.mimetype || "application/octet-stream",
                fieldName: fieldName,
                r2Key: r2Key,
                r2Url: r2Url,
              });

              // Clean up temporary file
              fs.unlinkSync(file.filepath);

              console.log(`File uploaded to R2: ${originalName} -> ${r2Key}`);
            } catch (uploadError) {
              console.error(
                `Error uploading file ${file.originalFilename}:`,
                uploadError,
              );
              // Clean up temporary file even if upload failed
              if (fs.existsSync(file.filepath)) {
                fs.unlinkSync(file.filepath);
              }
              throw new Error(
                `Failed to upload ${file.originalFilename} to R2`,
              );
            }
          }
        }
      }
    }

    return res.status(200).json({
      message: `Successfully uploaded ${processedFiles.length} file(s) to Cloudflare R2`,
      files: processedFiles,
    });
  } catch (error) {
    console.error("Error processing upload:", error);
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : "Error processing upload",
    });
  }
}
