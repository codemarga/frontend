import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DashboardHeader } from "@/components/dashboard-header";
import { NextAuthProvider } from "@/app/Providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CodeMarga",
  description: "A platform to practice coding problems",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {" "}
        <NextAuthProvider>
          <div>
            <DashboardHeader />
            {children}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
