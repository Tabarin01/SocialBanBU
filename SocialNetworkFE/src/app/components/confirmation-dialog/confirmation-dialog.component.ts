import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.css"],
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private route: ActivatedRoute
  ) {}

  reload() {
    window.location.reload();
  }

  confirmDelete(): void {
    this.dialogRef.close(true);
    this.route.snapshot.parent
  }
}
