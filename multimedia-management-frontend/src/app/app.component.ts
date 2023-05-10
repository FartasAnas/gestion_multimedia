import {Component, OnInit} from '@angular/core';
import Category from "./entities/Category";
import {CategoryService} from "./services/category/category.service";
import {Route, Router} from "@angular/router";
import {LibraryLayoutComponent} from "./layouts/library-layout/library-layout.component";
import {ImagesLayoutComponent} from "./layouts/images-layout/images-layout.component";
import {VideosLayoutComponent} from "./layouts/videos-layout/videos-layout.component";
import {DocumentsLayoutComponent} from "./layouts/documents-layout/documents-layout.component";
import {PictosLayoutComponent} from "./layouts/pictos-layout/pictos-layout.component";
import {FileDetailsLayoutComponent} from "./layouts/file-details-layout/file-details-layout.component";
import {RoleGuard} from "./guards/role-guard/role.guard";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'multimedia-management-frontend';
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.generateRoutes();
    });
  }

  generateRoutes() {
    const routes :Route[]= [];
    this.categories.filter(category => category.isActive).forEach(category => {
      const children: Route[] = [
        { path: 'images', component: ImagesLayoutComponent , canActivate: [RoleGuard]},
        { path: 'videos', component: VideosLayoutComponent , canActivate: [RoleGuard]},
        { path: 'pictos', component: PictosLayoutComponent , canActivate: [RoleGuard]},
        { path: 'documents', component: DocumentsLayoutComponent , canActivate: [RoleGuard]},
        { path: 'file/:id', component: FileDetailsLayoutComponent , canActivate: [RoleGuard]}
      ];

      const categoryRoute: Route = {
        path: category.path,
        component: LibraryLayoutComponent,
        children: children
      };

      routes.push(categoryRoute);
    });
    this.router.config.unshift(...routes)
  }
}
