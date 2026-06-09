import type { Metadata } from "next";
import { Bebas_Neue, Oswald, IBM_Plex_Sans } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BarberCraft | Premium Barbershop Toshkent",
  description:
    "Toshkentdagi eng premium sartaroshxona. Professional barberlar, zamonaviy xizmatlar.",
};

export default function BarbershopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${bebasNeue.variable} ${oswald.variable} ${ibmPlexSans.variable}`}
      style={{ fontFamily: "var(--font-body), 'IBM Plex Sans', sans-serif" }}
    >
      {children}
    </div>
  );
}
