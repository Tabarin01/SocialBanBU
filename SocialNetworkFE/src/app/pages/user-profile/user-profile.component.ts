import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/Auth/auth.service";
import { PostService } from "src/app/services/Post/post.service";
import { UserService } from "src/app/services/Users/user.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["../profiles/profiles.component.css"],
})
export class UserProfileComponent implements OnInit {
  posts = [
    {
      id: "",
      title: "",
      user: {
        id: "",
      },
      image: "",
    },
  ];
  users: any;

  constructor(
    public authService: AuthService,
    public postService: PostService
  ) {}

  userAuth: any;

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (data) => (this.userAuth = data),
    });

    this.postService.getPosts().subscribe();
    this.postService.postSubject.subscribe((state) => {
      this.posts = this.sortPostsById(state.posts);
    });
  }

  sortPostsById(post: any[] = []) {
    return post.sort((a, b) => b.id - a.id);
  }
}
