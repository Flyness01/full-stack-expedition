import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Full-Stack Expedition",
  description:
    "Two summers. One team. Countless lessons. Begin a cinematic journey from trailhead to summit.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
