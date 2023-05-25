import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserStorageService} from "../../services/user-storage/user-storage.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private userStorageService: UserStorageService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user=this.userStorageService.getUser()
    if(!user || !user.isActive){
      this.userStorageService.signOut()
      this.router.navigate([''])
      return false
    }else if(user.forgotPassword){
      this.router.navigate(['update-password'])
    }
    return true;
  }

}
