import moment from "moment";
import { Link } from "react-router";
import type { Email } from "~/schemas/email";

type EmailListItemProps = {
  email: Email & {
    id?: string | number;
    createdAt?: string | Date;
    read?: boolean;
  };
  onSelect?: (email: EmailListItemProps["email"]) => void;
  selected?: boolean;
};

export default function EmailListItem({
  email,
  onSelect,
  selected = false,
}: EmailListItemProps) {
  const isUnread = email.read === false;

  return (
    <Link
      to={`?id=${email.id}`}
      type="button"
      prefetch="viewport"
      className={[
        "text-left p-2 flex flex-col gap-1 hover:bg-accent/40 focus:bg-accent outline-none h-20",
        "transition-colors",
        selected ? "bg-accent" : "",
      ].join(" ")}
      onClick={() => onSelect?.(email)}
    >
      <div className="justify-between items-center  ">
        <p className="text-sm text-muted-fg">{email.sender}</p>

        <p className="text-sm text-muted-fg flex gap-2 items-center">
          {isUnread && (
            <span
              aria-label="Unread"
              className="inline-block h-2 w-2 rounded-full bg-accent"
            />
          )}
          {email.createdAt ? moment(email.createdAt).fromNow() : ""}
        </p>
      </div>
      <p>{email.subject}</p>
    </Link>
  );
}
