import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/Users/user.service";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"],
})
export class EditProfileComponent {
  userEdit = {
    id: "",
    fullName: "",
    email: "",
    password: "",
    imgProfile: "",
  };
  user: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.user = this.userService.getUserById(id).subscribe();
    this.userService.userSubject.subscribe((state) => {
      this.user = state.user;
    });
    this.userEdit = this.user;
  }

  onEdit() {
    this.userService.updatePost(this.userEdit).subscribe({});
  }
}
