import { Component, Input } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from "src/app/confirmation-dialog/confirmation-dialog.component";
import { PostService } from "src/app/services/Post/post.service";


@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"],
})
export class PostsComponent {
  constructor(
    private postService: PostService,
    private dialog: MatDialog
  ) {}

  @Input() post: any;

  comment = {
    text:  "",
    createdAt: new Date()
  } 

  pushComment(id: any) {
    console.log(id);
    this.postService.createComment(id, this.comment).subscribe({
      next: (data) => console.log("update", data),
    });
  }

  deletePost(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Sei sicuro di voler eliminare questo post?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Effettua la chiamata al servizio per eliminare il post
        this.postService.deletePost(this.post.id).subscribe({
          next: () => {
            console.log('Post eliminato con successo.');
          },
          error: (error) => {
            console.error('Errore durante l\'eliminazione del post:', error);
          }
        });
      }
    });
  }

  reload(){
    window.location.reload()
  }

  
}
