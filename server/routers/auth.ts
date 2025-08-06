import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';

export const authRouter = router({
  // Get current user session
  getSession: publicProcedure
    .query(({ ctx }) => {
      return {
        user: ctx.user,
        session: ctx.session,
      };
    }),

  // Get user profile (protected)
  getProfile: protectedProcedure
    .query(({ ctx }) => {
      return {
        id: ctx.user.id,
        email: ctx.user.email,
        name: ctx.user.name,
        image: ctx.user.image,
        createdAt: ctx.user.createdAt,
        updatedAt: ctx.user.updatedAt,
      };
    }),

  // Update user profile (protected)
  updateProfile: protectedProcedure
    .input(z.object({
      name: z.string().min(1, 'Name is required').optional(),
      email: z.string().email('Invalid email').optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // In a real app, you would update the user in the database
      // For now, we'll just return the updated user data
      return {
        success: true,
        message: 'Profile updated successfully',
        user: {
          ...ctx.user,
          ...input,
        },
      };
    }),

  // Check if user has specific permissions
  hasPermission: protectedProcedure
    .input(z.object({
      permission: z.string(),
    }))
    .query(({ ctx, input }) => {
      // Simple permission check - in a real app, you'd check against a permissions system
      const userPermissions = ['read', 'write']; // Mock permissions
      return {
        hasPermission: userPermissions.includes(input.permission),
        userPermissions,
      };
    }),

  // Get user statistics (protected)
  getUserStats: protectedProcedure
    .query(({ ctx }) => {
      // Mock user statistics
      return {
        userId: ctx.user.id,
        totalPosts: 5,
        totalComments: 12,
        joinedDays: Math.floor((Date.now() - new Date(ctx.user.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
        lastLoginAt: ctx.session.createdAt,
      };
    }),
});
