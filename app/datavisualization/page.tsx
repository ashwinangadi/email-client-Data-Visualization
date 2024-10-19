import { BarChartComponent } from "@/components/data-visualization/bar-chart";
import DataFilter from "@/components/data-visualization/data-filter";
import React from "react";

const DataVisualizationPage = () => {
  return (
    <section className="container mx-auto py-10">
      <DataFilter />
      <BarChartComponent />
    </section>
  );
};

export default DataVisualizationPage;
