import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { FilterConfig } from "src/app/types";

@Component({
  templateUrl: "./filters-dialog.component.html",
  styleUrls: ["./filters-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersDialogComponent {
  filterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FiltersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FilterConfig
  ) {
    this.createForm(this.data);
  }

  private createForm(data: FilterConfig) {
    this.filterForm = this.fb.group({
      minVolume: [data?.minVolume || ""],
      maxVolume: [data?.maxVolume || ""],
      minPriceChange: [data?.minPriceChange || ""],
      maxPriceChange: [data?.maxPriceChange || ""],
      minPrice: [data?.minPrice || ""],
      maxPrice: [data?.maxPrice || ""],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onApplyClick(): void {
    this.dialogRef.close(this.filterForm.value);
  }
}
