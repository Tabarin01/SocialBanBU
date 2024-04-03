import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/services/Auth/auth.service";
import { UserService } from "src/app/services/Users/user.service";
import { FeedbackComponent } from "../feedback/feedback.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["../form-post/form-post.component.css"],
})
export class EditProfileComponent implements OnInit {
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
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (data) => (this.userEdit = data),
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
