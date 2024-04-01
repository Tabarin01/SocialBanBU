import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { ShowPostsComponent } from "./components/show-posts/show-posts.component";
import { VoidComponentComponent } from "./void/void.component";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";

const routes: Routes = [
  { path: "", component: HomePageComponent },
  {
    path: "posts",
    component: ShowPostsComponent,
    children: [{ path: "confirm", component: ConfirmationDialogComponent }],
  },
  { path: "profile", component: UserProfileComponent },
  { path: "void", component: VoidComponentComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
