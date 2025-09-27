import type { AppType } from "next/app";
import { trpc } from "../lib/trpc";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
};
export default trpc.withTRPC(MyApp);
