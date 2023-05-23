import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserStorageService} from "../../services/user-storage/user-storage.service";
import {Router} from "@angular/router";
import SideBarItemObject from "../../entities/SideBarItemObject";
import {CategoryService} from "../../services/category/category.service";
import {Observable} from "rxjs";
import Category from "../../entities/Category";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit,OnChanges{
  readonly homePage={ label: 'Accueil', icon: 'assets/House.svg', url: 'home' }
  readonly userManagement = { label: 'Utilisateurs', icon: 'assets/Users.svg' ,url:'users' };
  readonly rolesManagement = { label: 'Roles', icon: 'assets/GearSix.svg' ,url:'roles' };
  readonly categoriesManagement = { label: 'Categories', icon: 'assets/GearSix.svg' , url:'categories' };
  readonly hostname = window.location.hostname;
  sidebarItems: SideBarItemObject[] = [];
  showFooterChild:boolean=false
  categories$:Observable<Category[]>=new Observable<Category[]>()
  @Input() updateSideBar:boolean=false;

  constructor(private userStorage: UserStorageService, private router: Router, private categoryService:CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }
  getUserFullName():string{
    return this.userStorage.getFullName()
  }
  getCategoryIconUrl(categoryId:number):string{
    return this.categoryService.getIconUrl(categoryId);
  }
  private loadCategories(): void {
    this.sidebarItems = this.createSidebarItems();
  }
  private createSidebarItems(): SideBarItemObject[] {
    const role = this.userStorage.getRole();
    const sidebarItems: SideBarItemObject[] = [];

    role.subscribe(role => {
      role.actions.forEach(action => {
        if (action.category.isActive) {
          const children = [];
          if (action.image.isActive) {
            children.push({ content: { id: action.category.id, label: 'Images', icon: 'assets/ImageSquare.svg', url: `${action.category.path}/images` } });
          }
          if (action.video.isActive) {
            children.push({ content: { id: action.category.id, label: 'Vidéos', icon: 'assets/Video.svg', url: `${action.category.path}/videos` } });
          }
          if (action.pictogram.isActive) {
            children.push({ content: { id: action.category.id, label: 'Pictos', icon: 'assets/Person.svg', url: `${action.category.path}/pictos` } });
          }
          if (action.document.isActive) {
            children.push({ content: { id: action.category.id, label: 'Documents', icon: 'assets/FileDoc.svg', url: `${action.category.path}/documents` } });
          }

          sidebarItems.push({
            content: { id: action.category.id, label: action.category.label, icon: this.getCategoryIconUrl(action.category.id as number), url: action.category.path },
            hasChildren: true,
            children: children,
          });
        }
      });
    });
    return sidebarItems;
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

  ngOnChanges(changes: SimpleChanges): void {
    if(this.updateSideBar){
      this.sidebarItems = this.createSidebarItems();
    }
  }
}
