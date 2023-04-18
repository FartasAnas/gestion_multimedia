import {Component, OnInit, ViewChild} from '@angular/core';
import {UserStorageService} from "../../services/user-storage/user-storage.service";
import UserObject from "../../entities/UserObject";
import {UserService} from "../../services/user/user.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.css']
})
export class ProfileLayoutComponent implements OnInit{
  btnText = 'Modifier mon profil';
  btnIconUrl = 'assets/PencilSimpleLineWhite.svg';
  isUpdating:boolean=false
  userObject?:UserObject
  @ViewChild('updateProfileForm') updateProfileForm!: NgForm;
  constructor(private userStorageService:UserStorageService,private userService:UserService) {
  }

  handleUpdateBtn() {
    this.isUpdating=!this.isUpdating
    if (!this.isUpdating && this.userObject) {
      this.updateProfileForm.reset({
        firstName: this.userObject.firstName,
        lastName: this.userObject.lastName,
        function: this.userObject.function,
        email: this.userObject.email
      });
    }
  }

  ngOnInit(): void {
    this.userService.getUserByEmail(this.userStorageService.getUserEmail()).subscribe(
      user=>{
        this.userObject=user;
      }
    )
  }
}
