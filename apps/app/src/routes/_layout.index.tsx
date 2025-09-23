import { createFileRoute } from "@tanstack/react-router";
import logo from "../logo.svg";
import { useEmails } from "@/contexts/EmailContext";
import  { ThemeSwitcher } from "@/components/theme-switcher";

export const Route = createFileRoute("/_layout/")({
  component: HomePage,
});

function HomePage() {
  const { emails } = useEmails();
  return (
    <div>
      <ThemeSwitcher />
    </div>
  );
}
