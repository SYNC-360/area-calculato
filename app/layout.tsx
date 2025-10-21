import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

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

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Q808G6DHYW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Q808G6DHYW');
          `}
        </Script>

        {/* Enhanced JSON-LD Schema for AI Platforms */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebApplication",
                  "@id": "https://areaofcircle.com/#webapp",
                  name: "Area of Circle Calculator",
                  url: "https://areaofcircle.com",
                  description:
                    "Free online calculator to find the area of a circle using radius, diameter, or circumference",
                  applicationCategory: "EducationalApplication",
                  operatingSystem: "All",
                  isAccessibleForFree: true,
                  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                  author: {
                    "@type": "Organization",
                    name: "Circle Calculators",
                    url: "https://areaofcircle.com",
                  },
                  creator: {
                    "@type": "Organization",
                    name: "Circle Calculators",
                  },
                  featureList: [
                    "Calculate area from radius using A = πr²",
                    "Calculate area from diameter using A = πd²/4",
                    "Calculate area from circumference using A = C²/4π",
                    "Step-by-step solutions",
                    "Visual representations",
                    "Real-world examples",
                    "15+ decimal precision",
                    "No registration required",
                    "API access for integration",
                  ],
                },
                {
                  "@type": "Calculator",
                  "@id": "https://areaofcircle.com/#calculator",
                  name: "Circle Area Calculator",
                  url: "https://areaofcircle.com",
                  description: "Calculate the area of a circle from radius, diameter, or circumference",
                  potentialAction: {
                    "@type": "ComputeAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://areaofcircle.com/api/calculate",
                      actionPlatform: ["DesktopWebPlatform", "MobileWebPlatform", "VoiceActivatedInterface"],
                    },
                  },
                  hasPart: [
                    {
                      "@type": "Thing",
                      name: "Radius Method",
                      description: "Calculate area using radius (A = πr²)",
                      formula: "A = πr²",
                    },
                    {
                      "@type": "Thing",
                      name: "Diameter Method",
                      description: "Calculate area using diameter (A = πd²/4)",
                      formula: "A = πd²/4",
                    },
                    {
                      "@type": "Thing",
                      name: "Circumference Method",
                      description: "Calculate area using circumference (A = C²/(4π))",
                      formula: "A = C²/(4π)",
                    },
                  ],
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://areaofcircle.com/#faq",
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
                    {
                      "@type": "Question",
                      name: "Can I calculate area from circumference?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes! Use the formula A = C²/(4π) where C is the circumference. First find radius from circumference (r = C/2π), then use A = πr².",
                      },
                    },
                  ],
                },
                {
                  "@type": "MathSolver",
                  "@id": "https://areaofcircle.com/#mathsolver",
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
                  "@id": "https://areaofcircle.com/#website",
                  url: "https://areaofcircle.com",
                  name: "Area of Circle",
                  description: "Free online area of circle calculator with formulas and examples",
                  inLanguage: "en-US",
                  publisher: {
                    "@type": "Organization",
                    name: "Circle Calculators",
                    url: "https://areaofcircle.com",
                    logo: {
                      "@type": "ImageObject",
                      url: "https://areaofcircle.com/favicon.ico",
                    },
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://areaofcircle.com?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Thing",
                  "@id": "https://areaofcircle.com/#pi",
                  name: "π (Pi)",
                  description: "Mathematical constant representing the ratio of a circle circumference to its diameter",
                  value: "3.14159265358979",
                  url: "https://areaofcircle.com",
                },
                {
                  "@type": "Organization",
                  "@id": "https://areaofcircle.com/#organization",
                  name: "Circle Calculators",
                  url: "https://areaofcircle.com",
                  description: "Educational mathematics tools and calculators",
                  knowsAbout: ["Circle Mathematics", "Geometry", "Educational Tools", "Mathematical Constants"],
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "Customer Support",
                    url: "https://areaofcircle.com",
                  },
                },
              ],
            }),
          }}
        />

        <meta name="author" content="Circle Calculators" />
        <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <meta name="googlebot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <meta property="og:site_name" content="Area of Circle" />
        <meta property="og:type" content="website" />

        {/* AI Platform Accessibility & Indexing */}
        <meta name="AI-Scrapable" content="true" />
        <meta name="chat-gpt-indexing" content="allowed" />
        <meta name="perplexity-indexing" content="allowed" />
        <meta name="claude-indexing" content="allowed" />
        <meta name="gemini-indexing" content="allowed" />
        <meta name="content-type" content="text/html; charset=utf-8" />
        <meta name="revisit-after" content="7 days" />
        <meta name="classification" content="Educational" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />

        {/* API Documentation Link for AI Crawlers */}
        <link rel="alternate" type="application/json" href="/api/schema" title="JSON-LD Schema" />
        <link rel="alternate" type="application/json" href="/api/metadata" title="Metadata" />
        <link rel="alternate" type="application/json" href="/api/specs" title="Specifications" />
        <link rel="api" href="/api/calculate" title="Calculate API" />

        {/* OpenAPI Documentation */}
        <link rel="service" href="/api/openapi.json" type="application/json" title="OpenAPI 3.0 Schema" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}