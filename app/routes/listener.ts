import crypto from "node:crypto";
import type { Route } from "./+types/listener";
import { prisma } from "~/lib/prisma";

export const action = async ({ request }: Route.ActionArgs) => {
  if (request.method !== "POST") {
    return { message: "Method not allowed" };
  }

  // Parse form data instead of JSON
  const formData = await request.formData();
  const sender = formData.get("sender") as string;
  const from = formData.get("from") as string;
  const recipient = formData.get("recipient") as string;
  const subject = formData.get("subject") as string;
  const body = formData.get("body-plain") as string;

  const data = await prisma.email.create({
    data: {
      sender: sender,
      recipient: recipient,
      subject: subject,
      body: body,
    },
  });

  return { success: true };
};
