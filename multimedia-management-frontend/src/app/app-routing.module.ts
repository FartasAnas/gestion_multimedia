import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginLayoutComponent} from "./layouts/login-layout/login-layout.component";
import {HomePageComponent} from "./layouts/home-page/home-page.component";
import {ImagesLayoutComponent} from "./layouts/images-layout/images-layout.component";
import {WebLayoutComponent} from "./layouts/web-layout/web-layout.component";
import {FileDetailsLayoutComponent} from "./layouts/file-details-layout/file-details-layout.component";
import {VideosLayoutComponent} from "./layouts/videos-layout/videos-layout.component";
import {DocumentsLayoutComponent} from "./layouts/documents-layout/documents-layout.component";

const routes: Routes = [
  {path:'',component:LoginLayoutComponent},
  {path:'home',component:HomePageComponent},
  {
    path:'web',
    component:WebLayoutComponent,
    children:[
      {path:'images',component:ImagesLayoutComponent},
      {path:'videos',component:VideosLayoutComponent},
      {path:'documents',component:DocumentsLayoutComponent},
      {path:'file/:id',component:FileDetailsLayoutComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
