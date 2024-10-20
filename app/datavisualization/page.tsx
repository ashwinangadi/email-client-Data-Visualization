import { BarChartComponent } from "@/components/data-visualization/bar-chart";
import DataFilter from "@/components/data-visualization/data-filter";
import { cookies } from "next/headers";
import React from "react";

const DataVisualizationPage = () => {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value; // Get user-specific cookie
  const age = cookieStore.get(`age-${userId}`)?.value.toString();
  const gender = cookieStore.get(`gender-${userId}`)?.value.toString();
  const from = cookieStore.get(`from-${userId}`)?.value;
  const to = cookieStore.get(`to-${userId}`)?.value;
  const category = cookieStore.get(`category-${userId}`)?.value.toString();

  return (
    <section className="container mx-auto py-20">
      <DataFilter
        ageCookie={age}
        genderCookie={gender}
        fromCookie={from}
        toCookie={to}
        userIdCookie={userId}
      />
      <BarChartComponent
        ageCookie={age}
        genderCookie={gender}
        fromCookie={from}
        toCookie={to}
        categoryCookie={category}
        userIdCookie={userId}
      />
    </section>
  );
};

export default DataVisualizationPage;
