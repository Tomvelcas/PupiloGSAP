import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GSAP Awwwards Experience",
  description: "Interactive GSAP-powered experience rebuilt with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
