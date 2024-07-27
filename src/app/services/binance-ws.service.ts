import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Ticker } from "../types";
import { mapToTickerData } from "../utils";

@Injectable({
  providedIn: "root",
})
export class BinanceWsService {
  private ws: WebSocket | null = null;
  private tickerDataStream = new BehaviorSubject<Ticker[]>([]);

  constructor() {
    this.connectToWebSocket();
  }

  private connectToWebSocket() {
    this.ws = new WebSocket(
      "wss://stream.binance.com:9443/stream?streams=!miniTicker@arr"
    );
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const processedData = mapToTickerData(data);
      this.tickerDataStream.next(processedData);
    };

    this.ws.onclose = () => {
      console.log("WebSocket connection closed. Reconnecting...");
      this.connectToWebSocket();
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket encountered an error:", error);
      this.ws.close();
    };
  }

  public closeWebSocket() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  public get tickerData() {
    return this.tickerDataStream.asObservable();
  }
}
