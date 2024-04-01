import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { UserProfileComponent } from "src/app/pages/user-profile/user-profile.component";
import { LogoutDialogComponent } from "../logout-dialog/logout-dialog.component";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent {
  constructor(public dialog: MatDialog) {}

  openDialogLogout(): void {
    this.dialog.open(LogoutDialogComponent, {});
  }

  openDialogProfile(): void {
    this.dialog.open(UserProfileComponent, {});
  }
}
