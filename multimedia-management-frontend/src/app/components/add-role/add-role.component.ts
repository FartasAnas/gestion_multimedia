import {Component, EventEmitter, Output} from '@angular/core';
import Role from "../../entities/Role";
import {RoleService} from "../../services/role/role.service";
import Category from "../../entities/Category";
import {CategoryService} from "../../services/category/category.service";

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent{
  @Output() closeInterface = new EventEmitter<boolean>();
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
  constructor(private roleService:RoleService,private categoryService:CategoryService) {
    this.roleObject={...this.roleObjectInitialValue};
  }
  handelCloseInterfaceClick() {
    this.closeInterface.emit(false);
    this.roleObject={...this.roleObjectInitialValue};
  }
  handleAddRole() {
    this.showConfirmation = true;
  }
  handleConfirmation(confirmed: boolean) {
    if(confirmed){
      this.roleService.saveRole(this.roleObject).subscribe(
        ()=>{this.handelCloseInterfaceClick();},
        ()=>{console.error('Error saving role',this.roleObject);}
      )
    }
    this.showConfirmation = false;
  }

}
