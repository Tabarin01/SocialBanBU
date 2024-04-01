import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostService } from "src/app/services/Post/post.service";

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
    private route: ActivatedRoute
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
    this.postService.updatePost(this.postItem).subscribe({});
  }
}
