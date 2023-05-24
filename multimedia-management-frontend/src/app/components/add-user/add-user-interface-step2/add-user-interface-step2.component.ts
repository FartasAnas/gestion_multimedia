import {Component, Input, OnInit} from '@angular/core';
import AddUserObject from "../../../entities/AddUserObject";
import {RoleService} from "../../../services/role/role.service";
import Role from "../../../entities/Role";

@Component({
  selector: 'app-add-user-interface-step2',
  templateUrl: './add-user-interface-step2.component.html',
  styleUrls: ['./add-user-interface-step2.component.css']
})
export class AddUserInterfaceStep2Component implements OnInit{
  @Input() userObject?:AddUserObject
  roles:Role[]=[]
  constructor(private roleService:RoleService) {
  }
  ngOnInit(): void {
    this.loadRoles()
  }
  private loadRoles(){
    this.roleService.getRoles().subscribe(
      roles=>{
        this.roles=roles
      }
    )
  }


  handleSelectRole(event: any) {
    const index=this.roles.findIndex(role=>role.id===Number(event.target.value))
    if(index!==-1){
      (this.userObject as AddUserObject).roles[0]=this.roles[index]
    }
  }
}
