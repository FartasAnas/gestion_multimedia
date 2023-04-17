import { Component } from '@angular/core';
import {UserStorageService} from "../../services/user-storage/user-storage.service";
import {Router} from "@angular/router";
import SideBarItemObject from "../../entities/SideBarItemObject";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  readonly sidebarItems: SideBarItemObject[] = [
    {
      content: { name: 'Web', icon: 'assets/Desktop.svg', url: 'web' },
      hasChildren: true,
      children: [
        { content: { name: 'Images', icon: 'assets/ImageSquare.svg', url: 'web/images' } },
        { content: { name: 'Vidéos', icon: 'assets/Video.svg', url: 'web/videos' } },
        { content: { name: 'Pictos', icon: 'assets/Person.svg', url: 'web/pictos' } },
        { content: { name: 'Documents', icon: 'assets/FileDoc.svg', url: 'web/documents' } },
      ]
    },
    {
      content: { name: 'Mobile', icon: 'assets/DeviceMobile.svg', url: 'mobile' },
      hasChildren: true,
      children: [
        { content: { name: 'Images', icon: 'assets/ImageSquare.svg', url: 'mobile/images' } },
        { content: { name: 'Vidéos', icon: 'assets/Video.svg', url: 'mobile/videos' } },
        { content: { name: 'Pictos', icon: 'assets/Person.svg', url: 'mobile/pictos' } },
        { content: { name: 'Documents', icon: 'assets/FileDoc.svg', url: 'mobile/documents' } },
      ]
    },
    {
      content: { name: 'SM', icon: 'assets/Graph.svg',url:'sm' },
      hasChildren: true,
      children: [
        { content: { name: 'Images', icon: 'assets/ImageSquare.svg', url: 'sm/images' } },
        { content: { name: 'Vidéos', icon: 'assets/Video.svg', url: 'sm/videos' } },
        { content: { name: 'Pictos', icon: 'assets/Person.svg', url: 'sm/pictos' } },
        { content: { name: 'Documents', icon: 'assets/FileDoc.svg', url: 'sm/documents' } },
      ]
    },
    {
      content: { name: 'P.L.V', icon: 'assets/PLV.svg' , url: 'plv'},
      hasChildren: true,
      children: [
        { content: { name: 'Images', icon: 'assets/ImageSquare.svg', url: 'plv/images' } },
        { content: { name: 'Vidéos', icon: 'assets/Video.svg', url: 'plv/videos' } },
        { content: { name: 'Pictos', icon: 'assets/Person.svg', url: 'plv/pictos' } },
        { content: { name: 'Documents', icon: 'assets/FileDoc.svg', url: 'plv/documents' } },
      ]
    },
    {
      content: { name: 'Campagnes', icon: 'assets/Megaphone.svg', url: 'campagnes' },
      hasChildren: true,
      children: [
        { content: { name: 'Images', icon: 'assets/ImageSquare.svg', url: 'campagnes/images' } },
        { content: { name: 'Vidéos', icon: 'assets/Video.svg', url: 'campagnes/videos' } },
        { content: { name: 'Pictos', icon: 'assets/Person.svg', url: 'campagnes/pictos' } },
        { content: { name: 'Documents', icon: 'assets/FileDoc.svg', url: 'campagnes/documents' } },
      ]
    }
  ];
  readonly homePage={ name: 'Accueil', icon: 'assets/House.svg', url: 'home' }
  readonly userManagement = { name: 'Utilisateurs', icon: 'assets/Users.svg' };
  readonly rolesManagement = { name: 'Roles', icon: 'assets/GearSix.svg' };
  showFooterChild:boolean=false

  constructor(private userStorage: UserStorageService, private router: Router) {}
  getUserFullName():string{
    return this.userStorage.getFullName()
  }


  handleFooterChildClick(action:'profile'|'logout') {
    if(action==='profile'){
      this.router.navigate(['profile'])
    }
    else if(action==='logout'){
      this.userStorage.signOut();
      this.router.navigate(['']);
    }
  }
}
