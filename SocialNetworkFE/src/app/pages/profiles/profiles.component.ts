import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/services/Auth/auth.service";
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
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  posts: any;

  users: any;

  userProfile: any;

  userAuth: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.loadUserProfile(id);
      }
    });

    // Gestisci i post ricevuti dal servizio
    this.userAuth = this.authService.getUserProfile().subscribe((data) => {
      this.userAuth = data;
    })
  }

  loadUserProfile(userId: string): void {
    this.userService.getUserById(userId).subscribe((userProfile) => {
      this.userProfile = userProfile;
      if (this.userProfile) {
        this.postService.getPosts().subscribe();
        this.postService.postSubject.subscribe((state) => {
          this.posts = this.sortPostsById(state.posts);
        });
      } else {
        console.error("Errore: Profilo utente non trovato.");
      }
    });
  }

  sortPostsById(post: any[] = []) {
    return post.sort((a, b) => b.id - a.id);
  }

 
}
