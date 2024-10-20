"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { userSelection } from "@/lib/actions";

export function DateRangePicker({
  availableDates,
  fromCookie,
  toCookie,
  userIdCookie,
}: {
  availableDates: Date[];
  fromCookie: string | undefined;
  toCookie: string | undefined;
  userIdCookie: string | undefined;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlFrom = decodeURIComponent(
    searchParams.get("from") || fromCookie || "2024-10-03T18%3A30%3A00.000Z"
  );
  const urlTo = decodeURIComponent(
    searchParams.get("to") || toCookie || "2024-10-13T18%3A30%3A00.000Z"
  );

  const initialDateRange = {
    from: new Date(urlFrom),
    to: new Date(urlTo),
  };

  const [date, setDate] = React.useState<DateRange | undefined>(
    initialDateRange
  );

  const handleSelect = async (range: DateRange | undefined) => {
    setDate(range);
    if (range?.from && range?.to) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("from", range.from.toISOString());
      params.set("to", range.to.toISOString());
      router.replace(`?${params.toString()}`);
    }
    if (userIdCookie) {
      await userSelection({
        userId: userIdCookie,
        from: range?.from,
        to: range?.to,
      });
    }
  };

  const availableDateSet = new Set(
    availableDates.map((date: Date) => date.toISOString().split("T")[0])
  );

  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={1}
            disabled={(date) =>
              !availableDateSet.has(date.toISOString().split("T")[0])
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
