import { HistoricalData } from "../types";

export function mapToHistoricalData(
  symbol: string,
  response: any[]
): HistoricalData[] {
  return response.map((item) => ({
    symbol: symbol,
    timestamp: item[0],
    open: item[1],
    high: item[2],
    low: item[3],
    close: item[4],
    volume: item[5],
  }));
}
