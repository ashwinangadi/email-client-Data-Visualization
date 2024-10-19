"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
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

export function DateRangePicker({
  availableDates,
}: {
  availableDates: Date[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 9, 4),
    to: addDays(new Date(2024, 9, 4), 10),
  });

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range);
    if (range?.from && range?.to) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("from", range.from.toISOString());
      params.set("to", range.to.toISOString());
      router.push(`?${params.toString()}`);
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
