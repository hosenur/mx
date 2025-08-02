import { prisma } from "~/lib/prisma";

export default defineEventHandler(async(event) => {
  const emails = await prisma.email.findMany()
  return {
    status: "ok",
    emails,
  };
});
