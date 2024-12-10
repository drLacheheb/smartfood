import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ServicesProps {
  title: string;
  description: string;
}

const services: ServicesProps[] = [
  {
    title: "جمع البيانات",
    description: "تجميع بيانات استهلاك الطعام وأنماط الطلب في المطعم الجامعي.",
  },
  {
    title: "تحليل البيانات",
    description: "استخدام أدوات تحليل متقدمة لفهم الأنماط وتحديد الفاقد.",
  },
  {
    title: "اقتراح النموذج الأمثل",
    description: "تقديم أفضل نموذج لإدارة وتخطيط الوجبات بكفاءة وتقليل الهدر.",
  },
];

export const ServicesSection = () => {
  return (
    <section
      id="services"
      className="container mx-auto space-y-6 px-4 py-8 md:py-12 lg:py-20"
    >
      <h2 className="text-center text-3xl font-bold md:text-center lg:text-4xl">
        خدماتنا
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map(({ title, description }: ServicesProps) => (
          <Card key={title} className="text-center">
            <CardHeader>
              <CardTitle className="text-lg font-bold">{title}</CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
