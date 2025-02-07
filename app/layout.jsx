import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HealthDonald",
  description: "Start eating healthy burgers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased",
          "h-full bg-white dark:bg-black"
        )}
      >
        <Toaster />
        <div className="relative m-auto flex max-h-full min-h-full max-w-md flex-col gap-2 border-x py-2">
          <Header />
          <div className="flex-1 pt-2">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
