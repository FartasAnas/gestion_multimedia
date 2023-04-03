import { Component } from '@angular/core';
import {UserStorageService} from "../../services/user-storage/user-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  constructor(public userStorage:UserStorageService,private route:Router) {
  }
  logOut() {
    this.userStorage.signOut()
    this.route.navigate([''])
  }
}
