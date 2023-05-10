import {Component, OnInit} from '@angular/core';
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
export class SideBarComponent implements OnInit{
  readonly homePage={ label: 'Accueil', icon: 'assets/House.svg', url: 'home' }
  readonly userManagement = { label: 'Utilisateurs', icon: 'assets/Users.svg' };
  readonly rolesManagement = { label: 'Roles', icon: 'assets/GearSix.svg' ,url:'roles' };
  readonly categoriesManagement = { label: 'Categories', icon: 'assets/GearSix.svg' , url:'categories' };
  readonly hostname = window.location.hostname;
  sidebarItems: SideBarItemObject[] = [];
  showFooterChild:boolean=false
  categories$:Observable<Category[]>=new Observable<Category[]>()

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
    this.categories$ = this.categoryService.getCategories();
    this.categories$.subscribe(categories => {
      this.sidebarItems = this.createSidebarItems(categories);
    });
  }
  private createSidebarItems(categories: Category[]): SideBarItemObject[] {
    const sidebarItems: SideBarItemObject[] = categories
      .filter(category => category.isActive)
      .map(category => ({
        content: { id: category.id, label: category.label, icon: this.getCategoryIconUrl(category.id as number), url: category.path },
        hasChildren: true,
        children: [],
      }));

    const role = this.userStorage.getRole();
    role.subscribe(role => {
      sidebarItems.forEach(sidebarItem => {
        const children = [];
        if (role.action.image) {
          children.push({ content: { id: sidebarItem.content.id, label: 'Images', icon: 'assets/ImageSquare.svg', url: `${sidebarItem.content.url}/images` } });
        }
        if (role.action.video) {
          children.push({ content: { id: sidebarItem.content.id, label: 'Vidéos', icon: 'assets/Video.svg', url: `${sidebarItem.content.url}/videos` } });
        }
        if (role.action.pictogram) {
          children.push({ content: { id: sidebarItem.content.id, label: 'Pictos', icon: 'assets/Person.svg', url: `${sidebarItem.content.url}/pictos` } });
        }
        if (role.action.document) {
          children.push({ content: { id: sidebarItem.content.id, label: 'Documents', icon: 'assets/FileDoc.svg', url: `${sidebarItem.content.url}/documents` } });
        }
        sidebarItem.children = children;
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
}
