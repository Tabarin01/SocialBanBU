import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "src/app/components/confirmation-dialog/confirmation-dialog.component";
import { AuthService } from "src/app/services/Auth/auth.service";
import { PostService } from "src/app/services/Post/post.service";

@Component({
  selector: "app-posts",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"],
})
export class PostsComponent implements OnInit {
  constructor(
    private postService: PostService,
    private dialog: MatDialog,
    private userService: AuthService
  ) {}

  userAuth: any;
  isOwner!: boolean;

  @Input() post: any;

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe((data) => {
      this.userAuth = data;
      this.isOwner =
        this.userAuth.id == this.post.user.id || this.userAuth.role == "ADMIN"
          ? true
          : false;
    });
    
  }

  comment = {
    text: "",
    createdAt: new Date(),
  };

  isEmpty(): boolean{
      return  this.comment.text.length < 1 ? true  : false;
  }

  
 

  pushComment(id: any) {
    console.log(id);
    this.postService.createComment(id, this.comment).subscribe({
      // next: (data) => console.log("update", data),
    });
  }

  pushLikes(id: any) {
    console.log(id);
    this.postService.likePost(id).subscribe({
      // next: (data) => console.log("update", data),
    });
  }

  ngOnChanges(): void {
    this.loadUserData(); // Ricarica i dati della componente quando l'input `post` cambia
  }

  loadUserData() {
    if (!this.post) {
      return;
    }
  }
}
