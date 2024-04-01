import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "src/app/services/Post/post.service";

@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.css"],
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}
  id: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
  }

  onClick() {
    this.postService.deletePost(this.id).subscribe({
      next: () => {
        console.log("Post eliminato con successo.");
      },
      error: (error) => {
        console.error("Errore durante l'eliminazione del post:", error);
      },
    });
  }

}
