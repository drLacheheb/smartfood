import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BrainCircuit,
  ChartBarIncreasingIcon,
  ChartLine,
  CircleCheckBig,
  Clock2Icon,
  CookingPot,
  Languages,
  MicIcon,
  type LucideIcon,
} from "lucide-react";

interface FeaturesProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: CircleCheckBig,
    title: "تحسين استخدام الموارد",
    description: "حلل استهلاك الطعام وقلل من الهدر باستخدام تقنيات متقدمة.",
  },
  {
    icon: ChartBarIncreasingIcon,
    title: "تقارير وتحليلات شاملة",
    description:
      "احصل على رؤى دقيقة حول الأنماط الغذائية لتحسين تقديم الوجبات.",
  },
  {
    icon: Clock2Icon,
    title: "جدولة مرنة للوجبات",
    description:
      "خطط لتقديم الوجبات بناءً على أوقات الذروة لضمان تقديم سريع وفعال.",
  },
  {
    icon: CookingPot,
    title: "ضمان الطزاجة",
    description:
      "تحقق من جودة الطعام مع تقنيات تساعد في تقليل الفائض وزيادة الطزاجة.",
  },
];

export const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="container mx-auto space-y-6 px-4 py-8 md:py-12 lg:py-20"
    >
      <h2 className="text-center text-3xl font-bold md:text-center lg:text-4xl">
        المميزات الرئيسية
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featureList.map((item, index) => (
          <div
            key={item.title}
            className={index === 3 ? "sm:col-span-2 lg:col-span-3" : ""}
          >
            <Card className="h-full border-0 bg-background shadow-none">
              <CardHeader className="flex items-center justify-center">
                <div className="mb-4 rounded-full bg-primary/20 p-2 ring-8 ring-primary/10">
                  <item.icon size={24} className="text-primary" />
                </div>

                <CardTitle>{item.title}</CardTitle>
              </CardHeader>

              <CardContent className="text-center text-muted-foreground">
                {item.description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
