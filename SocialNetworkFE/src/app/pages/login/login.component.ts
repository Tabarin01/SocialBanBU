import { Component } from "@angular/core";
import { AuthService } from "../../services/Auth/auth.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  emailValid = true;
  loginCredentialValid = true;

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  registrationForm = new FormGroup({
    fullName: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
    dob: new FormControl("", [Validators.required]),
  });

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

  handlerLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem("jwt", response.jwt);
        this.authService.getUserProfile().subscribe();
        this.loginCredentialValid = true;
        console.log("Login success");
      },
      error: (error) => {
        this.loginCredentialValid = false;
        console.log(error.error.message + " " + this.loginCredentialValid);
      },
    });
  }

  handlerRegister() {
    console.log("register", this.registrationForm.value);
    this.authService.register(this.registrationForm.value).subscribe({
      next: (response) => {
        localStorage.setItem("jwt", response.jwt);
        this.authService.getUserProfile().subscribe();
        console.log("Registration success");
      },
      error: (error) => {
        this.emailValid =
          error.error.message === "Email is already used with another account"
            ? false
            : true;
        console.log(error.error.message + " " + this.emailValid);
      },
    });
  }
}
