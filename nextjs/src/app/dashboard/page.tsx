import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, MessageSquareWarning, Phone } from "lucide-react";

export default async function page() {
  const data = await getData();
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <div className="hidden items-center space-x-2 md:flex">
            <Button>تحميل</Button>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            مرحبًا، أهلاً بعودتك 👋
          </h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              التحليلات
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    جميع المكالمات
                  </CardTitle>
                  <Phone />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.allCallsCount}</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% من الشهر الماضي
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    المكالمات العاجلة.
                  </CardTitle>
                  <MessageSquareWarning />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.urgentCallsCount}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    المكالمات المكتملة.
                  </CardTitle>
                  <CheckCircle />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.completedCallsCount}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +19% من الشهر الماضي
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    متوسط مدة المكالمة.
                  </CardTitle>
                  <Clock />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.avgCallDuration} min
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}

async function getData() {
  return {
    urgentCallsCount: 400,
    completedCallsCount: 6000,
    avgCallDuration: 15.2,
    allCallsCount: 40000,
  };
}
