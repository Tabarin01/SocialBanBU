import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/Users/user.service";
import { FeedbackComponent } from "../feedback/feedback.component";

@Component({
  selector: "app-confirm-user-delete",
  templateUrl: "./confirm-user-delete.component.html",
  styleUrls: ["./confirm-user-delete.component.css"],
})
export class ConfirmUserDeleteComponent {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  id: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
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
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FeedbackComponent);
  }
}
