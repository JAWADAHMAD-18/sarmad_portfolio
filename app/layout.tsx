import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { DevBadge } from "@/components/layout/dev-badge";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { PageTransition } from "@/components/ui/page-transition";
import { chrome } from "@/lib/chrome";
import { getPublicContent } from "@/lib/getPublicContent";
import { getRobotsMetadata, getSiteUrl } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const fonts = `${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`;

export function generateMetadata(): Metadata {
  const content = getPublicContent();
  const siteUrl = getSiteUrl();
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: content.meta.name,
      template: `%s | ${content.meta.name}`,
    },
    description: content.meta.tagline,
    robots: getRobotsMetadata(),
    ...(googleVerification
      ? {
          verification: {
            google: googleVerification,
          },
        }
      : {}),
    openGraph: {
      type: "website",
      siteName: content.meta.name,
      title: content.meta.name,
      description: content.meta.tagline,
      url: siteUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.name,
      description: content.meta.tagline,
    },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className={`${fonts} flex min-h-full flex-col font-sans antialiased`}>
        <ThemeProvider>
          <a href="#main" className="skip-link">
            {chrome.skip}
          </a>
          <Header />
          <main id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <DevBadge />
        </ThemeProvider>
      </body>
    </html>
  );
}
