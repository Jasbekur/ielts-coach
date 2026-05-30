import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,   // prevents auto-zoom on input focus on iOS
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f8ff" },
    { media: "(prefers-color-scheme: dark)",  color: "#1e1b2e" },
  ],
};

export const metadata: Metadata = {
  title: "IELTS Sensei",
  description:
    "Instant, examiner-grade feedback on IELTS Writing and Speaking. Get band scores per criterion + actionable corrections in under 15 seconds.",
  openGraph: {
    title: "IELTS Sensei",
    description: "AI-powered IELTS preparation for Writing & Speaking",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "IELTS Sensei",
    description: "AI-powered IELTS preparation for Writing & Speaking",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable} ${lora.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {/* Bottom-center on mobile so toasts don't clash with browser chrome */}
        <Toaster richColors closeButton position="bottom-center"
          toastOptions={{ classNames: { toast: "md:!translate-x-0" } }} />
      </body>
    </html>
  );
}
