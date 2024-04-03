import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/Users/user.service";
import { FeedbackComponent } from "../feedback/feedback.component";
import { AuthService } from "src/app/services/Auth/auth.service";

@Component({
  selector: "app-confirm-user-delete",
  templateUrl: "./confirm-user-delete.component.html",
  styleUrls: ["./confirm-user-delete.component.css"],
})
export class ConfirmUserDeleteComponent {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  id: any;
  userAuth: any;

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (data) => (this.userAuth = data),
    });

    this.id = this.route.snapshot.paramMap.get("id");
  }

  onClick() {
    this.userService.deleteUser(this.id).subscribe({
      next: () => {
        console.log("User eliminato con successo.");
      },
      error: (error) => {
        console.error("Errore durante l'eliminazione del post:", error);
      },
    });

    console.log(this.id + " == " + this.userAuth.id);

    if (this.id == this.userAuth.id) {
      this.authService.logout();
    } else {
      this.openDialog();
    }
  }

  /**
 * 
 * ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (data) => (this.userAuth = data),
    });

    this.postService.getPosts().subscribe();
    this.postService.postSubject.subscribe((state) => {
      this.posts = this.sortPostsById(state.posts);
    });
  }
 * 
 * 
 */

  openDialog(): void {
    const dialogRef = this.dialog.open(FeedbackComponent);
  }
}
