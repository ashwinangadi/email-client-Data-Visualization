"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { Loader, ZoomOut } from "lucide-react";
import { ZoomIn } from "lucide-react";
import { FilteredData } from "@/lib/types";

export function LineChartComponent({
  data,
  category,
  isLoading,
  error,
}: {
  data: FilteredData;
  category: string;
  isLoading: boolean;
  error: Error | boolean | null;
}) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(data.length - 1);

  const handleZoomIn = () => {
    if (zoomLevel < data.length / 2) {
      setZoomLevel(zoomLevel + 1);
      setStartIndex(Math.min(startIndex + 1, data.length - 1));
      setEndIndex(Math.max(endIndex - 1, 0));
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel(zoomLevel - 1);
      setStartIndex(Math.max(startIndex - 1, 0));
      setEndIndex(Math.min(endIndex + 1, data.length - 1));
    }
  };

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <span className="flex flex-col gap-1.5">
          <CardTitle>Time trend of a Feature - {category}</CardTitle>
          <CardDescription>Time spent on a feature over time</CardDescription>
        </span>
        <div className="flex justify-end gap-2 mb-2">
          <Button onClick={handleZoomIn} variant="ghost" size="icon">
            <ZoomIn />
          </Button>
          <Button onClick={handleZoomOut} variant="ghost" size="icon">
            <ZoomOut />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <ChartContainer config={chartConfig}>
          {!isLoading ? (
            !error ? (
              <LineChart
                width={600}
                height={300}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey={category} stroke="#8884d8" />
                <Brush dataKey="Day" height={30} stroke="#8884d8" />
              </LineChart>
            ) : (
              <p className="text-center text-red-500 text-base">
                Error loading data
              </p>
            )
          ) : (
            <Loader className="animate-spin h-8 w-8 text-center m-auto" />
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
