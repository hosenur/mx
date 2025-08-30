import type { Route } from "./+types/handler";
import { Welcome } from "../welcome/welcome";

export async function action({ context, request }: Route.ActionArgs) {
  let payload = await request.formData();
  console.log(payload);
  return { message: context.VALUE_FROM_NETLIFY };
}
