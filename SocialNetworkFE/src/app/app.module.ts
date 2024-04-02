import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";

//Material
import { HttpClientModule, provideHttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";

//Componenti
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";
import { FormPostsComponent } from "./components/form-post/form-post.component";
import { NavComponent } from "./components/nav/nav.component";
import { PostsComponent } from "./components/post/post.component";
import { ShowPostsComponent } from "./components/show-posts/show-posts.component";
import { VoidComponentComponent } from "./components/void/void.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { LoginComponent } from "./pages/login/login.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { ProfilesComponent } from "./pages/profiles/profiles.component";
import { EditPostComponent } from "./components/edit-post/edit-post.component";
import { FeedbackComponent } from "./components/feedback/feedback.component";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";
import { ConfirmUserDeleteComponent } from './components/confirm-user-delete/confirm-user-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    HomePageComponent,
    FormPostsComponent,
    PostsComponent,
    UserProfileComponent,
    ConfirmationDialogComponent,
    ShowPostsComponent,
    VoidComponentComponent,
    ProfilesComponent,
    EditPostComponent,
    FeedbackComponent,
    EditProfileComponent,
    ConfirmUserDeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
