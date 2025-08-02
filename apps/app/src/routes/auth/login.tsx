import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { TextField } from "@/components/ui/text-field";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { Field, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const res = await authClient.signIn.email({
        email: value.email,
        password: value.password,
      });
      console.log(res);
    },
  });
  return (
    <form
      className="max-w-sm mx-auto flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Field
        name="email"
        children={({ state, handleChange, handleBlur }) => (
          <TextField
            label="Email"
            defaultValue={state.value}
            onChange={(e) => handleChange(e)}
            onBlur={handleBlur}
            placeholder="Enter your email"
          />
        )}
      />
      <Field
        name="password"
        children={({ state, handleChange, handleBlur }) => (
          <TextField
            label="Password"
            defaultValue={state.value}
            onChange={(e) => handleChange(e)}
            onBlur={handleBlur}
            placeholder="Enter your password"
          />
        )}
      />
      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  );
}
