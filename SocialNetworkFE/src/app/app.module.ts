import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

//
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, provideHttpClient } from "@angular/common/http";

import { RouterModule, Routes } from "@angular/router";

//Componenti
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { NavComponent } from "./nav/nav.component";
import { FooterComponent } from "./footer/footer.component";

// const routes: Routes = [
//   { path: "login", component: LoginComponent },
//   { path: "", redirectTo: "/login", pathMatch: "full" },
//   { path: "**", redirectTo: "/login", pathMatch: "full" },
// ];

@NgModule({
  declarations: [AppComponent, LoginComponent, NavComponent, FooterComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
