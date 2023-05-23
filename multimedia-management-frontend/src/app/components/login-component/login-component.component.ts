import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import LoginObject from "../../entities/LoginObject";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {UserStorageService} from "../../services/user-storage/user-storage.service";
import StorageObject from "../../entities/StorageObject";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent  implements OnInit {
    loginObject: LoginObject = {
      email:"",
      password:""
    };
  isLoggedIn = false;
  isLoginFailed = false;

    constructor(private authenticationService:AuthenticationService, private userStorage:UserStorageService , private route:Router) {
    }

  ngOnInit(): void {
    if (this.userStorage.getUser()) {
      this.isLoggedIn = true;
      this.route.navigate(['/home'])
    }
  }
  reloadPage(): void {
    window.location.reload();
  }

    onSubmit(form :NgForm) {
      this.authenticationService.login(this.loginObject).subscribe(
        data=>{
          const storageObject: StorageObject = {
            email: data.email,
            username: data.username,
            token: data.token,
            roles: data.roles,
            fullName:data.fullName,
            isActive:data.isActive
          };
          this.userStorage.saveUser(storageObject);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.reloadPage();
        },
        error => {
          console.error('Login error:', error.status);
          this.isLoginFailed = true;
        }
      )
    }

    isEmailValid(email: string) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    emailNotValid() {
      return { 'email-notValid': !this.isEmailValid(this.loginObject.email.valueOf()) && this.loginObject.email !== '' };
    }

    isDisabled() {
      return { 'btn-form-empty': this.loginObject.email === '' || this.loginObject.password === '' || !this.isEmailValid(this.loginObject.email.valueOf()) };
    }


}
