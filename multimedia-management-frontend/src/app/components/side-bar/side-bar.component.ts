import { Component } from '@angular/core';
import {UserStorageService} from "../../services/user-storage/user-storage.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  constructor(public userStorage:UserStorageService) {
  }
  logOut() {
    this.userStorage.signOut()
    window.location.reload()
  }
}
