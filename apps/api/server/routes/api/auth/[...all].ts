import { auth } from "../../../lib/auth";
import { defineHandler } from "h3"; // Use defineHandler in v2 (replaces defineEventHandler)

export default defineHandler(async (event) => {
  const response = await auth.handler(event.req);  
  return response;
});