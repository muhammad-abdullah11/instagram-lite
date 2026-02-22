import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PcNavbar from "@/Components/PcNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Instagram",
  description: "Next.js Instagram clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <main className="flex flex-col-reverse md:flex-row min-h-screen">
          <aside className="border-t border-foreground/10 md:border-t-0 md:border-r md:w-20 lg:w-64 shrink-0 overflow-hidden">
            <PcNavbar />
          </aside>
          <section className="flex-1">
            <div className="mx-auto max-w-5xl p-4 md:px-8">
              {children}
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}



