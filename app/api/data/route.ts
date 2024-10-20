import { NextRequest, NextResponse } from "next/server";
import { chartData } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ageFilter = searchParams.get("age");
    const genderFilter = searchParams.get("gender");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const dateRange = {
      from: from ? new Date(decodeURIComponent(from)) : null,
      to: to ? new Date(decodeURIComponent(to)) : null,
    };

    const filteredData = chartData.filter((item) => {
      const itemDate = new Date(item.Day);
      const isWithinDateRange =
        dateRange.from && dateRange.to
          ? itemDate >= dateRange.from && itemDate <= dateRange.to
          : true;
      return (
        isWithinDateRange &&
        (ageFilter ? item.Age === ageFilter : true) &&
        (genderFilter ? item.Gender === genderFilter : true)
      );
    });

    return NextResponse.json(filteredData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
