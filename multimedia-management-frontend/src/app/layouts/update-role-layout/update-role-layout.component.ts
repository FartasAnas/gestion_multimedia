import {Component, OnInit} from '@angular/core';
import Role from "../../entities/Role";
import {RoleService} from "../../services/role/role.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-update-role-layout',
  templateUrl: './update-role-layout.component.html',
  styleUrls: ['./update-role-layout.component.css']
})
export class UpdateRoleLayoutComponent implements OnInit{
  isUpdating=false;
  roleObject?:Role;
  roleObjectInitialValue?:Role;
  constructor(private roleService:RoleService,private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getRole(+params['id']);
    });
  }
  private getRole(id: number) {
    this.roleService.getRoleById(id).subscribe(data => {
      this.roleObject = data;
      this.roleObjectInitialValue= {...this.roleObject};
    });
  }
  handleCancelBtn() {
    this.isUpdating=false
    this.roleObject={...this.roleObjectInitialValue} as Role
  }

  handleUpdateBtn() {
    if(this.isUpdating){
        this.roleService.updateRole(this.roleObject as Role).subscribe(data=>{
            this.isUpdating=false
            this.roleObjectInitialValue= {...this.roleObject} as Role;
        })
    }
    this.isUpdating=true
  }
  handleChangeAction(status: boolean, attributeName: 'isActive'|'imageAction'|'videoAction'|'pictogramAction'|'documentAction') {
    switch (attributeName) {
      case 'isActive':
        (this.roleObject as Role).isActive = status;
        break;
      case 'imageAction':
        (this.roleObject as Role).action.image = status;
        break;
      case 'videoAction':
        (this.roleObject as Role).action.video = status;
        break;
      case 'pictogramAction':
        (this.roleObject as Role).action.pictogram = status;
        break;
      case 'documentAction':
        (this.roleObject as Role).action.document = status;
        break;
      default:
        break;
    }
  }

}
