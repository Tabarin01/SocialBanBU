import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostService } from "src/app/services/Post/post.service";
import { UserService } from "src/app/services/Users/user.service";

@Component({
  selector: "app-profiles",
  templateUrl: "./profiles.component.html",
  styleUrls: ["./profiles.component.css"],
})
export class ProfilesComponent implements OnInit {
  constructor(
    private postService: PostService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  posts: any;

  users: any;

  userProfile: any;

  ngOnInit(): void {
    this.postService.getPosts().subscribe();
    this.postService.postSubject.subscribe((state) => {
      this.posts = state.posts;
      // console.log(this.posts);
    });

    this.userService.getAllUsers().subscribe((users) => {
      // Gestisci i post ricevuti dal servizio
      this.users = users;

      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id == this.route.snapshot.paramMap.get("id")) {
          this.userProfile = this.users[i];
          break;
        }
      }
    });
  }
}
