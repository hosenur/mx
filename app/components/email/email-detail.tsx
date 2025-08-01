import type { Email } from "~/schemas/email";

type EmailWithMeta = Email & {
  id?: string | number;
  createdAt?: string | Date;
};

type EmailDetailProps = {
  email: EmailWithMeta | null;
};

export default function EmailDetail({ email }: EmailDetailProps) {
  if (!email) {
    return (
      <div className="h-full w-full flex items-center justify-center text-muted-fg">
        Select an email to view its contents
      </div>
    );
  }

  return (
    <article className="space-y-3">
      <header className="border-b p-2 h-20 justify-between">
        <h1 className="text-xl font-semibold">{email.subject}</h1>
        <div className="text-sm text-muted-fg">
          From: {email.sender} • To: {email.recipient}
        </div>
      </header>
      <section className="prose dark:prose-invert max-w-none whitespace-pre-wrap p-2">
        {email.body}
      </section>
    </article>
  );
}
