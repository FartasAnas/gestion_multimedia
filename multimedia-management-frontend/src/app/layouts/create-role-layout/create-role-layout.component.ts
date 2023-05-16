import { Component } from '@angular/core';
import Role from "../../entities/Role";
import Category from "../../entities/Category";
import {RoleService} from "../../services/role/role.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-role-layout',
  templateUrl: './create-role-layout.component.html',
  styleUrls: ['./create-role-layout.component.css']
})
export class CreateRoleLayoutComponent {
  showConfirmation = false;
  roleObjectInitialValue:Role={
    name:'',
    description:'',
    actions:[],
    isActive:true
  }
  roleObject:Role
  hoveredCategory?:Category
  showActions= false;
  constructor(private roleService:RoleService,private router:Router) {
    this.roleObject={...this.roleObjectInitialValue};
  }

  handleCancelAdd() {
    this.roleObject={...this.roleObjectInitialValue,actions:[]};
  }
  handleAddRole() {
    this.showConfirmation = true;
  }
  handleConfirmation(confirmed: boolean) {
    if(confirmed){
      this.roleService.saveRole(this.roleObject).subscribe(
        ()=>{this.router.navigate(['/roles'])},
        ()=>{console.error('Error saving role',this.roleObject);}
      )
    }
    this.showConfirmation = false;
  }
}
