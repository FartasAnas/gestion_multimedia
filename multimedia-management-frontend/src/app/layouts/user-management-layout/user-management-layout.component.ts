import {Component, OnInit} from '@angular/core';
import UserObject from "../../entities/UserObject";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-user-management-layout',
  templateUrl: './user-management-layout.component.html',
  styleUrls: ['./user-management-layout.component.css']
})
export class UserManagementLayoutComponent implements OnInit{
  users: UserObject[]=[];
  constructor(private userService:UserService) {
  }
  ngOnInit(): void {
    this.loadUsers()
  }
  private loadUsers(){
    this.userService.getUsers().subscribe(
      (users:UserObject[])=>{this.users=users}
    )
  }

  reloadUser() {
    this.loadUsers()
  }
}
