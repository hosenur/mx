import { prisma } from "../../lib/prisma";

export default defineEventHandler(async (event) => {
  console.log("POST /");
  const body = await event.req.formData();
  console.log(body.get("subject"));
  await prisma.email.create({
    data: {
      subject: body.get("subject") as string,
      from: body.get("from") as string,
    },
  });
  return { status: 200 };
});
