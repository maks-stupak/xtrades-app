import { Ticker } from "../types";

export function mapToTickerData(data: any): Ticker[] {
  return data.data
    .filter((item: any) => item.s.endsWith("USDT"))
    .map((item: any) => ({
      symbol: item.s,
      lastPrice: item.c,
    }));
}
