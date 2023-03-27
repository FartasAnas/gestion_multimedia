import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginLayoutComponent} from "./layouts/login-layout/login-layout.component";
import {HomePageComponent} from "./layouts/home-page/home-page.component";
import {ImagesLayoutComponent} from "./layouts/images-layout/images-layout.component";

const routes: Routes = [
  {path:'',component:LoginLayoutComponent},
  {path:"images",component:ImagesLayoutComponent},
  {
    path:'home',
    component:HomePageComponent,
    children:[
      {path:"web/images",component:ImagesLayoutComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
