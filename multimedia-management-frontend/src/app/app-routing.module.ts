import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginLayoutComponent} from "./layouts/login-layout/login-layout.component";
import {HomePageComponent} from "./layouts/home-page/home-page.component";
import {ProfileLayoutComponent} from "./layouts/profile-layout/profile-layout.component";
import {
  CategoriesManagementLayoutComponent
} from "./layouts/categories-management-layout/categories-management-layout.component";
import {UpdateCategoryLayoutComponent} from "./layouts/update-category-layout/update-category-layout.component";
import {RolesManagementLayoutComponent} from "./layouts/roles-management-layout/roles-management-layout.component";
import {UpdateRoleLayoutComponent} from "./layouts/update-role-layout/update-role-layout.component";
import {CreateRoleLayoutComponent} from "./layouts/create-role-layout/create-role-layout.component";
import {UserManagementLayoutComponent} from "./layouts/user-management-layout/user-management-layout.component";
import {RoleGuard} from "./guards/role-guard/role.guard";
import {UpdateUserLayoutComponent} from "./layouts/update-user-layout/update-user-layout.component";
import {UpdatePasswordLayoutComponent} from "./layouts/update-password-layout/update-password-layout.component";
import {LoginGuard} from "./guards/login-guard/login.guard";

const routes: Routes = [
  { path: '', component: LoginLayoutComponent},
  { path: 'home', component: HomePageComponent ,canActivate: [LoginGuard]},
  { path: 'profile', component: ProfileLayoutComponent ,canActivate: [LoginGuard]},
  { path: 'categories', component: CategoriesManagementLayoutComponent ,canActivate: [LoginGuard]},
  { path: 'categories/update/:id', component: UpdateCategoryLayoutComponent ,canActivate: [LoginGuard]},
  { path: 'roles', component: RolesManagementLayoutComponent ,canActivate: [LoginGuard]},
  { path: 'roles/update/:id', component: UpdateRoleLayoutComponent ,canActivate: [LoginGuard]},
  { path: 'roles/create', component: CreateRoleLayoutComponent ,canActivate: [LoginGuard]},
  { path: 'users', component: UserManagementLayoutComponent ,canActivate: [LoginGuard]},
  { path: 'users/update/:id', component: UpdateUserLayoutComponent ,canActivate: [LoginGuard]},
  { path: 'update-password',component:UpdatePasswordLayoutComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
