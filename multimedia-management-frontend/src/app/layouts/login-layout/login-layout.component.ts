import { Component } from '@angular/core';
import LoginObject from "../../entities/LoginObject";

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css']
})
export class LoginLayoutComponent {
  // to send data outside of the component child
  // onformSubmit(loginObject:LoginObject) {
  //   console.log("welcome ",loginObject.email)
  // }
}
