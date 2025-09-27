import { trpc } from "@/lib/trpc";
import { useRouter } from "next/router";
import React from "react";

export default function HomePage() {
  const router = useRouter();
  const { data, isLoading } = trpc.utils.status.useQuery();
  if (isLoading) return <div>Loading...</div>;
  if (data?.verified === false) {
    return router.push("/pending");
  }
  return (
    <div>
      <p>welcome</p>
    </div>
  );
}
