import {Component, OnInit} from '@angular/core';
import {UserStorageService} from "../../services/user-storage/user-storage.service";
import {Route, Router} from "@angular/router";
import SideBarItemObject from "../../entities/SideBarItemObject";
import {CategoryService} from "../../services/category/category.service";
import {Observable} from "rxjs";
import Category from "../../entities/Category";
import {ImagesLayoutComponent} from "../../layouts/images-layout/images-layout.component";
import {LibraryLayoutComponent} from "../../layouts/library-layout/library-layout.component";
import {VideosLayoutComponent} from "../../layouts/videos-layout/videos-layout.component";
import {PictosLayoutComponent} from "../../layouts/pictos-layout/pictos-layout.component";
import {DocumentsLayoutComponent} from "../../layouts/documents-layout/documents-layout.component";
import {FileDetailsLayoutComponent} from "../../layouts/file-details-layout/file-details-layout.component";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{
  readonly homePage={ label: 'Accueil', icon: 'assets/House.svg', url: 'home' }
  readonly userManagement = { label: 'Utilisateurs', icon: 'assets/Users.svg' };
  readonly rolesManagement = { label: 'Roles', icon: 'assets/GearSix.svg' };
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
    return categories
      .filter(category => category.isActive)
      .map(category => ({
        content: { id: category.id,label: category.label, icon:this.getCategoryIconUrl(category.id as number), url: category.path },
        hasChildren: true,
        children: [
          { content: { id: category.id,label: 'Images', icon: 'assets/ImageSquare.svg', url: `${category.path}/images` } },
          { content: { id: category.id,label: 'Vidéos', icon: 'assets/Video.svg', url: `${category.path}/videos` } },
          { content: { id: category.id,label: 'Pictos', icon: 'assets/Person.svg', url: `${category.path}/pictos` } },
          { content: { id: category.id,label: 'Documents', icon: 'assets/FileDoc.svg', url: `${category.path}/documents` } },
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
