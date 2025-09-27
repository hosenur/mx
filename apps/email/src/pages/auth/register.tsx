import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { trpc } from "@/lib/trpc";
import { revalidateLogic, useForm } from "@tanstack/react-form";
import { z } from "zod";
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  domain: z.string().min(1, "Domain is required"),
  password: z.string().min(1, "Password is required"),
});
export default function RegisterPage() {
  const { data } = trpc.domain.getDomains.useQuery();
  const mutation = trpc.address.create.useMutation();
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      name: "",
      domain: "",
    },
    // If this is omitted, onDynamic will not be called
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: schema,
    },
    onSubmit: async ({ value }) => {
      const { email } = await mutation.mutateAsync({
        username: value.username,
        domain: value.domain,
      });
      if (!email) {
        throw new Error("Email not created");
      }
      const { data } = await authClient.signUp.email({
        password: value.password,
        name: value.name,
        email: email?.address,
      });
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex items-center space-x-1.5">
            <p className="font-medium text-lg text-foreground dark:text-foreground">
              Acme
            </p>
          </div>
          <h3 className="mt-6 text-lg font-semibold text-foreground dark:text-foreground">
            Create your account
          </h3>
          <p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground">
            Already have an account?{" "}
            <a
              href="#"
              className="font-medium text-primary hover:text-primary/90 dark:text-primary hover:dark:text-primary/90"
            >
              Sign in
            </a>
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="mt-8 space-y-4"
          >
            <div>
              <form.Field name="name">
                {(field) => (
                  <>
                    <Label
                      htmlFor="name-register"
                      className="text-sm font-medium text-foreground dark:text-foreground"
                    >
                      Name
                    </Label>
                    <Input
                      type="text"
                      id="name-register"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="John Doe"
                      className="mt-2"
                    />
                  </>
                )}
              </form.Field>
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <form.Field name="username">
                  {(field) => (
                    <>
                      <Label
                        htmlFor="username-register"
                        className="text-sm font-medium text-foreground dark:text-foreground"
                      >
                        Username
                      </Label>
                      <Input
                        type="text"
                        id="username-register"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="johndoe"
                        className="mt-2"
                      />
                    </>
                  )}
                </form.Field>
              </div>
              <div className="flex-1">
                <form.Field name="domain">
                  {(field) => (
                    <>
                      <Label
                        htmlFor="domain-register"
                        className="text-sm font-medium text-foreground dark:text-foreground"
                      >
                        Domain
                      </Label>
                      <Select
                        value={field.state.value}
                        onValueChange={(value) => field.handleChange(value)}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select a domain" />
                        </SelectTrigger>
                        <SelectContent>
                          {data?.domains?.map((d) => (
                            <SelectItem key={d.id} value={d.id}>
                              {d.domain}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </>
                  )}
                </form.Field>
              </div>
            </div>
            <div>
              <form.Field name="password">
                {(field) => (
                  <>
                    <Label
                      htmlFor="password-register"
                      className="text-sm font-medium text-foreground dark:text-foreground"
                    >
                      Password
                    </Label>
                    <Input
                      type="password"
                      id="password-register"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="********"
                      className="mt-2"
                    />
                  </>
                )}
              </form.Field>
            </div>
            <Button type="submit" className="mt-4 w-full py-2 font-medium">
              Create account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
