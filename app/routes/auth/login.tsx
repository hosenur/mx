import { Button } from "~/components/ui/button";
import { TextField } from "~/components/ui/text-field";
import { parseWithZod } from "@conform-to/zod/v4";
import { useForm } from "@conform-to/react";

import { z } from "zod";
import type { Route } from "./+types/login";
import { Form, replace, useActionData } from "react-router";
import { auth } from "~/lib/auth";
const schema = z.object({
  username: z
    .string()
    .min(1)
    .max(30)
    .trim()
    .regex(/^[a-zA-Z0-9_]+$/),
  password: z.string().min(8).max(30).trim(),
});
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const response = await auth.api.signInUsername({
    asResponse: true,
    body: submission.value,
  });
  throw replace("/", {
    headers: response.headers,
  });
}
export default function Page() {
  const lastResult = useActionData<typeof action>();
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="flex items-center h-screen justify-center">
      <Form
        method="post"
        id={form.id}
        onSubmit={form.onSubmit}
        noValidate
        className="w-sm flex flex-col gap-6"
      >
        <img src="/logo.svg" className="w-20" alt="" />
        <TextField
          placeholder="superman"
          label="Handle"
          suffix="@rahaman.email"
          key={fields.username.key}
          name={fields.username.name}
          defaultValue={fields.username.initialValue}
        />
        <TextField
          key={fields.password.key}
          name={fields.password.name}
          defaultValue={fields.password.initialValue}
          placeholder="Super Secret Password"
          label="Password"
          type="password"
        />
        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
}
