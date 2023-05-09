import {Component, EventEmitter, Output} from '@angular/core';
import Role from "../../entities/Role";
import {RoleService} from "../../services/role/role.service";

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent {
  @Output() closeInterface = new EventEmitter<boolean>();
  showConfirmation = false;
  roleObjectInitialValue:Role={
    name:'',
    description:'',
    action:{
      image:false,
      video:false,
      pictogram:false,
      document:false
    },
    isActive:true
  }
  roleObject:Role
  constructor(private roleService:RoleService) {
    this.roleObject={...this.roleObjectInitialValue};
  }
  handelCloseInterfaceClick() {
    this.closeInterface.emit(false);
    this.roleObject={...this.roleObjectInitialValue};
  }

  handleChangeStatus(status: boolean, attributeName: 'isActive'|'imageAction'|'videoAction'|'pictogramAction'|'documentAction') {
    switch (attributeName) {
      case 'isActive':
        this.roleObject.isActive = status;
        break;
      case 'imageAction':
        this.roleObject.action.image = status;
        break;
      case 'videoAction':
        this.roleObject.action.video = status;
        break;
      case 'pictogramAction':
        this.roleObject.action.pictogram = status;
        break;
      case 'documentAction':
        this.roleObject.action.document = status;
        break;
      default:
        break;
    }
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
