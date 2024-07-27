import { Injectable } from "@angular/core";
import { take, map } from "rxjs/operators";
import { Observable } from "rxjs";

import { HistoricalData, Ticker } from "../types";
import { BinanceApiService } from "./binance-api.service";
import { BinanceWsService } from "./binance-ws.service";
import { mapToHistoricalData } from "../utils";

const DEFAULT_SYMBOL_STRING = "USDT";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(
    private apiService: BinanceApiService,
    private wsService: BinanceWsService
  ) {}

  public loadData(): Observable<Ticker[]> {
    return this.apiService.getAllTicker().pipe(
      take(1),
      map((data) =>
        data.filter((item) => item.symbol.endsWith(DEFAULT_SYMBOL_STRING))
      )
    );
  }

  public getUpdates(): Observable<Ticker[]> {
    return this.wsService.tickerData;
  }

  public loadPriceHistory(symbol: string): Observable<HistoricalData[]> {
    return this.apiService
      .getHistoricalData(symbol, "1h")
      .pipe(map((response) => mapToHistoricalData(symbol, response)));
  }
}
