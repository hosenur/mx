import { useState } from "react";
import { trpc } from "../utils/trpc";
import Link from "next/link";

export default function Examples() {
  const [selectedPostId, setSelectedPostId] = useState<string>("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");

  // Conditional query - only runs when selectedPostId is provided
  const selectedPostQuery = trpc.posts.getById.useQuery(
    { id: selectedPostId },
    {
      enabled: !!selectedPostId,
      onSuccess: (data) => {
        setUpdateTitle(data.title);
        setUpdateContent(data.content);
      },
    }
  );

  const postsQuery = trpc.posts.getAll.useQuery();

  const updatePostMutation = trpc.posts.update.useMutation({
    onSuccess: () => {
      postsQuery.refetch();
      selectedPostQuery.refetch();
      setSelectedPostId("");
      setUpdateTitle("");
      setUpdateContent("");
    },
  });

  const handleUpdatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPostId && (updateTitle || updateContent)) {
      updatePostMutation.mutate({
        id: selectedPostId,
        title: updateTitle || undefined,
        content: updateContent || undefined,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            tRPC Advanced Examples
          </h1>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>

        {/* Conditional Queries Example */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Conditional Queries & Post Updates
          </h2>
          <p className="text-gray-600 mb-4">
            This demonstrates conditional queries that only run when certain conditions are met.
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select a Post to Edit:
            </label>
            <select
              value={selectedPostId}
              onChange={(e) => setSelectedPostId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a post...</option>
              {postsQuery.data?.map((post) => (
                <option key={post.id} value={post.id}>
                  {post.title}
                </option>
              ))}
            </select>
          </div>

          {selectedPostQuery.isLoading && (
            <div className="p-4 bg-blue-50 rounded-md mb-4">
              <p className="text-blue-700">Loading selected post...</p>
            </div>
          )}

          {selectedPostQuery.error && (
            <div className="p-4 bg-red-50 rounded-md mb-4">
              <p className="text-red-700">Error: {selectedPostQuery.error.message}</p>
            </div>
          )}

          {selectedPostQuery.data && (
            <form onSubmit={handleUpdatePost} className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-md mb-4">
                <h3 className="font-medium text-yellow-900 mb-2">Current Post:</h3>
                <p className="text-yellow-800">
                  <strong>Title:</strong> {selectedPostQuery.data.title}
                </p>
                <p className="text-yellow-800">
                  <strong>Content:</strong> {selectedPostQuery.data.content}
                </p>
                <p className="text-sm text-yellow-600">
                  Created: {new Date(selectedPostQuery.data.createdAt).toLocaleString()}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Title (leave empty to keep current):
                </label>
                <input
                  type="text"
                  value={updateTitle}
                  onChange={(e) => setUpdateTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter new title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Content (leave empty to keep current):
                </label>
                <textarea
                  value={updateContent}
                  onChange={(e) => setUpdateContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter new content"
                  rows={3}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={updatePostMutation.isLoading || (!updateTitle && !updateContent)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {updatePostMutation.isLoading ? "Updating..." : "Update Post"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPostId("");
                    setUpdateTitle("");
                    setUpdateContent("");
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Error Handling Example */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Error Handling Example
          </h2>
          <p className="text-gray-600 mb-4">
            Try to fetch a post that doesn't exist to see error handling in action.
          </p>

          <ErrorHandlingExample />
        </div>

        {/* Query State Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Query State Information
          </h2>
          <p className="text-gray-600 mb-4">
            This shows the various states available in tRPC queries.
          </p>

          <QueryStateExample />
        </div>
      </div>
    </div>
  );
}

function ErrorHandlingExample() {
  const [postId, setPostId] = useState("");
  const [queryKey, setQueryKey] = useState(0);

  const postQuery = trpc.posts.getById.useQuery(
    { id: postId },
    {
      enabled: !!postId,
      retry: 1,
      onError: (error) => {
        console.error("Query failed:", error);
      },
    }
  );

  const handleFetchPost = () => {
    if (postId) {
      // Force refetch by changing query key
      setQueryKey(prev => prev + 1);
      postQuery.refetch();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Enter post ID (try 'nonexistent')"
        />
        <button
          onClick={handleFetchPost}
          disabled={!postId || postQuery.isLoading}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
        >
          {postQuery.isLoading ? "Loading..." : "Fetch Post"}
        </button>
      </div>

      {postQuery.error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <h4 className="font-medium text-red-900">Error occurred:</h4>
          <p className="text-red-700">{postQuery.error.message}</p>
          <p className="text-sm text-red-600 mt-2">
            Error code: {postQuery.error.data?.code || 'UNKNOWN'}
          </p>
        </div>
      )}

      {postQuery.data && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <h4 className="font-medium text-green-900">Success!</h4>
          <p className="text-green-700">
            Found post: <strong>{postQuery.data.title}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

function QueryStateExample() {
  const quotesQuery = trpc.greeting.getRandomQuote.useQuery(undefined, {
    refetchInterval: 10000, // Refetch every 10 seconds
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 bg-gray-100 rounded-md">
          <h4 className="font-medium text-gray-900">Loading</h4>
          <p className={`text-sm ${quotesQuery.isLoading ? 'text-green-600' : 'text-gray-600'}`}>
            {quotesQuery.isLoading ? 'Yes' : 'No'}
          </p>
        </div>
        <div className="p-3 bg-gray-100 rounded-md">
          <h4 className="font-medium text-gray-900">Error</h4>
          <p className={`text-sm ${quotesQuery.error ? 'text-red-600' : 'text-gray-600'}`}>
            {quotesQuery.error ? 'Yes' : 'No'}
          </p>
        </div>
        <div className="p-3 bg-gray-100 rounded-md">
          <h4 className="font-medium text-gray-900">Fetching</h4>
          <p className={`text-sm ${quotesQuery.isFetching ? 'text-blue-600' : 'text-gray-600'}`}>
            {quotesQuery.isFetching ? 'Yes' : 'No'}
          </p>
        </div>
        <div className="p-3 bg-gray-100 rounded-md">
          <h4 className="font-medium text-gray-900">Stale</h4>
          <p className={`text-sm ${quotesQuery.isStale ? 'text-orange-600' : 'text-gray-600'}`}>
            {quotesQuery.isStale ? 'Yes' : 'No'}
          </p>
        </div>
      </div>

      <div className="p-4 bg-blue-50 rounded-md">
        <h4 className="font-medium text-blue-900 mb-2">Auto-refreshing Quote:</h4>
        {quotesQuery.data && (
          <div>
            <p className="text-blue-800 italic">"{quotesQuery.data.quote}"</p>
            <p className="text-sm text-blue-600 mt-2">
              Last updated: {quotesQuery.data.timestamp}
            </p>
          </div>
        )}
        <p className="text-sm text-blue-600 mt-2">
          This query automatically refetches every 10 seconds
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => quotesQuery.refetch()}
          disabled={quotesQuery.isFetching}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Manual Refetch
        </button>
        <button
          onClick={() => quotesQuery.remove()}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Remove Query
        </button>
      </div>
    </div>
  );
}
