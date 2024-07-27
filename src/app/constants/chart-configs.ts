import { ChartConfiguration, ChartType } from "chart.js";

export const baseLineChartOptions: ChartConfiguration["options"] = {
  responsive: true,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export const baseLineChartType: ChartType = "line";
