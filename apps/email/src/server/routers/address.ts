import { publicProcedure, router } from "../trpc";
import { inbound } from "../../lib/inbound";
import { z } from "zod";
export const addressRouter = router({
  getEmails: publicProcedure.query(async () => {
    const { data } = await inbound.domains.list();
    return {
      domains: data?.data,
    };
  }),
  create: publicProcedure
    .input(
      z.object({ username: z.string(), domain: z.string().min(2).max(255) }),
    )
    .mutation(async ({ input }) => {
      const { username, domain } = input;
      const { data: domainData } = await inbound.domain.get(domain);
      if (!domainData) {
        throw new Error(`Domain ${domain} not found`);
      }
      const { data: emailData } = await inbound.emailAddresses.create({
        address: `${username}@${domainData?.domain}`,
        domainId: domain,
        endpointId: "g3VpA2GXnD_VJoOzVHAyf",
      });
      return {
        email: emailData,
      };
    }),
});
