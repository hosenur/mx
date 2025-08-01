import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [usernameClient()],
  baseURL: "http://localhost:5173/api/auth",
});
