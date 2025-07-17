"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNav from "@/component/nav/TopNav";
import Navbar from "@/component/nav/Navbar";
import { SessionProvider } from "next-auth/react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

import { ToastContainer } from "react-toastify";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Provider } from "react-redux";
import { store } from "./store";
import { usePathname } from "next/navigation";
export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAsminDashboard = pathname === "/dashboard/admin";

  return (
    <html lang="en">
      <SessionProvider>
        <Provider store={store}>
          <body className={`${geistSans.variable} ${geistMono.variable}`}>
            <ToastContainer />

            {!isAsminDashboard && (
              <>
                <TopNav />
                <Navbar />
              </>
            )}
            {children}
          </body>
        </Provider>
      </SessionProvider>
    </html>
  );
}
