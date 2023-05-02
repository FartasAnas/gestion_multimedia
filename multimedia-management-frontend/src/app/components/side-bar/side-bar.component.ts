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
  readonly homePage={ name: 'Accueil', icon: 'assets/House.svg', url: 'home' }
  readonly userManagement = { name: 'Utilisateurs', icon: 'assets/Users.svg' };
  readonly rolesManagement = { name: 'Roles', icon: 'assets/GearSix.svg' };
  readonly categoriesManagement = { name: 'Categories', icon: 'assets/GearSix.svg' , url:'categories' };
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
    return categories
      .filter(category => category.isActive)
      .map(category => ({
        content: { name: category.name, icon:this.getCategoryIconUrl(category.id), url: category.path },
        hasChildren: true,
        children: [
          { content: { name: 'Images', icon: 'assets/ImageSquare.svg', url: `${category.path}/images` } },
          { content: { name: 'Vidéos', icon: 'assets/Video.svg', url: `${category.path}/videos` } },
          { content: { name: 'Pictos', icon: 'assets/Person.svg', url: `${category.path}/pictos` } },
          { content: { name: 'Documents', icon: 'assets/FileDoc.svg', url: `${category.path}/documents` } },
        ],
      }));
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
