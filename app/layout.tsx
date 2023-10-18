"use client"

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RecoilRoot } from "recoil";
import Nav_ from "./components/Nav_";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* @ts-ignore */}
      <title>{metadata?.title}</title>
      <body className={inter.className}>
        <RecoilRoot>
        <Nav_/>
          {children}</RecoilRoot>
      </body>
    </html>
  );
}
