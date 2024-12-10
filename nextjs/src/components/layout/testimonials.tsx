"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";

interface ReviewProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
  rating: number;
}

const reviewList: ReviewProps[] = [
    {
      image: "https://example.com/user1.png",
      name: "أحمد الصالح",
      userName: "مدير عمليات المطاعم",
      comment:
        "ساعدنا هذا النظام في تقليل هدر الطعام بنسبة 40٪. التحليلات الذكية والتنبؤات الدقيقة غيرت طريقة إدارتنا للمخزون بشكل جذري.",
      rating: 5.0,
    },
    {
      image: "https://example.com/user2.png",
      name: "ليلى المنصور",
      userName: "رئيسة قسم التموين",
      comment:
        "أصبحت جدولة الوجبات وإدارة الموارد أكثر كفاءة من أي وقت مضى. النظام سهل الاستخدام ويوفر رؤى قيمة لتحسين عملياتنا.",
      rating: 4.9,
    },
    {
      image: "https://example.com/user3.png",
      name: "عمر الخالدي",
      userName: "مدير سلسلة مطاعم",
      comment:
        "التقارير التحليلية ساعدتنا في فهم أنماط استهلاك الطعام بشكل أفضل. نجحنا في تحسين جودة خدماتنا مع تقليل التكاليف.",
      rating: 5.0,
    },
    {
      image: "https://example.com/user4.png",
      name: "نورة السعيد",
      userName: "مديرة الجودة",
      comment:
        "نظام رائع للحفاظ على جودة وطزاجة الطعام. أصبح تتبع المخزون وضمان الجودة أسهل بكثير مع هذه المنصة المتكاملة.",
      rating: 4.8,
    },
    {
      image: "https://example.com/user5.png",
      name: "فيصل العتيبي",
      userName: "مدير العمليات التشغيلية",
      comment:
        "ساهمت المنصة في تحسين كفاءة إدارة المطبخ وتقديم الوجبات. النتائج كانت ملموسة من حيث رضا العملاء وتوفير التكاليف.",
      rating: 5.0,
    },
  ];

export const TestimonialsSection = () => {
  return (
    <section
      className="container mx-auto space-y-6 px-4 py-8 md:py-12 lg:py-20"
      id="testimonials"
    >
      <h2 className="text-3xl font-bold md:text-center lg:text-4xl text-center">
      شهادات عملائنا
      </h2>

      <Carousel
        opts={{
          align: "start",
        }}
        className="relative mx-auto w-[80%] sm:w-[90%] lg:max-w-screen-xl"
      >
        <CarouselContent>
          {reviewList.map((review) => (
            <CarouselItem
              key={review.name}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="bg-muted/50 dark:bg-card">
                <CardContent className="pb-0 pt-6">
                  <div className="flex gap-1 pb-6">
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                    <Star className="size-4 fill-primary text-primary" />
                  </div>
                  {`"${review.comment}"`}
                </CardContent>

                <CardHeader>
                  <div className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src="https://avatars.githubusercontent.com/u/75042455?v=4"
                        alt="radix"
                      />
                      <AvatarFallback>SV</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <CardTitle className="text-lg">{review.name}</CardTitle>
                      <CardDescription>{review.userName}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
