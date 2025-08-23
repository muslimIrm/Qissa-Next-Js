"use client";
import "./globals.css";
import { cairo, El_Messiri, Scheherazade } from "./fonts/fonts";
import { CreateStoryButtonProvider } from "./contexts/CreatStoryContext";
import { IsAuthenticatedProvider } from "./contexts/IsAuthenticatedContext";
import { ToastContainer, toast } from "react-toastify";
import Script from "next/script";

import URL from "./URL";
import axios from "axios";

export default function RootLayout({ children }) {

  return (
    <IsAuthenticatedProvider>
      <CreateStoryButtonProvider>
        <html lang="ar" className={`${cairo.variable} ${El_Messiri.variable} ${Scheherazade.variable}`}>
          <head>
            <link rel="icon" href="/favicon.png" type="image/png" />
            <title>قصة</title>
            <meta
              name="description"
              content="قصة، موقع يعرض قصص العلماء و يساهم في نشر سيرتهم المباركة."
            />
            <meta name="google-site-verification" content="mRiXU7sn0rxHuFB4dpy0LUEHTsd6UTtd7isT5nrK8bI" />
            {/* Google Analytics */}
            <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-F4HV0FVEQZ"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F4HV0FVEQZ', {
              page_path: window.location.pathname,
            });
          `}
            </Script>
          </head>
          <body dir="rtl">
            {children}
            <ToastContainer
              className={"!z-[9999]"}
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={true}
              pauseOnFocusLoss
              draggable
              pauseOnHover

            />
          </body>
        </html>
      </CreateStoryButtonProvider>
    </IsAuthenticatedProvider>
  );
}
