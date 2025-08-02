// server/middleware/cors.ts
export default defineEventHandler(async (event) => {
  const allowedOrigins = ["http://localhost:3000", "https://rahaman.email"];

  const origin = getHeader(event, "origin") as string;
  console.log({origin})
  const allowOrigin = allowedOrigins.includes(origin) ? origin : "false";

  setHeaders(event, {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With, Accept, Origin, X-CSRF-Token, X-Auth-Token, Cache-Control",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400",
    "Access-Control-Expose-Headers": "Authorization, Content-Length, X-JSON",
  });

  if (event.req.method === "OPTIONS") {
    return (event.res.status = 204);
  }
});
