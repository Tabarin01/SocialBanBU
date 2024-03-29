import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/Auth/auth.service";
import { PostService } from "src/app/services/Post/post.service";

@Component({
  selector: "app-form-post",
  templateUrl: "./form-post.component.html",
  styleUrls: ["./form-post.component.css"],
})
export class FormPostsComponent implements OnInit{

  posts = [];
  userAuth: any;

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  url = ""
  
  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (data) => this.userAuth = data,
      error: (error) => console.log('error', error),
    });
    

    this.postService.getPosts().subscribe();
    this.postService.postSubject.subscribe((state) => {
      this.posts = state.posts;
      console.log(this.posts);
    });

  }
}
