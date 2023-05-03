import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginLayoutComponent} from "./layouts/login-layout/login-layout.component";
import {HomePageComponent} from "./layouts/home-page/home-page.component";
import {ProfileLayoutComponent} from "./layouts/profile-layout/profile-layout.component";
import {
  CategoriesManagementLayoutComponent
} from "./layouts/categories-management-layout/categories-management-layout.component";
import {UpdateCategoryLayoutComponent} from "./layouts/update-category-layout/update-category-layout.component";

const routes: Routes = [
  { path: '', component: LoginLayoutComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'profile', component: ProfileLayoutComponent },
  { path: 'categories', component: CategoriesManagementLayoutComponent },
  { path: 'categories/update/:id', component: UpdateCategoryLayoutComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
