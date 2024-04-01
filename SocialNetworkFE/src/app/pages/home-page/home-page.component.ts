import { Component, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FormPostsComponent } from "src/app/components/form-post/form-post.component";
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
  users: any;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private userService: UserService,
    private dialog: MatDialog
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
  }

  openDialogFormPost(): void {
    const dialogRef = this.dialog.open(FormPostsComponent, {
    });
  }

  



  
}
