import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Server } from "lucide-react";
import { Icons } from "../icons";

const TechStack = () => {
  return (
    <section
      id="tech-stack"
      className="container mx-auto space-y-6 px-4 py-8 md:py-12 lg:py-20"
    >
      <h2 className="text-center text-3xl font-bold md:text-center lg:text-4xl">
        التقنيات المستخدمة
      </h2>

      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-4">
        <Card className="text-cnter hover:shadow hover:shadow-primary/50">
          <CardHeader className="flex items-center justify-center">
            <div className="mb-4 rounded-full bg-primary/20 p-2 ring-8 ring-primary/10">
              <svg
                className="h-12 w-12 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Docker"
                role="img"
                viewBox="0 0 512 512"
              >
                <rect width="512" height="512" rx="15%" fill="transparent" />
                <path
                  stroke="currentColor"
                  stroke-width="38"
                  d="M296 226h42m-92 0h42m-91 0h42m-91 0h41m-91 0h42m8-46h41m8 0h42m7 0h42m-42-46h42"
                />
                <path
                  fill="currentColor"
                  d="m472 228s-18-17-55-11c-4-29-35-46-35-46s-29 35-8 74c-6 3-16 7-31 7H68c-5 19-5 145 133 145 99 0 173-46 208-130 52 4 63-39 63-39"
                />
              </svg>
            </div>

            <h3 className="font-bold">Docker</h3>
          </CardHeader>
          <CardContent className="text-center">
            نشر وإدارة التطبيق باستخدام الحاويات
          </CardContent>
        </Card>

        <Card className="hover:shadow hover:shadow-teal-200">
          <CardHeader className="flex items-center justify-center">
            <div className="mb-4 rounded-full bg-primary/20 p-2 ring-8 ring-primary/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 180 180"
                width="48"
                className="text-primary"
              >
                <mask
                  height="180"
                  id=":r8:mask0_408_134"
                  maskUnits="userSpaceOnUse"
                  width="180"
                  x="0"
                  y="0"
                  style={{ maskType: "alpha" }}
                >
                  <circle cx="90" cy="90" fill="currentColor" r="90"></circle>
                </mask>
                <g mask="url(#:r8:mask0_408_134)">
                  <circle
                    cx="90"
                    cy="90"
                    data-circle="true"
                    fill="currentColor"
                    r="90"
                  ></circle>
                  <path
                    d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
                    fill="url(#:r8:paint0_linear_408_134)"
                  ></path>
                  <rect
                    fill="url(#:r8:paint1_linear_408_134)"
                    height="72"
                    width="12"
                    x="115"
                    y="54"
                  ></rect>
                </g>
                <defs>
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id=":r8:paint0_linear_408_134"
                    x1="109"
                    x2="144.5"
                    y1="116.5"
                    y2="160.5"
                  >
                    <stop stop-color="white"></stop>
                    <stop offset="1" stop-color="white" stop-opacity="0"></stop>
                  </linearGradient>
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id=":r8:paint1_linear_408_134"
                    x1="121"
                    x2="120.799"
                    y1="54"
                    y2="106.875"
                  >
                    <stop stop-color="white"></stop>
                    <stop offset="1" stop-color="white" stop-opacity="0"></stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3 className="font-bold">NextJs</h3>
          </CardHeader>
          <CardContent className="text-center">
        إطار عمل React لتطبيقات الويب المقدمة من جانب الخادم.
          </CardContent>
        </Card>

        <Card className="hover:shadow hover:shadow-teal-200">
          <CardHeader className="flex items-center justify-center">
            <div className="mb-4 rounded-full bg-primary/20 p-2 ring-8 ring-primary/10">
              <Server className="h-12 w-12 text-primary" />
            </div>
            <h3 className="font-bold">Microservices</h3>
          </CardHeader>
          <CardContent className="text-center">
            هيكلية خدمات مصغرة للمرونة والقابلية للتوسع
          </CardContent>
        </Card>
        <Card className="hover:shadow hover:shadow-teal-200">
          <CardHeader className="flex items-center justify-center">
            <div className="mb-4 rounded-full bg-primary/20 p-2 ring-8 ring-primary/10">
              <Icons.falsk className="text-primary" />
            </div>
            <h3 className="font-bold">Flask</h3>
          </CardHeader>
          <CardContent className="text-center">
        إطار عمل بايثون خفيف الوزن لبناء تطبيقات الويب.
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TechStack;
