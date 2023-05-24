import {Component, OnInit} from '@angular/core';
import UserObject from "../../entities/UserObject";
import {UserService} from "../../services/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import Role from "../../entities/Role";
import {RoleService} from "../../services/role/role.service";
import AddUserObject from "../../entities/AddUserObject";

@Component({
  selector: 'app-update-user-layout',
  templateUrl: './update-user-layout.component.html',
  styleUrls: ['./update-user-layout.component.css']
})
export class UpdateUserLayoutComponent implements OnInit{
  updateSideBar=false;
  isUpdating=false;
  showConfirmation= false;
  userObject?:UserObject;
  roles: Role[]=[];
  constructor(private userService:UserService,private roleService:RoleService,private activatedRoute: ActivatedRoute,private router:Router) {
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.loadUser(+params['id']);
      this.loadRoles()
    });
  }
  private loadUser(id:number){
    this.userService.getUserById(id).subscribe(
      user=>{this.userObject=user;}
    )
  }
  private loadRoles(){
    this.roleService.getRoles().subscribe(
      roles=>{
        this.roles=roles
      }
    )
  }


  handleCancelBtn() {
    this.isUpdating=false
    this.loadUser(this.userObject?.id as number)
  }

  handleUpdateBtn() {
    if(this.isUpdating){
      console.log(this.userObject)
      this.userService.updateUser(this.userObject as UserObject).subscribe(data=>{
        this.isUpdating=false
        this.updateSideBar=true;

      })
    }
    this.isUpdating=true
    this.updateSideBar=false;
  }
  handleSelectRole(event: any) {
    const index=this.roles.findIndex(role=>role.id===Number(event.target.value))
    if(index!==-1){
      (this.userObject as AddUserObject).roles[0]=this.roles[index]
    }
  }


  handleConfirmation(confirmed: boolean) {
    if(confirmed){
      this.userService.deleteUser(this.userObject?.id as number).subscribe(data=>{
        this.router.navigate(['/users'])
      })
    }
    this.showConfirmation = false;
  }
}
