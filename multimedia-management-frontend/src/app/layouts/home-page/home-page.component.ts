import {Component, OnInit} from '@angular/core';
import Role from "../../entities/Role";
import {Observable} from "rxjs";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {UserStorageService} from "../../services/user-storage/user-storage.service";
import {Router} from "@angular/router";
import {FileService} from "../../services/file/file.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  roles$ : Observable<Role []> | undefined;
  numberOfImages$ ?:Observable<String>;
  constructor(private authenticationService:AuthenticationService,private route:Router, private userStorage:UserStorageService,private fileService:FileService) {
  }
  ngOnInit(): void {
    if(this.userStorage.getUser()==null){
      this.route.navigate(['/'])
    }
    // this.roles$=this.authenticationService.loadRoles()
    this.numberOfImages$=this.fileService.countFileByType("image")
  }
  getUsername():String{
    return  this.userStorage.getUsername()
  }

}
