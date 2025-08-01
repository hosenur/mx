import { z } from "zod";
export const createEmailSchema = z.object({
  sender: z.string(),
  recipient: z.string(),
  subject: z.string(),
  body: z.string(),
});

const emailSchema = createEmailSchema.extend({
  id: z.string().optional(),
  createdAt: z.string().optional(),
  read: z.boolean().optional(),
});

export type Email = z.infer<typeof emailSchema>;
