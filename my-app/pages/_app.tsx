import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";
import { AppContextProvider } from "../context/AppContext";
import { MyErrorBoundary } from "../components/common/ErrorBoundary";
import { Session } from "next-auth";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session;
}>) {
  return (
    <MyErrorBoundary>
      <SessionProvider session={session}>
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </SessionProvider>
    </MyErrorBoundary>
  );
}

export default MyApp;
