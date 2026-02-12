import type { Metadata } from "next";
import "./globals.css";
import { Navigation, Footer } from "@/components/Layout";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  title: "💕 วันครบรอบของเรา | Our Anniversary",
  description: "เว็บไซต์วันครบรอบที่เต็มไปด้วยความรักและความทรงจำ | Anniversary website filled with love and memories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="scroll-smooth">
      <body className="antialiased">
        <LanguageProvider>
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
