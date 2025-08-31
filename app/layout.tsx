import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import { Quicksand } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { PWAProvider } from "@/components/pwa-provider";

const quicksand = Quicksand({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cheghadshod.ir'),
  title: {
    default: "چقدر شد؟ | قیمت ارز و طلا | Currency & Gold Tracker",
    template: "%s | چقدر شد؟"
  },
  description: "قیمت لحظه‌ای ارز، طلا و سکه در ایران. پیگیری نرخ ارز، قیمت طلا و سکه با به‌روزرسانی خودکار. Real-time currency, gold and coin prices in Iran.",
  keywords: [
    "قیمت ارز", "قیمت یورو", "قیمت دلار", "قیمت طلا", "قیمت سکه", "نرخ ارز", "ارز دیجیتال", "طلا و جواهر",
    "currency prices", "gold prices", "exchange rates", "Iran currency", "Iran gold",
    "real-time prices", "financial tracker", "PWA", "cheghadshod", "چقدر شد"
  ],
  authors: [{ name: "Sina Zare", url: "https://github.com/sina-sparkn" }],
  creator: "Sina Zare",
  publisher: "Sina Zare",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://cheghadshod.ir',
    languages: {
      'fa-IR': 'https://cheghadshod.ir/fa',
      'en-US': 'https://cheghadshod.ir/en',
    },
  },
  openGraph: {
    title: "چقدر شد؟ | قیمت ارز و طلا | Currency & Gold Tracker",
    description: "قیمت لحظه‌ای ارز، طلا و سکه در ایران. پیگیری نرخ ارز، قیمت طلا و سکه با به‌روزرسانی خودکار.",
    type: "website",
    locale: "fa_IR",
    siteName: "چقدر شد؟",
    url: "https://cheghadshod.ir",
    images: [
      {
        url: "https://cheghadshod.ir/og-image.png",
        width: 1200,
        height: 630,
        alt: "چقدر شد؟ - قیمت ارز و طلا",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "چقدر شد؟ | قیمت ارز و طلا | Currency & Gold Tracker",
    description: "قیمت لحظه‌ای ارز، طلا و سکه در ایران. پیگیری نرخ ارز، قیمت طلا و سکه با به‌روزرسانی خودکار.",
    images: ["https://cheghadshod.ir/og-image.png"],
    creator: "@sina_sparkn",
  },
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "چقدر شد؟",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "چقدر شد؟",
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
    "application-name": "چقدر شد؟",
    "msapplication-TileImage": "/web-app-manifest-192x192.png",
    "theme-color": "#000000",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "finance",
  classification: "currency tracker, financial app",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/web-app-manifest-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="چقدر شد؟" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/web-app-manifest-192x192.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="چقدر شد؟" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "چقدر شد؟",
              "alternateName": "Currency & Gold Tracker",
              "description": "قیمت لحظه‌ای ارز، طلا و سکه در ایران",
              "url": "https://cheghadshod.ir",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "IRR"
              },
              "author": {
                "@type": "Person",
                "name": "Sina Zare",
                "url": "https://github.com/sina-sparkn"
              },
              "publisher": {
                "@type": "Organization",
                "name": "چقدر شد؟",
                "url": "https://cheghadshod.ir"
              },
              "sameAs": [
                "https://github.com/sina-sparkn/chand_shode_currency_tracking_app"
              ]
            })
          }}
        />
      </head>
      <body className={quicksand.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PWAProvider>
            <Suspense fallback={null}>{children}</Suspense>
            <Analytics />
          </PWAProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
