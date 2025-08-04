"use client";

import * as React from "react";
import {
  DollarSign,
  Users,
  CheckCircle,
  TrendingUp,
  BarChart,
  LineChart,
  PieChart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/dashboard/header";
import MetricCard from "@/components/dashboard/metric-card";
import RevenueChart from "@/components/dashboard/revenue-chart";
import ConversionsChart from "@/components/dashboard/conversions-chart";
import TrafficChart from "@/components/dashboard/traffic-chart";
import { Campaign, columns } from "@/components/dashboard/data-table/columns";
import { DataTable } from "@/components/dashboard/data-table/data-table";
import {
  generateInitialData,
  updateData,
  InitialData,
} from "@/lib/data";

export default function DashboardPage() {
  const [data, setData] = React.useState<InitialData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setData(generateInitialData());
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (!isLoading && data) {
      const interval = setInterval(() => {
        setData(updateData);
      }, 5000); // Update data every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isLoading, data]);

  const dataSummary = React.useMemo(() => {
    if (!data) return "No data available.";
    return `The dashboard currently shows marketing data including a revenue of $${data.metrics.revenue.value.toLocaleString()}, ${
      data.metrics.users.value
    } users, and ${
      data.metrics.conversions.value
    } conversions. The charts display revenue trends over the last 12 months, conversions across different campaigns, and traffic from various sources. The main table lists detailed campaign performance.`;
  }, [data]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header dataSummary={dataSummary} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="mt-1 h-4 w-48" />
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <MetricCard
                title="Revenue"
                value={`$${data!.metrics.revenue.value.toLocaleString()}`}
                trend={`+${data!.metrics.revenue.trend}% from last month`}
                icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Users"
                value={`+${data!.metrics.users.value.toLocaleString()}`}
                trend={`+${data!.metrics.users.trend}% from last month`}
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
              />
              <MetricCard
                title="Conversions"
                value={`+${data!.metrics.conversions.value.toLocaleString()}`}
                trend={`+${data!.metrics.conversions.trend}% from last month`}
                icon={
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                }
              />
              <MetricCard
                title="Growth"
                value={`${data!.metrics.growth.value}%`}
                trend="Since last quarter"
                icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
              />
            </>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <LineChart className="h-5 w-5" />
                Revenue Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              {isLoading ? (
                <Skeleton className="h-[350px] w-full" />
              ) : (
                <RevenueChart data={data!.revenueData} />
              )}
            </CardContent>
          </Card>
          <Card className="col-span-4 lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <BarChart className="h-5 w-5" />
                Conversions by Campaign
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[350px] w-full" />
              ) : (
                <ConversionsChart data={data!.conversionsData} />
              )}
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <PieChart className="h-5 w-5" />
                Traffic Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[300px] w-full" />
              ) : (
                <TrafficChart data={data!.trafficData} />
              )}
            </CardContent>
          </Card>
          <Card className="col-span-4">
             <CardHeader>
              <CardTitle className="font-headline">Recent Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <DataTable
                  columns={columns}
                  data={data!.campaignsData}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
