import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXTGEN STUDIO - AI Creation Platform",
  description: "Generate videos, images, music, and prompts with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
