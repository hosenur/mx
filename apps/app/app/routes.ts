import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),route("register","routes/auth/register.tsx"),route("handler","routes/handler.ts")] satisfies RouteConfig;
