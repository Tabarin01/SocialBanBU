import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "src/app/services/Auth/auth.service";
import { UserService } from "src/app/services/Users/user.service";
import { FeedbackComponent } from "../feedback/feedback.component";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-admin-edit",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"],
})
export class AdminEditComponent {
  userEdit = {
    id: "",
    fullName: "",
    dob: "",
    email: "",
    password: "",
    imgProfile: "",
  };
  user: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.loadUserProfile(id);
      }
    });
  }

  loadUserProfile(userId: string): void {
    this.userService.getUserById(userId).subscribe((userProfile) => {
      this.userEdit = userProfile;
      if (this.userEdit) {
      } else {
        console.error("Errore: Profilo utente non trovato.");
      }
    });
  }

  onEdit() {
    this.userService.updateUser(this.userEdit).subscribe({
      next: (data) => data,
    });
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FeedbackComponent);
  }
}
