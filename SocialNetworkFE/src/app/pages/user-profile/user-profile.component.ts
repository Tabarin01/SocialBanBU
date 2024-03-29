import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { PostService } from 'src/app/services/Post/post.service';
import { UserService } from 'src/app/services/Users/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  user: any;
  posts = []

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit() {
    console.log("Hello");
    this.authService.getUserProfile().subscribe((state) => {
      this.user = state.user;
    });
    this.postService.getPosts().subscribe();
    this.postService.postSubject.subscribe((state) => {
      this.posts = state.posts;
    });
  }






}
