import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Router} from "@angular/router";
import {UserStorageService} from "../../services/user-storage/user-storage.service";

@Component({
  selector: 'app-web-layout',
  templateUrl: './web-layout.component.html',
  styleUrls: ['./web-layout.component.css']
})
export class WebLayoutComponent implements OnInit {
  ngOnInit(): void {
    if(this.userStorage.getUser()==null){
      this.route.navigate(['/'])
    }
  }
  constructor(private authenticationService:AuthenticationService,private route:Router, private userStorage:UserStorageService) {
  }

}
