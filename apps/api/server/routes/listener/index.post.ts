import { z } from "zod";
import { prisma } from "../../lib/prisma";

const emailSchema = z.object({
  sender: z.email(),
  subject: z.string(),
  recipient: z
    .string()
    .transform((val) => val.split(",").map((email) => email.trim()))
    .pipe(z.array(z.email())),
  bodyPlain: z.string(),
  bodyHtml: z.string().optional(),
  attachmentCount: z.number(),
});

export default defineEventHandler(async (event) => {
  const body = await readFormData(event);
  console.log(body.get("recipient"));

  const result = await emailSchema.safeParseAsync({
    sender: body.get("sender"),
    subject: body.get("subject"),
    recipient: body.get("recipient"),
    bodyPlain: body.get("body-plain"),
    bodyHtml: body.get("body-html"),
    attachmentCount: Number(body.get("attachment-count")),
  });

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid input data",
      data: result.error.issues,
    });
  }

  const { data } = result;

  await prisma.email.createMany({
    data: data.recipient.map((email) => ({
      sender: data.sender,
      subject: data.subject,
      recipient: email,
      content_text: data.bodyPlain,
      content_html: data.bodyHtml,
      attachmentCount: data.attachmentCount,
    })),
    skipDuplicates: true,
  });
});
