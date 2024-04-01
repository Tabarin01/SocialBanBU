import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";
import { FormPostsComponent } from "./components/form-post/form-post.component";
import { ShowPostsComponent } from "./components/show-posts/show-posts.component";
import { VoidComponentComponent } from "./components/void/void.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";

const routes: Routes = [
  { path: "", component: VoidComponentComponent },
  {
    path: "posts",
    component: ShowPostsComponent,
    children: [{ path: "confirm", component: ConfirmationDialogComponent }],
  },
  { path: "profile", component: UserProfileComponent },
  { path: "creationPost" , component: FormPostsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
