import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "src/app/components/confirmation-dialog/confirmation-dialog.component";
import { AuthService } from "src/app/services/Auth/auth.service";
import { PostService } from "src/app/services/Post/post.service";

@Component({
  selector: "app-posts",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"],
})
export class PostsComponent implements OnInit {
  constructor(
    private postService: PostService,
    private dialog: MatDialog,
    private userService: AuthService
  ) {}

  userAuth: any;
  isOwner!: boolean;

  @Input() post: any;

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((data) => {
      this.userAuth = data;
      this.isOwner = this.userAuth.id == this.post.user.id ? true : false;
    });
  }
  comment = {
    text: "",
    createdAt: new Date(),
  };

  pushComment(id: any) {
    console.log(id);
    this.postService.createComment(id, this.comment).subscribe({
      // next: (data) => console.log("update", data),
    });
  }

  pushLikes(id: any) {
    console.log(id);
    this.postService.likePost(id).subscribe({
      // next: (data) => console.log("update", data),
    });
  }

  // deletePost(): void {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     width: "250px",
  //     data: { message: "Sei sicuro di voler eliminare questo post?" },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       // Effettua la chiamata al servizio per eliminare il post
  //       this.postService.deletePost(this.post.id).subscribe({
  //         // next: () => {
  //         //   console.log("Post eliminato con successo.");
  //         // },
  //         // error: (error) => {
  //         //   console.error("Errore durante l'eliminazione del post:", error);
  //         // },
  //       });
  //     }
  //   });
  // }
}
