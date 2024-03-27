import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

//
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, provideHttpClient } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { RouterModule, Routes } from "@angular/router";

//Componenti
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { NavComponent } from "./components/nav/nav.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { PostComponent } from "./components/post/post.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// const routes: Routes = [
//   { path: "login", component: LoginComponent },
//   { path: "", redirectTo: "/login", pathMatch: "full" },
//   { path: "**", redirectTo: "/login", pathMatch: "full" },
// ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    FooterComponent,
    HomePageComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
