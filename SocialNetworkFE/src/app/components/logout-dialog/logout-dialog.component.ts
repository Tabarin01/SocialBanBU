import { Component } from "@angular/core";
import { AuthService } from "src/app/services/Auth/auth.service";
import { NavComponent } from "../nav/nav.component";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-logout-dialog",
  templateUrl: "./logout-dialog.component.html",
  styleUrls: ["./logout-dialog.component.css"],
})
export class LogoutDialogComponent {
  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<NavComponent>
  ) {}

  handleLogout() {
    this.authService.logout();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
