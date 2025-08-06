import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "http://localhost:3000",
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;

// Helper function to check if user is authenticated
export const useAuth = () => {
  const session = useSession();

  return {
    user: session.data?.user || null,
    session: session.data || null,
    isLoading: session.isPending,
    isAuthenticated: !!session.data?.user,
    signIn,
    signUp,
    signOut,
  };
};
