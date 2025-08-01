import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/app-layout.tsx", [index("routes/home.tsx")]),
  route("/mail/listener", "routes/listener.ts"),
  route("/auth/register", "routes/auth/register.tsx"),
  route("/auth/login", "routes/auth/login.tsx"),
  route("/api/auth/*", "routes/api/auth.ts"),
  route("/api/summarize", "routes/api/summarize.ts"),
] satisfies RouteConfig;
