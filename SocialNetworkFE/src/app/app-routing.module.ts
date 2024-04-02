import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";
import { FormPostsComponent } from "./components/form-post/form-post.component";
import { ShowPostsComponent } from "./components/show-posts/show-posts.component";
import { VoidComponentComponent } from "./components/void/void.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { ProfilesComponent } from "./pages/profiles/profiles.component";
import { EditPostComponent } from "./components/edit-post/edit-post.component";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";

const routes: Routes = [
  { path: "", component: ShowPostsComponent },
  { path: "posts", component: ShowPostsComponent },
  { path: "loggedProfile", component: UserProfileComponent },
  { path: "creationPost", component: FormPostsComponent },
  { path: "deletePost/:id", component: ConfirmationDialogComponent },
  { path: "profileUser/:id", component: ProfilesComponent },
  { path: "editPost/:id", component: EditPostComponent },
  { path: "editProfile", component: EditProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
