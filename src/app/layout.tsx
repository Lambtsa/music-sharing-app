import "./globals.css";

import Script from "next/script";
import { type ReactNode } from "react";
import { Toaster } from "sonner";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

import { AppProviders } from "./AppProviders";


type LayoutProps = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: LayoutProps) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="apple-touch-icon" href="/logo192.png" />
      <link rel="apple-touch-icon" href="/logo192.png" />
      {/* enable google analytics script */}
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.GTAG}');
        `}
      </Script>
    </head>
    <body suppressHydrationWarning className="h-screen overflow-hidden">
      <AppProviders>
        <Header />
        {children}
        <Footer />
      </AppProviders>
      <Toaster
        position='top-right'
        visibleToasts={2}
        theme='dark'
        closeButton
        toastOptions={{
          duration: 3000
        }}
      />
    </body>
  </html>
);

export default RootLayout;
