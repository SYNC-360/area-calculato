import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // ← ADD
import GaRouteListener from "./ga-route-listener"; // ← ADD (we create this next)

const inter = Inter({ subsets: ["latin"] });

// Use env var for GA (recommended)
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: "Area of Circle - Calculator, Formula & Examples | Free Online Tool",
  description:
    "Area of circle calculator using formulas A = πr², A = πd²/4, and A = C²/4π. Calculate area of a circle instantly from radius, diameter, or circumference with step-by-step solutions.",
  keywords:
    "area of circle, area of circle calculator, area of circle formula, how to find area of circle, how to calculate area of circle, circle area, πr², πr squared, area of a circle, circle area calculator",
  authors: [{ name: "Circle Calculators" }],
  creator: "Circle Calculators",
  publisher: "Circle Calculators",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: "Area of Circle - Calculator with Formula A = πr²",
    description:
      "Calculate area of circle instantly using radius, diameter, or circumference. Free area of circle calculator with step-by-step solutions and visual examples.",
    url: "https://areaofcircle.com",
    siteName: "Area of Circle",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://areaofcircle.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Area of Circle Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Area of Circle Calculator - Formula A = πr²",
    description:
      "Calculate area of circle from radius, diameter, or circumference. Free online calculator with formulas and examples.",
    images: ["https://areaofcircle.com/og-image.jpg"],
  },
  alternates: { canonical: "https://areaofcircle.com" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: { google: "your-google-verification-code" },
  other: { "revisit-after": "7 days", rating: "general", distribution: "global" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://areaofcircle.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#10b981" />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebApplication",
                  name: "Area of Circle Calculator",
                  url: "https://areaofcircle.com",
                  description:
                    "Free online calculator to find the area of a circle using radius, diameter, or circumference",
                  applicationCategory: "EducationalApplication",
                  operatingSystem: "All",
                  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                  featureList: [
                    "Calculate area from radius using A = πr²",
                    "Calculate area from diameter using A = πd²/4",
                    "Calculate area from circumference using A = C²/4π",
                    "Step-by-step solutions",
                    "Visual representations",
                    "Real-world examples",
                  ],
                },
                {
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "What is the formula for area of a circle?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "The area of a circle formula is A = πr² where r is the radius. You can also use A = πd²/4 for diameter or A = C²/4π for circumference.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How do you find the area of a circle?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "To find area of a circle: 1) Square the radius (multiply it by itself), 2) Multiply by π (3.14159). For example, if radius = 5, then area = π × 5² = 78.54 square units.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Why is the area of a circle πr²?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "The formula A = πr² comes from integral calculus. Imagine dividing a circle into tiny triangular wedges - their combined area equals πr². This can be proven by integrating the circumference from 0 to r.",
                      },
                    },
                  ],
                },
                {
                  "@type": "MathSolver",
                  name: "Area of Circle Solver",
                  url: "https://areaofcircle.com",
                  potentialAction: {
                    "@type": "SolveMathAction",
                    eduQuestionType: "Area",
                    mathExpression: "A = πr²",
                  },
                },
                {
                  "@type": "WebSite",
                  url: "https://areaofcircle.com",
                  name: "Area of Circle",
                  description:
                    "Free online area of circle calculator with formulas and examples",
                  publisher: { "@type": "Organization", name: "Circle Calculators" },
                },
              ],
            }),
          }}
        />

        <meta name="author" content="Circle Calculators" />
        <meta name="robots" content="index,follow" />
        <meta property="og:site_name" content="Area of Circle" />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Google Analytics (gtag.js) */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = window.gtag || gtag;
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </head>
      <body className={inter.className}>
        {/* Re-fire pageview on client-side route changes */}
        {GA_ID && <GaRouteListener />}
        {children}
      </body>
    </html>
  );
}
