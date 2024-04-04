import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/Auth/auth.service";
import { PostService } from "src/app/services/Post/post.service";
import { UserService } from "src/app/services/Users/user.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
})
export class HomePageComponent implements OnInit {
  posts = [];
 
  userAuth: any;

  users: any;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private userService: UserService
  ) {}


  ngOnInit() {
    this.postService.getPosts().subscribe();
    this.postService.postSubject.subscribe((state) => {
      this.posts = state.posts;
    });

    this.authService.getUserProfile();
    this.userService.getAllUsers().subscribe((users) => {
      // Gestisci i post ricevuti dal servizio
      this.users = users;
    });
    this.authService.getUserProfile().subscribe({
      next: (data) => (this.userAuth = data),
    });
  }

}


