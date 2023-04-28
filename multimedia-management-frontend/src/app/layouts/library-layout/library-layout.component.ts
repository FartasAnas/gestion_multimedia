import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router, Routes} from "@angular/router";
import {ImagesLayoutComponent} from "../images-layout/images-layout.component";
import {VideosLayoutComponent} from "../videos-layout/videos-layout.component";
import {DocumentsLayoutComponent} from "../documents-layout/documents-layout.component";
import {PictosLayoutComponent} from "../pictos-layout/pictos-layout.component";
import {FileDetailsLayoutComponent} from "../file-details-layout/file-details-layout.component";

@Component({
  selector: 'app-library-layout',
  templateUrl: './library-layout.component.html',
  styleUrls: ['./library-layout.component.css']
})
export class LibraryLayoutComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const categories = data['categories'];
      if (Array.isArray(categories)) {
        const routes: Routes = [];
        console.log(categories)
        for (const category of categories) {
          const categoryRoute: Route = {
            path: category.path,
            component: LibraryLayoutComponent,
            children: [
              { path: 'images', component: ImagesLayoutComponent },
              { path: 'videos', component: VideosLayoutComponent },
              { path: 'documents', component: DocumentsLayoutComponent },
              { path: 'pictos', component: PictosLayoutComponent },
              { path: 'file/:id', component: FileDetailsLayoutComponent },
            ],
          };
          routes.push(categoryRoute);
        }
        routes.push({ path: '**', redirectTo: '' });
        this.router.resetConfig(routes);
      }
    });
  }
}
