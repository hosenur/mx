import { queryClient } from "@/lib/query";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";

const emailsQueryOptions = queryOptions({
  queryKey: ["emails"],
  queryFn: async () => {
    const { data } = await axios.get("http://localhost:3001/emails");
    return data;
  },
});
export const Route = createFileRoute("/")({
  loader: () => queryClient.ensureQueryData(emailsQueryOptions),
  component: Page,
});
function Page() {
  const { data } = useSuspenseQuery(emailsQueryOptions);
  return <div>{JSON.stringify(data)}</div>;
}
