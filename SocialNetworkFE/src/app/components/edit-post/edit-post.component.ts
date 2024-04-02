import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostService } from "src/app/services/Post/post.service";
import { DeleteFeedbackComponent } from "../feedback/feedback.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-edit-post",
  templateUrl: "./edit-post.component.html",
  styleUrls: ["./edit-post.component.css"],
})
export class EditPostComponent implements OnInit {
  postItem = {
    id: "",
    title: "",
    description: "",
    image: "",
  };
  posts: any;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.posts = this.postService.getPosts().subscribe();
    this.postService.postSubject.subscribe((state) => {
      this.posts = state.posts;
    });

    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id == this.route.snapshot.paramMap.get("id")) {
        this.postItem = this.posts[i];
        break;
      }
    }
    console.log(this.postItem);
  }

  onEdit() {
    this.postService.updatePost(this.postItem).subscribe({
      next: (data) => console.log("edited post ", data),
    });

    this.openDialog()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteFeedbackComponent);
  }
}
