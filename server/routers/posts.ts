import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

// Mock database with author information
let posts = [
  {
    id: "1",
    title: "Hello World",
    content: "This is my first post!",
    authorId: "user1",
    authorName: "John Doe",
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    title: "tRPC is awesome",
    content: "Learning tRPC with Next.js",
    authorId: "user2",
    authorName: "Jane Smith",
    createdAt: new Date("2024-01-02"),
  },
];

export const postsRouter = router({
  getAll: publicProcedure.query(() => {
    return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const post = posts.find((p) => p.id === input.id);
      if (!post) {
        throw new Error("Post not found");
      }
      return post;
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1, "Title is required"),
        content: z.string().min(1, "Content is required"),
      }),
    )
    .mutation(({ input, ctx }) => {
      const newPost = {
        id: (posts.length + 1).toString(),
        title: input.title,
        content: input.content,
        authorId: ctx.user.id,
        authorName: ctx.user.name || ctx.user.email,
        createdAt: new Date(),
      };
      posts.push(newPost);
      return newPost;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1, "Title is required").optional(),
        content: z.string().min(1, "Content is required").optional(),
      }),
    )
    .mutation(({ input, ctx }) => {
      const postIndex = posts.findIndex((p) => p.id === input.id);
      if (postIndex === -1) {
        throw new Error("Post not found");
      }

      // Check if user owns the post
      if (posts[postIndex].authorId !== ctx.user.id) {
        throw new Error("You can only update your own posts");
      }

      const updatedPost = {
        ...posts[postIndex],
        ...(input.title && { title: input.title }),
        ...(input.content && { content: input.content }),
      };

      posts[postIndex] = updatedPost;
      return updatedPost;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      const postIndex = posts.findIndex((p) => p.id === input.id);
      if (postIndex === -1) {
        throw new Error("Post not found");
      }

      // Check if user owns the post
      if (posts[postIndex].authorId !== ctx.user.id) {
        throw new Error("You can only delete your own posts");
      }

      const deletedPost = posts[postIndex];
      posts = posts.filter((p) => p.id !== input.id);
      return deletedPost;
    }),

  // Get posts by current user
  getMyPosts: protectedProcedure.query(({ ctx }) => {
    return posts
      .filter((p) => p.authorId === ctx.user.id)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }),
});
