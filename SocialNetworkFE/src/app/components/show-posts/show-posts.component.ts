import { Component } from "@angular/core";
import { AuthService } from "src/app/services/Auth/auth.service";
import { PostService } from "src/app/services/Post/post.service";

@Component({
  selector: "app-show-posts",
  templateUrl: "./show-posts.component.html",
  styleUrls: ["./show-posts.component.css"],
})
export class ShowPostsComponent {
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe();
    this.postService.postSubject.subscribe((state) => {
      this.posts = this.sortPostsById(state.posts);
    });
  }

  sortPostsById(post : any[] = []) {
    return post.sort((a, b) => b.id - a.id); // Ordinamento decrescente per ID
  }
}
