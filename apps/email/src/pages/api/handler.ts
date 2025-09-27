// pages/api/inbound.ts
import type { NextApiRequest, NextApiResponse } from "next";
import type { InboundWebhookPayload } from "@inboundemail/sdk";
import { generateObject } from "ai";
import { createMistral } from "@ai-sdk/mistral";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const payload = req.body as InboundWebhookPayload;
  const mistral = createMistral({
    // custom settings
  });

  const { object } = await generateObject({
    model: mistral("magistral-small-2507"),
    schema: z.object({
      recipe: z.object({
        category: z.string(),
      }),
    }),
    prompt: `Classify the email category : ${payload.email.subject}`,
  });

  return res.status(200).json({ success: true });
}
