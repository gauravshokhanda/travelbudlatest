// app/layout.tsx
import "./globals.css";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ReduxProvider from "./ReduxProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Set your actual Google Client ID here
const GOOGLE_CLIENT_ID = "406925795962-soepk2ouj346evgarrljp3eou3hg2998.apps.googleusercontent.com";

export const metadata: Metadata = {
  title: "TravelBud - List, Search and Book stays in India",
  description: "List, Search and Book stays in India",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="images/favicon_optimized.png" type="image/png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <ReduxProvider>{children}</ReduxProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
