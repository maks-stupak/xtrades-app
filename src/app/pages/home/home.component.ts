import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BehaviorSubject, combineLatest, Subject } from "rxjs";
import { filter, map, take, takeUntil, tap } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";

import { FilterConfig, Ticker } from "../../types";
import { FiltersDialogComponent } from "src/app/components/filters-dialog/filters-dialog.component";
import { applyFilters } from "src/app/utils";
import { DataService } from "src/app/services/data.service";
import { PriceChartDialogComponent } from "src/app/components/price-chart-dialog/price-chart-dialog.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private initialData$ = new BehaviorSubject<Map<string, Ticker>>(new Map());
  private filters$ = new BehaviorSubject<FilterConfig>(null);
  private destroy$ = new Subject<void>();

  public filteredData$ = combineLatest([this.initialData$, this.filters$]).pipe(
    map(([dataMap, filters]) =>
      applyFilters(Array.from(dataMap.values()), filters)
    )
  );

  constructor(private dialog: MatDialog, private dataService: DataService) {}

  ngOnInit(): void {
    this.loadInitialData();
    this.setupWebSocketUpdates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadInitialData(): void {
    this.dataService
      .loadData()
      .pipe(
        tap((data) => {
          const dataMap = new Map(data.map((item) => [item.symbol, item]));
          this.initialData$.next(dataMap);
        })
      )
      .subscribe();
  }

  private setupWebSocketUpdates(): void {
    this.dataService
      .getUpdates()
      .pipe(takeUntil(this.destroy$))
      .subscribe((updates) => this.updatePrices(updates));
  }

  private updatePrices(updates: Ticker[]): void {
    const currentData = this.initialData$.value;
    updates.forEach((update) => {
      if (currentData.has(update.symbol)) {
        const existingTicker = currentData.get(update.symbol);
        existingTicker.lastPrice = update.lastPrice;
        currentData.set(update.symbol, existingTicker);
      }
    });
    this.initialData$.next(currentData);
  }

  public openFilterDialog(): void {
    this.dialog
      .open(FiltersDialogComponent, {
        width: "280px",
        data: this.filters$.getValue(),
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        take(1),
        tap((filters) => this.filters$.next(filters))
      )
      .subscribe();
  }

  public showPriceChart(ticker: Ticker): void {
    this.dataService
      .loadPriceHistory(ticker.symbol)
      .pipe(
        take(1),
        tap((history) => {
          this.dialog.open(PriceChartDialogComponent, {
            width: "600px",
            data: { history },
          });
        })
      )
      .subscribe();
  }
}
