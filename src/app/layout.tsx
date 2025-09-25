import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar/Navbar";
import "../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import { Toaster } from "@/components/ui/sonner";
import MySessionProvider from "./MySessionProvider/MySessionProvider";
import CartContextProvider from "@/context/CartContext";
import Footer from "./_components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Freshcart",
  description: "An E-commerce site created by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <MySessionProvider>
          <CartContextProvider>
            <Navbar />
            <main className="flex-grow ">{children}</main>

            <Toaster />
            <Footer />
          </CartContextProvider>
        </MySessionProvider>
      </body>
    </html>
  );
}
