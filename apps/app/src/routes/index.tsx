import { queryClient } from "@/lib/query";
import { queryOptions } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const emailsQueryOptions = queryOptions({
  queryKey: ["emails"],
  queryFn: async () => {
    const res = await fetch("http://localhost:3001/emails");
    return { hi: "there" };
  },
});
export const Route = createFileRoute("/")({
  loader: queryClient.ensureQueryData(emailsQueryOptions),
  component: Page,
});
function Page() {
  return <div>hello world</div>;
}
