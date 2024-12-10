import type { Metadata } from "next";

export const siteConfig: Metadata = {
  metadataBase: new URL("https://wajabaty.vercel.app"),
  title: {
    default: "وجبــاتي",
    template: "%s | وجبــاتي",
  },

  manifest: "/site.webmanifest",

  applicationName: "وجبــاتي",

  creator: "فريق وجبــاتي",

  authors: [
    { name: "مطور الباكيند", url: "site.com" },
    { name: "مطور الفرونت إند", url: "site.com" },
    { name: "مهندس الذكاء الاصطناعي", url: "site.com" },
    { name: "مدير المشروع", url: "site.com" },
    { name: "المستشار الفني", url: "site.com" },
  ],

  icons: [{ rel: "icon", url: "/favicon.ico" }],

  description:
    "تأكد من التخطيط الأمثل للوجبات والاستدامة في مطعم جامعتك بقوة الذكاء الاصطناعي.",

  openGraph: {
    title: "وجبــاتي",
    description:
      "تأكد من التخطيط الأمثل للوجبات والاستدامة في مطعم جامعتك بقوة الذكاء الاصطناعي.",
    siteName: "رؤى الذكاء الاصطناعي للمكالمات",
    locale: "ar_SA",
    url: new URL("https://wajabaty.vercel.app"),
    images: ["https://wajabaty.vercel.app/og-image.png"],
    type: "website",
  },

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
};
