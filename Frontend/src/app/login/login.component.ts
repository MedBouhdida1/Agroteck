import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "app/components/service/login.service";
import { UserAuthService } from "app/components/service/user-auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {


  constructor(private router: Router, private loginService: LoginService, private userAuthService: UserAuthService) { }

  ngOnInit(): void { }

  login(loginForm: NgForm) {
    this.loginService.signin(loginForm.value).subscribe(
      (res: any) => {
        console.log(loginForm.value)

        this.userAuthService.setToken(res.jwtToken);
        this.userAuthService.setRoles(res.user.role);
        this.router.navigate(["/start"]);
      },
      err => {
        console.log(err);
      }

    )
    console.log(loginForm.value);
  }


}
