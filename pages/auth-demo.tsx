import { useState } from "react";
import { useAuth } from "../lib/auth-client";
import { trpc } from "../lib/trpc";
import Link from "next/link";

export default function AuthDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, session, isLoading, isAuthenticated, signIn, signUp, signOut } = useAuth();

  // tRPC queries that require authentication
  const sessionQuery = trpc.auth.getSession.useQuery();
  const profileQuery = trpc.auth.getProfile.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const userStatsQuery = trpc.auth.getUserStats.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const myPostsQuery = trpc.posts.getMyPosts.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        await signUp.email({ email, password, name });
      } else {
        await signIn.email({ email, password });
      }
      // Refetch queries after successful auth
      sessionQuery.refetch();
      profileQuery.refetch();
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      // Invalidate queries after sign out
      sessionQuery.refetch();
    } catch (err: any) {
      setError(err.message || "Sign out failed");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Better Auth + tRPC Demo
          </h1>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>

        {!isAuthenticated ? (
          // Authentication Form
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
              {isSignUp ? "Sign Up" : "Sign In"}
            </h2>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                    required={isSignUp}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </div>
        ) : (
          // Authenticated User Dashboard
          <div className="space-y-8">
            {/* Session Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Welcome, {user?.name || user?.email}!
                </h2>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Sign Out
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-md">
                  <h3 className="font-medium text-blue-900 mb-2">Session Info</h3>
                  {sessionQuery.data ? (
                    <div className="text-blue-800 text-sm">
                      <p>User ID: {sessionQuery.data.user?.id}</p>
                      <p>Email: {sessionQuery.data.user?.email}</p>
                      <p>Session: {sessionQuery.data.session ? "Active" : "None"}</p>
                    </div>
                  ) : (
                    <p className="text-blue-700">Loading session...</p>
                  )}
                </div>

                <div className="p-4 bg-green-50 rounded-md">
                  <h3 className="font-medium text-green-900 mb-2">Profile Data</h3>
                  {profileQuery.data ? (
                    <div className="text-green-800 text-sm">
                      <p>Name: {profileQuery.data.name || "Not set"}</p>
                      <p>Created: {new Date(profileQuery.data.createdAt).toLocaleDateString()}</p>
                      <p>Updated: {new Date(profileQuery.data.updatedAt).toLocaleDateString()}</p>
                    </div>
                  ) : profileQuery.isLoading ? (
                    <p className="text-green-700">Loading profile...</p>
                  ) : (
                    <p className="text-red-700">Failed to load profile</p>
                  )}
                </div>
              </div>
            </div>

            {/* User Statistics */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Your Statistics
              </h2>
              {userStatsQuery.data ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-md">
                    <div className="text-2xl font-bold text-purple-600">
                      {userStatsQuery.data.totalPosts}
                    </div>
                    <div className="text-sm text-purple-800">Total Posts</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-md">
                    <div className="text-2xl font-bold text-orange-600">
                      {userStatsQuery.data.totalComments}
                    </div>
                    <div className="text-sm text-orange-800">Comments</div>
                  </div>
                  <div className="text-center p-4 bg-teal-50 rounded-md">
                    <div className="text-2xl font-bold text-teal-600">
                      {userStatsQuery.data.joinedDays}
                    </div>
                    <div className="text-sm text-teal-800">Days Joined</div>
                  </div>
                  <div className="text-center p-4 bg-pink-50 rounded-md">
                    <div className="text-2xl font-bold text-pink-600">
                      {new Date(userStatsQuery.data.lastLoginAt).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-pink-800">Last Login</div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">Loading statistics...</p>
              )}
            </div>

            {/* User's Posts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Your Posts
              </h2>
              {myPostsQuery.data ? (
                myPostsQuery.data.length > 0 ? (
                  <div className="space-y-4">
                    {myPostsQuery.data.map((post) => (
                      <div
                        key={post.id}
                        className="border border-gray-200 rounded-md p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            {post.title}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{post.content}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Author: {post.authorName}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">
                    You haven't created any posts yet. Go to the{" "}
                    <Link href="/" className="text-blue-600 hover:text-blue-700">
                      home page
                    </Link>{" "}
                    to create your first post!
                  </p>
                )
              ) : (
                <p className="text-gray-600">Loading your posts...</p>
              )}
            </div>

            {/* tRPC Integration Info */}
            <div className="bg-gray-100 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Authentication Integration Details
              </h2>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  • <strong>Better Auth:</strong> Handles authentication with email/password
                </p>
                <p>
                  • <strong>tRPC Context:</strong> Session and user data available in all procedures
                </p>
                <p>
                  • <strong>Protected Procedures:</strong> Require authentication to access
                </p>
                <p>
                  • <strong>Public Procedures:</strong> Available without authentication
                </p>
                <p>
                  • <strong>Automatic Headers:</strong> Cookies sent with tRPC requests
                </p>
                <p>
                  • <strong>Real-time Updates:</strong> Queries refetch after auth state changes
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
