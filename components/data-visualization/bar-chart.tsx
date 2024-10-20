"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChartComponent } from "@/components/data-visualization/line-chart";
import { chartData } from "@/lib/constants"; // Import chartData
import { FilteredData } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { userSelection } from "@/lib/actions";
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from "react";

export const description = "A bar chart with a custom label";

// Function to aggregate data based on filters
const aggregateData = (
  data: FilteredData,
  ageFilter: string | null,
  genderFilter: string | null
) => {
  return data
    .filter(
      (item) =>
        (ageFilter ? item.Age === ageFilter : true) &&
        (genderFilter ? item.Gender === genderFilter : true)
    )
    .reduce((acc: Record<string, number>, curr) => {
      Object.keys(curr).forEach((key) => {
        if (key !== "Day" && key !== "Age" && key !== "Gender") {
          acc[key] =
            (acc[key] || 0) + (curr[key as keyof typeof curr] as number);
        }
      });
      return acc;
    }, {} as Record<string, number>);
};

// Update the chartConfig to include colors for each feature
const chartConfig = {
  A: { label: "Feature A", color: "hsl(var(--chart-1))" },
  B: { label: "Feature B", color: "hsl(var(--chart-2))" },
  C: { label: "Feature C", color: "hsl(var(--chart-3))" },
  D: { label: "Feature D", color: "hsl(var(--chart-4))" },
  E: { label: "Feature E", color: "hsl(var(--chart-5))" },
  F: { label: "Feature F", color: "hsl(var(--chart-6))" },
  label: { color: "hsl(var(--background))" },
} satisfies ChartConfig;

export function BarChartComponent({
  ageCookie,
  genderCookie,
  fromCookie,
  toCookie,
  categoryCookie,
  userIdCookie,
}: {
  ageCookie: string | undefined;
  genderCookie: string | undefined;
  fromCookie: string | undefined;
  toCookie: string | undefined;
  categoryCookie: string | undefined;
  userIdCookie: string | undefined;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCategory =
    searchParams.get("category") || categoryCookie || "A";
// const ageFilter =
//   searchParams.get("age") === "all" || ageCookie === "all"
//     ? null
//     : searchParams.get("age") || ageCookie || null;
// const genderFilter =
//   searchParams.get("gender") === "all" || genderCookie === "all"
//     ? null
//     : searchParams.get("gender") || genderCookie || null;
// const from = decodeURIComponent(
//   searchParams.get("from") || fromCookie || "2024-10-03T18%3A30%3A00.000Z"
// );
// const to = decodeURIComponent(
//   searchParams.get("to") || toCookie || "2024-10-13T18%3A30%3A00.000Z"
// );

  const fetchChartData = async () => {
    const params = new URLSearchParams({
      age: searchParams.get("age") || ageCookie || "",
      gender: searchParams.get("gender") || genderCookie || "",
      from: searchParams.get("from") || fromCookie || "",
      to: searchParams.get("to") || toCookie || "",
    });

    const response = await fetch(`/api/analytics?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const { data = {}, error, isLoading } = useQuery({
    queryKey: ['chartData', searchParams],
    queryFn: fetchChartData,
  });

  const formattedData = Object.keys(data).map((key) => ({
    feature: key,
    value: data[key],
  }));

  const handleBarClick = async (data: { feature: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", data.feature);
    router.replace(`?${params.toString()}`);
    if (userIdCookie) {
      await userSelection({ userId: userIdCookie, category: data.feature });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-10 w-full ">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Bar Chart - Features vs Time Spent</CardTitle>
          <CardDescription>Total Time Spent by Features</CardDescription>
        </CardHeader>
        <CardContent className="p-2">
          <ChartContainer config={chartConfig}>
            <BarChart
              data={formattedData}
              layout="vertical"
              margin={{ right: 16 }}
              onClick={(data) =>
                handleBarClick(data.activePayload?.[0]?.payload)
              }
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="feature"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <XAxis type="number" />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={4}>
                <LabelList
                  dataKey="value"
                  position="insideRight"
                  offset={8}
                  className="fill-white"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>

        {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Showing total time spent on features
        </div>
      </CardFooter> */}
      </Card>

      <LineChartComponent category={selectedCategory} />
    </div>
  );
}
