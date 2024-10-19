import { BarChartComponent } from "@/components/data-visualization/bar-chart";
import DataFilter from "@/components/data-visualization/data-filter";
import { cookies } from "next/headers";
import React from "react";

const DataVisualizationPage = () => {
  const cookieStore = cookies();
  const age = cookieStore.get("age")?.value.toString();
  const gender = cookieStore.get("gender")?.value.toString();
  const from = cookieStore.get("from")?.value;
  const to = cookieStore.get("to")?.value;
  const category = cookieStore.get("category")?.value.toString();

  return (
    <section className="container mx-auto py-20">
      <DataFilter
        ageCookie={age}
        genderCookie={gender}
        fromCookie={from}
        toCookie={to}
        // categoryCookie={category}
      />
      <BarChartComponent
        ageCookie={age}
        genderCookie={gender}
        fromCookie={from}
        toCookie={to}
        categoryCookie={category}
      />
    </section>
  );
};

export default DataVisualizationPage;
