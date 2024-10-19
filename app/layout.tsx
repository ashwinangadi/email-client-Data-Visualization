import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/providers/Providers";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar/navbar";

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
  title: "Moonshot",
  description: "email client and interactive data visualization app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Provider>
          <Navbar />
          {children}
          <Toaster
            richColors
            expand={false}
            position="bottom-center"
            closeButton
            theme="light"
          />
        </Provider>
      </body>
    </html>
  );
}
