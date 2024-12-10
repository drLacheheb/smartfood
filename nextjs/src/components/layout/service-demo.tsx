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
import { toast } from "@/hooks/use-toast";
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
  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    console.log(data)
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
    <section className="py-12">
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
                    <p>{analysisResult}</p>
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