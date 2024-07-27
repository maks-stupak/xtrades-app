import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Ticker } from "../types";

@Injectable({
  providedIn: "root",
})
export class BinanceApiService {
  private baseUrl = "https://data-api.binance.vision/api/v3";

  constructor(private http: HttpClient) {}

  public getAllTicker(): Observable<Ticker[]> {
    return this.http.get<Ticker[]>(`${this.baseUrl}/ticker/24hr`);
  }

  public getHistoricalData(
    symbol: string,
    interval: string,
    limit: number = 24
  ): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/klines`, {
      params: {
        symbol: symbol,
        interval: interval,
        limit: `${limit}`,
      },
    });
  }
}
