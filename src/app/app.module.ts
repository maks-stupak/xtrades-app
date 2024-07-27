import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { ChartsModule } from "ng2-charts";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { FiltersDialogComponent } from "./components/filters-dialog/filters-dialog.component";
import { PriceChartDialogComponent } from "./components/price-chart-dialog/price-chart-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FiltersDialogComponent,
    PriceChartDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
