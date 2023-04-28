import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginLayoutComponent} from "./layouts/login-layout/login-layout.component";
import {HomePageComponent} from "./layouts/home-page/home-page.component";
import {ImagesLayoutComponent} from "./layouts/images-layout/images-layout.component";
import {FileDetailsLayoutComponent} from "./layouts/file-details-layout/file-details-layout.component";
import {VideosLayoutComponent} from "./layouts/videos-layout/videos-layout.component";
import {DocumentsLayoutComponent} from "./layouts/documents-layout/documents-layout.component";
import {PictosLayoutComponent} from "./layouts/pictos-layout/pictos-layout.component";
import {ProfileLayoutComponent} from "./layouts/profile-layout/profile-layout.component";
import {LibraryLayoutComponent} from "./layouts/library-layout/library-layout.component";
import {CategoryResolverService} from "./resolvers/category-resolver/category-resolver.service";
import {
  CategoriesManagementLayoutComponent
} from "./layouts/categories-management-layout/categories-management-layout.component";

const routes: Routes = [
  { path: '', component: LoginLayoutComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'profile', component: ProfileLayoutComponent },
  { path:'categories',component:CategoriesManagementLayoutComponent},
  {
    path: ':categoryPath',
    component: LibraryLayoutComponent,
    resolve: {
      categories: CategoryResolverService,
    },
    children: [
      { path: 'images', component: ImagesLayoutComponent},
      { path: 'videos', component: VideosLayoutComponent },
      { path: 'documents', component: DocumentsLayoutComponent },
      { path: 'pictos', component: PictosLayoutComponent },
      { path: 'file/:id', component: FileDetailsLayoutComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
