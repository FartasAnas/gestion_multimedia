import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import UpdatePasswordObject from "../../entities/UpdatePasswordObject";
import {UserStorageService} from "../../services/user-storage/user-storage.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit{
  confirmPassword=''
  updatePasswordObject:UpdatePasswordObject={
    email:'',
    newPassword:''
  }
  constructor(private userStorage:UserStorageService, private route:Router,private authenticationService:AuthenticationService) {
  }
  ngOnInit(): void {
    const user=this.userStorage.getUser()
    if(!user){
      this.userStorage.signOut()
      this.route.navigate([''])
    }
    else {
      if(!user.forgotPassword){
        this.route.navigate(['/home'])
      }else {
        console.log(user)
        this.updatePasswordObject.email=user.email;
      }
    }
  }
  onSubmit(loginForm: NgForm) {
    this.authenticationService.updatePassword(this.updatePasswordObject).subscribe(
      ()=>{
        alert("Le mot de passe a été mis à jour avec succès")
        this.userStorage.signOut()
        this.route.navigate([''])
      }
    )
  }
  validatePassword(password:String) {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password.valueOf());
  }
  isBtnDisabled() :boolean{
    return this.updatePasswordObject.newPassword === '' || this.confirmPassword === '' || !this.validatePassword(this.updatePasswordObject.newPassword)
      || this.confirmPassword!=this.updatePasswordObject.newPassword ;
  }


}
