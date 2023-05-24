import {Component, Input} from '@angular/core';
import UserObject from "../../../entities/UserObject";
import AddUserObject from "../../../entities/AddUserObject";

@Component({
  selector: 'app-add-user-interface-step1',
  templateUrl: './add-user-interface-step1.component.html',
  styleUrls: ['./add-user-interface-step1.component.css']
})
export class AddUserInterfaceStep1Component {
  @Input() userObject?:AddUserObject
}
