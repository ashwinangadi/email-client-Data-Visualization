"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DateRangePicker } from "./date-range-picker";
import { chartData } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DataFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const age = searchParams.get("age");
  const gender = searchParams.get("gender");
  // TODO: manage cookie
  const handleAgeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("age", value);
    router.push(`?${params.toString()}`);
  };
  const handleGenderChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("gender", value);
    router.push(`?${params.toString()}`);
  };

  const availableDates = chartData.map((item) => new Date(item.Day));

  return (
    <div className="flex justify-center m-1 mb-10 ">
      <span className="flex flex-wrap justify-center gap-4 border p-4 rounded-lg ">
        <DateRangePicker availableDates={availableDates} />
        <Select
          value={age || "all"}
          defaultValue="all"
          onValueChange={(value) => handleAgeChange(value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Age" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All age</SelectItem>
            <SelectItem value="15-25">15-25</SelectItem>
            <SelectItem value=">25">&gt; 25</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={gender || "all"}
          defaultValue="all"
          onValueChange={(value) => handleGenderChange(value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All gender</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>
      </span>
    </div>
  );
};

export default DataFilter;
