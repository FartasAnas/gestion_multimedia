import {Component, EventEmitter, Output} from '@angular/core';
import UserObject from "../../../entities/UserObject";
import Role from "../../../entities/Role";
import AddUserObject from "../../../entities/AddUserObject";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-add-user-interface',
  templateUrl: './add-user-interface.component.html',
  styleUrls: ['./add-user-interface.component.css']
})
export class AddUserInterfaceComponent {
  @Output() closeInterface = new EventEmitter<boolean>();
  @Output() reloadList=new EventEmitter();
  currentStep: number=1;
  userObjectInitial:AddUserObject={
    email:'',
    username:'',
    firstName:'',
    lastName:'',
    function:'',
    password:'',
    roles:[],
    isActive:true,
  }
  userObject:AddUserObject={...this.userObjectInitial};
  confirmPassword:string=''
  showConfirmation = false;

  constructor(private userService:UserService) {
  }

  handelCloseInterfaceClick() {
    this.userObject={...this.userObjectInitial}
    this.closeInterface.emit(false);
  }

  handleSwitchStep(action: 'next' | 'previous') {
    this.currentStep = action ==='next'? this.currentStep+1 : this.currentStep-1
  }

  handleDisableSaveBtn() :boolean{
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return this.userObject.email==='' || this.userObject.username==='' || this.userObject.firstName==='' || this.userObject.lastName===''
      || this.userObject.password===''  || this.confirmPassword=='' || this.userObject.roles.length===0
      || !(this.userObject.password===this.confirmPassword) || !regex.test(this.userObject.password);
  }

  handleSubmit() {
    console.log('save')
  }

  handleConfirmation(confirmed: boolean) {
    if(confirmed){
      this.userService.saveUser(this.userObject).subscribe(
        ()=>{this.handelCloseInterfaceClick();this.reloadList.emit()},
        ()=>{console.error('Error saving role',this.userObject);}
      )
    }
    this.showConfirmation = false;
  }
}
