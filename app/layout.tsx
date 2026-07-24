import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://full-stack-expedition.flyness.chatgpt.site"),
  title: "The Full-Stack Expedition",
  description:
    "Two summers. One team. Countless lessons. Begin a cinematic journey from trailhead to summit.",
  openGraph: {
    title: "The Full-Stack Expedition",
    description: "Two summers. One team. Countless lessons.",
    images: [{ url: "/og-phase3.png", width: 1536, height: 1024, alt: "The Full-Stack Expedition backpack of curiosity" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Full-Stack Expedition",
    description: "Two summers. One team. Countless lessons.",
    images: ["/og-phase3.png"],
  },
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
