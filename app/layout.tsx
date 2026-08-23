import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://obscura-tattoo.melnichenkomariia.chatgpt.site"),
  title: "OBSCURA — авторські татуювання та індивідуальні ескізи",
  description: "Авторські татуювання у графіці, реалізмі, орнаменті та кольорі. Розроблення індивідуального ескізу й запис на сеанс.",
  alternates: { canonical: "/" },
  openGraph: { title: "OBSCURA — не вибирай татуювання. Створи своє.", description: "Авторські ескізи й татуювання від першої ідеї до загоєної роботи.", type: "website", locale: "uk_UA", url: "/", siteName: "OBSCURA", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "OBSCURA — авторські татуювання" }] },
  twitter: { card: "summary_large_image", title: "OBSCURA — авторські татуювання", description: "Авторські ескізи й татуювання від першої ідеї до загоєної роботи.", images: ["/og.jpg"] },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="uk"><body>{children}</body></html>;
}
