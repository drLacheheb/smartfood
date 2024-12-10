import type { Metadata } from "next";

export const siteConfig: Metadata = {
  metadataBase: new URL("https://ai-project-xi.vercel.app"),
  title: {
    default: "تحليل المكالمات باستخدام الذكاء الاصطناعي",
    template: "%s | رؤى الذكاء الاصطناعي للمكالمات",
  },

  manifest: "/site.webmanifest",

  applicationName: "مُحلل المكالمات الذكي",

  creator: "فريق رؤى المكالمات",

  authors: [
    { name: "مطور الباكيند", url: "site.com" },
    { name: "مطور الفرونت إند", url: "site.com" },
    { name: "مهندس الذكاء الاصطناعي", url: "site.com" },
    { name: "مدير المشروع", url: "site.com" },
    { name: "المستشار الفني", url: "site.com" },
  ],

  icons: [{ rel: "icon", url: "/favicon.ico" }],

  description:
    "حوّل تسجيلات المكالمات إلى رؤى قابلة للتنفيذ باستخدام أحدث تقنيات الذكاء الاصطناعي. من التحويل إلى التحليل، قم بأتمتة إدارة مكالمات العملاء.",

  openGraph: {
    title: "محلل المكالمات الذكي",
    description:
      "حلل مكالمات العملاء باستخدام الذكاء الاصطناعي. قم برفع الملفات، تحويلها، واكتساب الرؤى باستخدام الذكاء الاصطناعي من جوجل جمني.",
    siteName: "رؤى الذكاء الاصطناعي للمكالمات",
    locale: "ar_SA",
    url: new URL("https://ai-project-xi.vercel.app"),
    images: ["https://ai-project-xi.vercel.app/og-image.png"],
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
