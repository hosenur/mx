import { auth } from "../../../lib/auth";
import { defineHandler } from "h3"; // Use defineHandler in v2 (replaces defineEventHandler)

export default defineHandler(async (event) => {
  // Pass the native Request directly to auth.handler
  const response = await auth.handler(event.req);
  
  // Optionally log for debugging (remove in production)
  console.log("Auth response:", response);
  
  // Return the response—H3 v2 handles it automatically
  return response;
});
