// pages/api/inbound.ts
import type { NextApiRequest, NextApiResponse } from "next";
import type { InboundWebhookPayload } from "@inboundemail/sdk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // ✅ Next.js parses JSON automatically if Content-Type: application/json
  const payload = req.body as InboundWebhookPayload;

  console.log("Received inbound email:", payload);

  return res.status(200).json({ success: true });
}
