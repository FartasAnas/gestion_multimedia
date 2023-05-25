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
  forgotPassword=false
  showForgotPasswordTxt=true;

  constructor(private authenticationService:AuthenticationService, private userStorage:UserStorageService , private route:Router) {
  }

  ngOnInit(): void {
    const user=this.userStorage.getUser()
    if (user) {
      this.isLoggedIn = true;
      this.route.navigate(user.forgotPassword ? ['/update-password'] : ['/home'])
    }
  }
  reloadPage(): void {
    window.location.reload();
  }

  onSubmit(form :NgForm) {
    if(this.forgotPassword){
      if(this.loginObject.email!=''){
        this.authenticationService.forgotPassword(this.loginObject.email).subscribe(
          data=>{
            this.forgotPassword=false
            this.loginObject.password=''
            this.isLoginFailed=false
            this.showForgotPasswordTxt=false
          }
        )
        alert("Un e-mail est en cours d'envoi à "+this.loginObject.email+".\nCeci peut prendre un peu de temps, veuillez patienter.");
      }
    }
    else {
      this.authenticationService.login(this.loginObject).subscribe(
        data=>{
          const storageObject: StorageObject = {
            email: this.loginObject.email,
            username: data?.username,
            token: data?.token,
            roles: data?.roles,
            fullName:data?.fullName,
            isActive:data?.isActive,
            forgotPassword:data.forgotPassword
          };
          console.log(data)
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
