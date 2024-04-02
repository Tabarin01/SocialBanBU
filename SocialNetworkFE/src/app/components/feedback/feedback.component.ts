import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.css"],
})
export class FeedbackComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>){}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
