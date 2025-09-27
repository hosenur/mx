import { publicProcedure, router } from "../trpc";
import { inbound } from "../../lib/inbound";

export const domainRouter = router({
  getDomains: publicProcedure.query(async () => {
    const { data } = await inbound.domains.list();
    return {
      domains: data?.data,
    };
  }),
});
