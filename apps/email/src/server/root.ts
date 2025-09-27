import { router } from "./trpc";
import { utilsRouter } from "./routers/onboarding";
import { domainRouter } from "./routers/domain";
import { addressRouter } from "./routers/address";

export const appRouter = router({
  utils: utilsRouter,
  domain: domainRouter,
  address: addressRouter,
});

export type AppRouter = typeof appRouter;
