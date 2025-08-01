import { Button } from "~/components/ui/button";
import { TextField } from "~/components/ui/text-field";
import { parseWithZod } from "@conform-to/zod/v4";
import { useForm } from "@conform-to/react";

import { z } from "zod";
import { Form, useActionData } from "react-router";
import { authClient } from "~/lib/auth-client";
import { prisma } from "~/lib/prisma";
import type { Route } from "./+types/register";
const schema = z.object({
  username: z
    .string()
    .min(1)
    .max(30)
    .trim()
    .regex(/^[a-zA-Z0-9_]+$/),
  displayName: z.string().min(1).max(30).trim(),
  password: z.string().min(8).max(30).trim(),
});
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const { data, error } = await authClient.signUp.email({
    email: `${submission.value.username}@rahaman.email`,
    name: submission.value.displayName,
    password: submission.value.password,
    username: submission.value.username,
  });
  const mail = await prisma.email.create({
    data: {
      body: "Welcome to Mail",
      sender: "Team Mail",
      recipient: `${submission.value.username}@rahaman.email`,
      subject: "Welcome to Mail",
    },
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
        <TextField
          placeholder="superman"
          label="Handle"
          suffix="@rahaman.email"
          key={fields.username.key}
          name={fields.username.name}
          defaultValue={fields.username.initialValue}
        />
        <TextField
          key={fields.displayName.key}
          name={fields.displayName.name}
          defaultValue={fields.displayName.initialValue}
          placeholder="Clark Kent"
          label="Display Name"
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
