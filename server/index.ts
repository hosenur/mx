import { router } from "./trpc";
import { greetingRouter } from "./routers/greeting";
import { postsRouter } from "./routers/posts";
import { authRouter } from "./routers/auth";

export const appRouter = router({
  auth: authRouter,
  greeting: greetingRouter,
  posts: postsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
