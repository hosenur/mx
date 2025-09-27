// pages/api/inbound.ts
import type { NextApiRequest, NextApiResponse } from "next";
import type { InboundWebhookPayload } from "@inboundemail/sdk";
import { generateObject } from "ai";
import { createMistral } from "@ai-sdk/mistral";
import { z } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const payload = req.body as InboundWebhookPayload;
  const mistral = createMistral({
    // custom settings
  });
  const CATEGORIES = [
    {
      id: "1",
      name: "Tech",
    },
    {
      id: "2",
      name: "Finance",
    },
    {
      id: "3",
      name: "Marketing",
    },
    {
      id: "4",
      name: "Other",
    },
  ];

  const { object } = await generateObject({
    model: mistral("magistral-medium-2507"),
    schema: z.object({
      categoryId: z.string(), // return the id, not the name
    }),
    prompt: `You are a classifier. 
Given the following categories with IDs:
${CATEGORIES.map((c) => `${c.id}: ${c.name}`).join("\n")}

Classify the email content into one of the categories. 
Return only the category ID.

Email:
${payload.email.cleanedContent}`,
  });

  console.log(object);

  return res.status(200).json({ success: true });
}
