import { useState } from "react";

type NewEmailProps = {
  defaultTo?: string;
  defaultSubject?: string;
  defaultBody?: string;
  onSubmit?: (payload: {
    to: string;
    subject: string;
    body: string;
  }) => void | Promise<void>;
  submitting?: boolean;
};

export default function NewEmail({
  defaultTo = "",
  defaultSubject = "",
  defaultBody = "",
  onSubmit,
  submitting = false,
}: NewEmailProps) {
  const [to, setTo] = useState(defaultTo);
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState(defaultBody);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!to.trim() || !subject.trim()) {
      // You can replace this with a toast or inline validation UI as needed
      return;
    }
    await onSubmit?.({ to: to.trim(), subject: subject.trim(), body });
  };

  return (
    <form onSubmit={handleSubmit} className="h-full">
      <article className="space-y-3">
        <header className="-mx-4 px-4 border-b pb-3">
          <h1 className="text-xl font-semibold">New Email</h1>
          <div className="text-sm text-muted-fg">Compose your message</div>
        </header>

        <section className="space-y-3">
          <div className="grid gap-2">
            <label htmlFor="to" className="text-sm text-muted-fg">
              To
            </label>
            <input
              id="to"
              name="to"
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="recipient@example.com"
              className="w-full rounded-md border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="subject" className="text-sm text-muted-fg">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="w-full rounded-md border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="body" className="text-sm text-muted-fg">
              Body
            </label>
            <textarea
              id="body"
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your message..."
              className="w-full min-h-[240px] rounded-md border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className={[
                "inline-flex items-center rounded-md border px-4 py-2",
                "bg-accent text-accent-fg hover:bg-accent/90",
                "disabled:opacity-50 disabled:cursor-not-allowed",
              ].join(" ")}
            >
              {submitting ? "Sending..." : "Send"}
            </button>
          </div>
        </section>
      </article>
    </form>
  );
}
