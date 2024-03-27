import { Component } from "@angular/core";
import { AuthService } from "../services/auth-service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  
  constructor(private authService: AuthService) {}

  login() {
    const inputGroup = document.querySelector(".input-group") as HTMLElement;
    const formBox = document.querySelector(".form-box") as HTMLElement;
    const btn = document.getElementById("btn") as HTMLElement;
    if (inputGroup && btn) {
      formBox.classList.remove("height1");
      formBox.classList.add("height2");
      inputGroup.classList.add("form-right");
      inputGroup.classList.remove("form-left");
      btn.classList.add("button-right");
      btn.classList.remove("button-left");
    }
  }

register() {
    const inputGroup = document.querySelector(".input-group") as HTMLElement;
    const formBox = document.querySelector(".form-box") as HTMLElement;
    const btn = document.getElementById("btn") as HTMLElement;
    if (inputGroup && btn) {
      formBox.classList.add("height1");
      formBox.classList.remove("height2");
      inputGroup.classList.add("form-left");
      inputGroup.classList.remove("form-right");
      btn.classList.add("button-left");
      btn.classList.remove("button-right");
    }
  }

  submitLogin() {
    // Handle login form submission logic here
  }

  submitRegister() {
    // Handle registration form submission logic here
  }
}
