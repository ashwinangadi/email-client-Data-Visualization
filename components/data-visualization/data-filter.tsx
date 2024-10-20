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
import { userSelection } from "@/lib/actions";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const DataFilter = ({
  ageCookie,
  genderCookie,
  fromCookie,
  toCookie,
  userIdCookie,
}: {
  ageCookie: string | undefined;
  genderCookie: string | undefined;
  fromCookie: string | undefined;
  toCookie: string | undefined;
  userIdCookie: string | undefined;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

  // Ensure the user ID is available
  const userId = userIdCookie || session?.user?.id;

  const age = searchParams.get("age") || ageCookie;
  const gender = searchParams.get("gender") || genderCookie;

  const handleAgeChange = async (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("age", value);
    router.replace(`?${params.toString()}`);
    if (userId) {
      await userSelection({ userId, age: value });
    }
  };

  const handleGenderChange = async (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("gender", value);
    router.replace(`?${params.toString()}`);
    if (userId) {
      await userSelection({ userId, gender: value });
    }
  };

  const handleClearFilters = async () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("age");
    params.delete("gender");
    params.delete("from");
    params.delete("to");
    params.delete("category");
    router.replace(`?${params.toString()}`);
    if (userId) {
      await userSelection({
        userId,
        age: null,
        gender: null,
        from: null,
        to: null,
        category: null,
      });
    }
    toast.success("Filters cleared successfully and set to default values.");
  };

  const availableDates = chartData.map((item) => new Date(item.Day));

  return (
    <div className="flex justify-center m-1 mb-10 ">
      <span className="flex flex-wrap justify-center gap-4 border p-4 rounded-lg ">
        <DateRangePicker
          availableDates={availableDates}
          fromCookie={fromCookie}
          toCookie={toCookie}
          userIdCookie={userIdCookie}
        />
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
        <Button
          variant="outline"
          className="border-red-300"
          onClick={handleClearFilters}
        >
          Clear filters
        </Button>
      </span>
    </div>
  );
};

export default DataFilter;
