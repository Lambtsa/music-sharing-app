import './globals.css';

import { type ReactNode } from 'react';

import { AppProviders } from './AppProviders';


type LayoutProps = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: LayoutProps) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />

      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/logo192.png" />
      <link rel="canonical" href="" />
      <link rel="apple-touch-icon" href="/logo192.png" />
      {/* enable google analytics script */}
      {/* TODO: add preconnect to google.tagmanager.com */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG}`}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', '${process.env.GTAG}');
        `,
        }}
      />
    </head>
    <body className="flex h-screen flex-col overflow-hidden bg-[#F7F8F9]">
      <AppProviders>
        {children}
      </AppProviders>
      <div
        id="toast-root"
        className="fixed right-4 top-4 z-toast flex flex-col gap-2"
      />
    </body>
  </html>
);

export default RootLayout;
