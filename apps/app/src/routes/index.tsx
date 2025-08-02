import { useURL } from "@/hooks/useURL";
import { queryClient } from "@/lib/query";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";

const emailsQueryOptions = queryOptions({
  queryKey: ["emails"],
  queryFn: async () => {
    const URL = useURL("emails");
    const { data } = await axios.get(URL);
    return data;
  },
});
export const Route = createFileRoute("/")({
  loader: () => queryClient.ensureQueryData(emailsQueryOptions),
  component: Page,
});
function Page() {
  const { data } = useSuspenseQuery(emailsQueryOptions);
  console.log({data})
  return <div>
    hello
  </div>;
}
