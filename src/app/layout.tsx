import type { Metadata, Viewport } from "next";
import { Nunito, Roboto } from "next/font/google";
import { AppProviders } from "@/contexts/AppProviders";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MediSpark",
  description: "医学の学習に火をつける。科目別で学ぶ、継続したくなる医療系学習アプリ",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MediSpark",
  },
};

export const viewport: Viewport = {
  themeColor: "#58cc02",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${nunito.variable} ${roboto.variable}`}>
      <body className="font-roboto antialiased">
        <AppProviders>
          <ServiceWorkerRegistration />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
