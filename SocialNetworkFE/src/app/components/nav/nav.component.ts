import { Component } from "@angular/core";
import { LogoutDialogComponent } from "../logout-dialog/logout-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
    });
  }
}
