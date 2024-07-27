import { Ticker, FilterConfig } from "../types";

export function applyFilters(
  data: Ticker[],
  filters: FilterConfig
): Ticker[] {
  if (!filters) return data;

  return data.filter((item) => {
    return (
      checkFilter(item.volume, filters.minVolume, "min") &&
      checkFilter(item.volume, filters.maxVolume, "max") &&
      checkFilter(item.priceChangePercent, filters.minPriceChange, "min") &&
      checkFilter(item.priceChangePercent, filters.maxPriceChange, "max") &&
      checkFilter(item.lastPrice, filters.minPrice, "min") &&
      checkFilter(item.lastPrice, filters.maxPrice, "max")
    );
  });
}

function checkFilter(
  valueStr: string,
  filterValue: number,
  type: "min" | "max"
): boolean {
  if (!filterValue) return true;

  const value = parseFloat(valueStr);
  if (type === "min") return value >= filterValue;
  if (type === "max") return value <= filterValue;
  return true;
}
