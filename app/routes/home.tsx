import { auth } from "~/lib/auth";
import type { Route } from "./+types/home";
import { prisma } from "~/lib/prisma";
import { redirect, useNavigate } from "react-router";
import { useState } from "react";
import type { Email } from "~/schemas/email";
import EmailListItem from "~/components/email/email-list-item";
import EmailDetail from "~/components/email/email-detail";
import {marked} from "marked";
import axios from "axios";
import useSWR from "swr";
const fetcher = (url: string): Promise<any> =>
  axios.get(url).then((res) => res.data);

type PrismaEmail = Email & {
  id?: string | number;
  createdAt?: string | Date;
};

export async function loader({ params, request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  const id = url.searchParams.get("id") || undefined;

  if (id) {
    await prisma.email.update({
      where: { id },

      data: { read: true },
    });
  }

  const data = await auth.api.getSession({ headers: request.headers });

  if (!data) {
    return redirect("/auth/login");
  }

  const emails = await prisma.email.findMany({
    where: {
      recipient: data?.user?.email,
    },

    select: {
      id: true,
      subject: true,
      body: true,
      sender: true,
      recipient: true,
      createdAt: true,
      read: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
  console.log(emails)

  let email = null;

  if (id) {
    email = await prisma.email.findUnique({ where: { id } });
  }

  return {
    emails,

    email, // This will be null if no id in the URL!
  };
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();

  const { emails, email } = loaderData as {
    emails: PrismaEmail[];

    email: PrismaEmail;

    recipe: string;
  };

  const [selectedEmail, setSelectedEmail] = useState<PrismaEmail | null>(null);
  const { data, error } = useSWR("/api/summarize", fetcher);
  console.log({ data, error });

  return (
    <div className="grid grid-cols-12 ">
      <div className="col-span-12 prose dark:prose-invert  border-b-0 border p-2" dangerouslySetInnerHTML={{ __html: marked.parse(data||"") }}>
      </div>
      <div className="flex divide-y flex-col border h-full flex-1 col-span-3 border-r-0">
        {emails?.map((email) => (
          <EmailListItem
            key={email.id}
            email={email}
            selected={selectedEmail?.id === email.id}
          />
        ))}
      </div>
      <div className="col-span-9 border">
        <EmailDetail email={email} />
      </div>
    </div>
  );
}
