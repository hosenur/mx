import { z } from 'zod';
import { router, publicProcedure } from '../trpc';

export const greetingRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name || 'World'}!`,
        timestamp: new Date().toISOString(),
      };
    }),

  sayGoodbye: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input }) => {
      return {
        message: `Goodbye, ${input.name}! See you later.`,
        timestamp: new Date().toISOString(),
      };
    }),

  getRandomQuote: publicProcedure
    .query(() => {
      const quotes = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Innovation distinguishes between a leader and a follower. - Steve Jobs",
        "Life is what happens to you while you're busy making other plans. - John Lennon",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
        "It is during our darkest moments that we must focus to see the light. - Aristotle"
      ];

      const randomIndex = Math.floor(Math.random() * quotes.length);

      return {
        quote: quotes[randomIndex],
        timestamp: new Date().toISOString(),
      };
    }),
});
