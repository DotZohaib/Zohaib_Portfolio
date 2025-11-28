import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // Basic Metadata
  title: {
    default: "Zohaib Ali Dayo - AI Engineer & Full Stack Developer | Portfolio",
    template: "%s | Zohaib Ali Dayo"
  },
  description: "Experienced AI Engineer, Full Stack Developer, and Data Scientist specializing in Generative AI, Machine Learning, MERN Stack, and intelligent solutions. Based in Karachi, Pakistan.",
  
  // Keywords for Search Engine Optimization
  keywords: [
    "AI Engineer",
    "Generative AI Engineer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Data Scientist",
    "Machine Learning Expert",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Python Developer",
    "TensorFlow",
    "PyTorch",
    "LangChain",
    "RAG Systems",
    "AI Agents",
    "Karachi Pakistan",
    "Zohaib Ali Dayo",
    "Web Development",
    "Data Analysis",
    "Deep Learning",
    "Cloud Computing",
    "MongoDB",
    "Node.js",
    "Prompt Engineering"
  ],

  authors: [
    { name: "Zohaib Ali Dayo", url: "https://github.com/DotZohaib" }
  ],
  
  creator: "Zohaib Ali Dayo",
  publisher: "Zohaib Ali Dayo",

  // Open Graph Metadata (Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    siteName: "Zohaib Ali Dayo - Portfolio",
    title: "Zohaib Ali Dayo - AI Engineer & Full Stack Developer",
    description: "AI Engineer specializing in Generative AI, Full Stack Development, and Data Science. Building intelligent solutions with modern technologies.",
    images: [
      {
        url: "/zohaib.png", // Add this image to your public folder
        width: 1200,
        height: 630,
        alt: "Zohaib Ali Dayo - AI Engineer Portfolio"
      }
    ]
  },

  // Twitter Card Metadata
  twitter: {
    card: "summary_large_image",
    title: "Zohaib Ali Dayo - AI Engineer & Full Stack Developer",
    description: "AI Engineer specializing in Generative AI, Full Stack Development, and Data Science.",
    images: ["/zohaib.png"],
    creator: "@YourTwitterHandle" // Replace with your Twitter handle
  },

  // Robots
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

  // Verification (Add your verification codes)
  verification: {
    google: "your-google-verification-code", // Get from Google Search Console
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },

  // Alternate Languages
  alternates: {
    canonical: "https://your-domain.com",
  },

  // App Metadata
  category: "Technology",
  
  // Manifest
  manifest: "/manifest.json",

  // Icons
  icons: {
    icon: [
      { url: "/zohaib.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
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
        {/* Additional SEO Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="PK-SD" />
        <meta name="geo.placename" content="Karachi" />
        <meta name="geo.position" content="24.8607;67.0011" />
        <meta name="ICBM" content="24.8607, 67.0011" />
        
        {/* Additional Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Zohaib Dayo" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Zohaib Ali Dayo",
              "url": "https://your-domain.com",
              "image": "https://your-domain.com/zohaib.png",
              "jobTitle": "AI Engineer & Full Stack Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Governor Sindh Initiative"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Karachi",
                "addressRegion": "Sindh",
                "addressCountry": "PK"
              },
              "email": "zuhaibalid@gmail.com",
              "telephone": "+923493237141",
              "sameAs": [
                "https://github.com/DotZohaib",
                "https://www.linkedin.com/in/zohaib-ali-dayo-7862261b5/",
                "https://codewithzuhaib.vercel.app"
              ],
              "knowsAbout": [
                "Artificial Intelligence",
                "Machine Learning",
                "Full Stack Development",
                "Data Science",
                "Generative AI",
                "React",
                "Next.js",
                "Python",
                "TensorFlow",
                "PyTorch"
              ],
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Sindh Madressatul Islam University"
              }
            })
          }}
        />
        
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Zohaib Ali Dayo Portfolio",
              "url": "https://your-domain.com",
              "description": "Professional portfolio of Zohaib Ali Dayo - AI Engineer and Full Stack Developer",
              "author": {
                "@type": "Person",
                "name": "Zohaib Ali Dayo"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://your-domain.com/?s={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}