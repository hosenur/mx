import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { auth } from "../lib/auth";

/**
 * Context for tRPC including Better Auth session
 */
export async function createTRPCContext(opts: CreateNextContextOptions) {
  const { req, res } = opts;

  // Get session from Better Auth
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  return {
    session,
    user: session?.user || null,
    req,
    res,
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * Protected procedure that requires authentication
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
      user: ctx.user,
    },
  });
});
