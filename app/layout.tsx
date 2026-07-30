import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Selected Works | Bea Jean Rowella Esteleydes",
  description: "Architectural portfolio of Bea Jean Rowella Esteleydes.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Selected Works | Bea Jean Rowella Esteleydes",
    description: "Architecture for people, nature, and life.",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
