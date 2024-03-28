import { Component, Input } from "@angular/core";
import { PostCommentComponent } from "../post-comment/post-comment.component";
import { MatDialog } from "@angular/material/dialog";
import { PostService } from "src/app/services/Post/post.service";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"],
})
export class PostsComponent {
  constructor(private postService: PostService) {}

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

  
}
