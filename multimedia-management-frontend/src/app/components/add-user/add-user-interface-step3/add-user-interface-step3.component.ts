import {Component, EventEmitter, Input, Output} from '@angular/core';
import AddUserObject from "../../../entities/AddUserObject";

@Component({
  selector: 'app-add-user-interface-step3',
  templateUrl: './add-user-interface-step3.component.html',
  styleUrls: ['./add-user-interface-step3.component.css']
})
export class AddUserInterfaceStep3Component {
  @Input() userObject?:AddUserObject
  @Input() confirmPassword=''
  @Output() emitConfirmPassword=new EventEmitter<string>()

  validatePassword(password:String) {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password.valueOf());
  }
}
