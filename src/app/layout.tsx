import type { Metadata } from "next";
import "./globals.css";

// ✅ Replace these with your real values
const SITE_URL = "https://zohaibalidayo.vercel.app";
const TWITTER_HANDLE = "@dotzohaib"; // Update if different
const GOOGLE_VERIFICATION = "your-google-verification-code"; // From Google Search Console

export const metadata: Metadata = {
  // ─── Basic Metadata ───────────────────────────────────────────────────────
  title: {
    default: "DotZohaib | Zohaib Ali Dayo - AI Engineer & Full Stack Developer",
    template: "%s | DotZohaib - Zohaib Ali Dayo",
  },
  description:
    "DotZohaib (Zohaib Ali Dayo) — AI Engineer, Full Stack Developer & Data Scientist from Karachi, Pakistan. Expert in Generative AI, LangChain, RAG Systems, MERN Stack, Next.js, and Python. Building intelligent, scalable solutions.",

  // ─── Keywords (includes nickname variations) ──────────────────────────────
  keywords: [
    // Nickname variations — critical for branded searches
    "DotZohaib",
    "dotzohaib",
    "Dot Zohaib",
    "zohaibdot",
    // Full name variations
    "Zohaib Ali Dayo",
    "Zohaib Dayo",
    "Zuhaib Ali Dayo",
    "zuhaibalid",
    // Role keywords
    "AI Engineer Pakistan",
    "Generative AI Engineer",
    "Full Stack Developer Karachi",
    "MERN Stack Developer Pakistan",
    "Data Scientist Karachi",
    "Machine Learning Engineer Pakistan",
    "React Developer Pakistan",
    "Next.js Developer",
    "TypeScript Developer",
    "Python Developer Pakistan",
    // Tech stack
    "TensorFlow",
    "PyTorch",
    "LangChain",
    "RAG Systems",
    "AI Agents",
    "OpenAI",
    "Prompt Engineering",
    "Vector Databases",
    "MongoDB",
    "Node.js",
    "Deep Learning",
    "Cloud Computing",
    // Portfolio/contact
    "Zohaib Ali Dayo Portfolio",
    "DotZohaib Portfolio",
    "Hire AI Engineer Pakistan",
    "Sindh Madressatul Islam University",
    "Governor Sindh Initiative AI",
  ],

  authors: [
    { name: "Zohaib Ali Dayo", url: SITE_URL },
    { name: "DotZohaib", url: SITE_URL },
  ],

  creator: "Zohaib Ali Dayo (DotZohaib)",
  publisher: "Zohaib Ali Dayo",

  // ─── Canonical & Alternates ───────────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },

  // ─── Open Graph (Facebook, LinkedIn, WhatsApp) ────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "DotZohaib | Zohaib Ali Dayo Portfolio",
    title: "DotZohaib | Zohaib Ali Dayo - AI Engineer & Full Stack Developer",
    description:
      "DotZohaib (Zohaib Ali Dayo) — AI Engineer from Karachi building intelligent solutions with Generative AI, LangChain, RAG Systems & Full Stack Development.",
    images: [
      {
        url: `${SITE_URL}/zohaib.png`,
        width: 1200,
        height: 630,
        alt: "DotZohaib - Zohaib Ali Dayo, AI Engineer Portfolio",
        type: "image/png",
      },
    ],
  },

  // ─── Twitter Card ─────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title: "DotZohaib | Zohaib Ali Dayo - AI Engineer & Full Stack Developer",
    description:
      "DotZohaib — AI Engineer specializing in Generative AI, Full Stack Dev & Data Science. Based in Karachi, Pakistan.",
    images: [`${SITE_URL}/zohaib.png`],
  },

  // ─── Robots ───────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ─── Verification ─────────────────────────────────────────────────────────
  verification: {
    google: GOOGLE_VERIFICATION,
    // yandex: "your-yandex-code",
    // other: { "msvalidate.01": "your-bing-code" },
  },

  // ─── App / Manifest ───────────────────────────────────────────────────────
  category: "Technology",
  manifest: "/manifest.json",

  // ─── Icons ────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/zohaib.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ── Viewport & Theme ── */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="format-detection" content="telephone=no" />

        {/* ── Geo Tags (boosts local Pakistan searches) ── */}
        <meta name="geo.region" content="PK-SD" />
        <meta name="geo.placename" content="Karachi, Sindh, Pakistan" />
        <meta name="geo.position" content="24.8607;67.0011" />
        <meta name="ICBM" content="24.8607, 67.0011" />

        {/* ── PWA / Apple ── */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DotZohaib" />

        {/* ── Author / Owner ── */}
        <meta name="author" content="Zohaib Ali Dayo (DotZohaib)" />
        <meta name="owner" content="Zohaib Ali Dayo" />
        <meta name="reply-to" content="zuhaibalid@gmail.com" />

        {/* ── Performance Preconnects ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* ══════════════════════════════════════════════════
            STRUCTURED DATA — JSON-LD
            This is what makes Google show rich results
        ══════════════════════════════════════════════════ */}

        {/* 1. Person Schema — tells Google who you are */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `${SITE_URL}/#person`,
              name: "Zohaib Ali Dayo",
              alternateName: ["DotZohaib", "dotzohaib", "Zuhaib Ali Dayo"],
              url: SITE_URL,
              image: {
                "@type": "ImageObject",
                url: `${SITE_URL}/zohaib.png`,
                width: 400,
                height: 400,
              },
              jobTitle: "AI Engineer & Full Stack Developer",
              description:
                "AI Engineer and Full Stack Developer from Karachi, Pakistan. Known online as DotZohaib. Specializing in Generative AI, LangChain, RAG Systems, and MERN Stack.",
              worksFor: {
                "@type": "Organization",
                name: "Governor Sindh Initiative",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Karachi",
                addressRegion: "Sindh",
                addressCountry: "PK",
              },
              email: "zuhaibalid@gmail.com",
              telephone: "+923493237141",
              nationality: "Pakistani",
              sameAs: [
                "https://github.com/DotZohaib",
                "https://www.linkedin.com/in/zohaib-ali-dayo-7862261b5/",
                "https://codewithzuhaib.vercel.app",
                SITE_URL,
              ],
              knowsAbout: [
                "Artificial Intelligence",
                "Generative AI",
                "Machine Learning",
                "Deep Learning",
                "LangChain",
                "RAG Systems",
                "AI Agents",
                "Full Stack Development",
                "MERN Stack",
                "React",
                "Next.js",
                "TypeScript",
                "Python",
                "TensorFlow",
                "PyTorch",
                "Data Science",
                "Prompt Engineering",
                "Vector Databases",
                "Cloud Computing",
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Sindh Madressatul Islam University",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Karachi",
                  addressCountry: "PK",
                },
              },
            }),
          }}
        />

        {/* 2. WebSite Schema — enables Google Sitelinks Search Box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              name: "DotZohaib | Zohaib Ali Dayo Portfolio",
              alternateName: "DotZohaib Portfolio",
              url: SITE_URL,
              description:
                "Professional portfolio of Zohaib Ali Dayo (DotZohaib) — AI Engineer and Full Stack Developer based in Karachi, Pakistan.",
              author: {
                "@id": `${SITE_URL}/#person`,
              },
              inLanguage: "en-US",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${SITE_URL}/?s={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* 3. ProfilePage Schema — tells Google this is a personal portfolio */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "@id": `${SITE_URL}/#profilepage`,
              name: "DotZohaib - Zohaib Ali Dayo Portfolio",
              url: SITE_URL,
              mainEntity: {
                "@id": `${SITE_URL}/#person`,
              },
              breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: SITE_URL,
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
