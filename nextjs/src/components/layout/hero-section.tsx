import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PhoneCall } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-primary/5">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-foreground/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="pattern1"
            width="200"
            height="200"
            x="100%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#pattern1)"
        />
      </svg>
      <div
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        ></div>
      </div>
      <div className="mt-[-50px] flex h-screen items-center justify-center">
        <div className="max-w-full flex-shrink-0 px-4 text-center lg:mx-0 lg:max-w-3xl lg:pt-8">
          <h1 className="mt-10 text-5xl font-bold tracking-tight sm:text-6xl">
            حلول
            <span className="text-primary"> الذكاء الاصطناعي </span>لتناول
            الطلاب<span className="text-primary">{" "}للطعام</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-foreground">
            تأكد من التخطيط الأمثل للوجبات والاستدامة في مطعم جامعتك بقوة الذكاء
            الاصطناعي.
          </p>
          <div className="mt-5 flex items-center justify-center gap-x-6">
            <Button
              className="group relative flex items-center space-x-2"
              asChild
            >
              <Link href="#demo">طلب عرض توضيحي</Link>
            </Button>
            <Button
              className="group relative flex items-center space-x-2"
              asChild
              variant="outline"
            >
              <Link href="/contact">
                تواصل معنا
                <PhoneCall />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
