import { publicProcedure, router } from "../trpc";
import { inbound } from "../../lib/inbound";

export const domainRouter = router({
  analyze: publicProcedure.query(async () => {
  }),
});
