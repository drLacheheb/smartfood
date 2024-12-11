"use client";

import { useState } from "react";
import * as z from "zod";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const FormSchema = z.object({
  day: z.date({
    required_error: "A day is required.",
  }),
});
export default function ServiceDemos() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      // Format date as 'YYYY-MM-DD'
      const formattedDate = data.day.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      
      console.log('Submitting data:', formattedDate);
      
      const response = await fetch('http://localhost:5000/meals/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: formattedDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Backend response:', result);

      // Format the result into HTML
      const htmlResult = `
        <div class="meal-analysis">
          <h2>تحليل الوجبات اليوم</h2>
          <div class="lunch-section">
            <p>${result.lunch} وجبة الغداء</p>
          </div>
          <div class="dinner-section">
            <p>${result.dinner} وجبة العشاء</p>
          </div>
        </div>
      `;

      // Update state with HTML result
      setAnalysisResult(htmlResult);
    } catch (error) {
      console.error('Error submitting data:', error);
      
      setAnalysisResult();
    }
  }

  // State variables for user input and analysis result
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  // Function to simulate text analysis
  const analyzeText = () => {
    setAnalysisResult(
      "هذه نتيجة تحليل مؤقتة. في التطبيق الفعلي، ستقوم بإرسال نص المحادثة إلى خدمة جمني وعرض التحليل هنا.",
    );
  };

  return (
    <section className="py-12" id="demo">
      <div className="container mx-auto space-y-8 px-4">
        <h2 className="text-center text-3xl font-bold md:text-center lg:text-4xl">
          تجربة الخدمة
        </h2>

        <div className="grid grid-cols-1">
          <Card className="mx-auto w-full max-w-2xl space-y-4 border-none shadow-none">
            <CardContent className="space-y-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="day"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("2023-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    <Brain className="mr-2 h-4 w-4" />
                    تحليل النص
                  </Button>
                </form>
              </Form>
              <div className="mt-6">
                <h4 className="mb-2 text-lg font-semibold">نتيجة التحليل</h4>
                <div className="min-h-[100px] rounded-md bg-muted p-4">
                  {analysisResult ? (
                    <div dangerouslySetInnerHTML={{ __html: analysisResult }} />
                  ) : (
                    <p className="text-muted-foreground">
                      ستظهر نتيجة التحليل هنا...
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
