import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../../../../packages/db/src";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    // Add social providers if needed
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await prisma.label.create({
            data: {
              name: "Others",
              color: "#000000",
              userId: user.id,
            },
          });
        },
      },
    },
  },
});
