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

export function BarChartComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCategory = searchParams.get("category") || "A";
  const ageFilter =
    searchParams.get("age") === "all" ? null : searchParams.get("age") || null;
  const genderFilter =
    searchParams.get("gender") === "all"
      ? null
      : searchParams.get("gender") || null;
  const from = decodeURIComponent(
    searchParams.get("from") || "2024-10-03T18%3A30%3A00.000Z"
  );
  const to = decodeURIComponent(
    searchParams.get("to") || "2024-10-13T18%3A30%3A00.000Z"
  );
  const dateRange = { from: new Date(from), to: new Date(to) };

  const filteredData = chartData.filter((item) => {
    const itemDate = new Date(item.Day);
    const isWithinDateRange =
      dateRange?.from && dateRange?.to
        ? itemDate >= dateRange.from && itemDate <= dateRange.to
        : true;
    return (
      isWithinDateRange &&
      (ageFilter ? item.Age === ageFilter : true) &&
      (genderFilter ? item.Gender === genderFilter : true)
    );
  });

  const aggregatedData = aggregateData(filteredData, ageFilter, genderFilter);
  const formattedData = Object.keys(aggregatedData).map((key) => ({
    feature: key,
    value: aggregatedData[key],
  }));

  const handleBarClick = (data: { feature: string }) => {
    // TODO: manage cookie
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", data.feature);
    router.push(`?${params.toString()}`);
  };

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

      <LineChartComponent data={filteredData} category={selectedCategory} />
    </div>
  );
}
