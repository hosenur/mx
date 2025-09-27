import { inbound } from "@/lib/inbound";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
export const utilsRouter = router({
  status: publicProcedure.query(async (ctx) => {
    const { data } = await inbound.domains.list();
    if (data?.meta.verifiedCount === 0) {
      return {
        verified: false,
      };
    }
  }),
});
// export type definition of API
