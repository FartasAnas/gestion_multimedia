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
        { path: 'images', component: ImagesLayoutComponent },
        { path: 'videos', component: VideosLayoutComponent },
        { path: 'pictos', component: PictosLayoutComponent },
        { path: 'documents', component: DocumentsLayoutComponent },
        { path: 'file/:id', component: FileDetailsLayoutComponent }
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
