import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ChartConfiguration } from "chart.js";

import {
  baseLineChartType,
  baseLineChartOptions,
} from "../../constants/chart-configs";
import { HistoricalData } from "../../types";

@Component({
  templateUrl: "./price-chart-dialog.component.html",
  styleUrls: ["./price-chart-dialog.component.scss"],
})
export class PriceChartDialogComponent {
  public lineChartData: ChartConfiguration["data"];
  public lineChartType = baseLineChartType;
  public lineChartOptions = baseLineChartOptions;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { history: HistoricalData[] }
  ) {
    this.lineChartData = {
      datasets: [
        {
          data: this.data.history.map((item) => parseFloat(item.close)),
          label: "Close Price",
        },
      ],
      labels: this.data.history.map((item) =>
        new Date(item.timestamp).toLocaleTimeString()
      ),
    };
  }
}
