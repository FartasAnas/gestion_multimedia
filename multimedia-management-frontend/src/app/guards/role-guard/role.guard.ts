import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserStorageService} from "../../services/user-storage/user-storage.service";
import Role from "../../entities/Role";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private userStorageService: UserStorageService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const path= next.routeConfig;

    return new Observable<boolean>((observer) => {
      this.userStorageService.getRole().subscribe((role: Role) => {
        if (role && role.isActive) {
          switch (path?.path) {
            case 'images':
              if (!role.action.image) {
                this.router.navigate(['']);
                observer.next(false);
              } else {
                observer.next(true);
              }
              break;
            case 'videos':
              if (!role.action.video) {
                this.router.navigate(['']);
                observer.next(false);
              } else {
                observer.next(true);
              }
              break;
            case 'pictos':
              if (!role.action.pictogram) {
                this.router.navigate(['']);
                observer.next(false);
              } else {
                observer.next(true);
              }
              break;
            case 'documents':
              if (!role.action.document) {
                this.router.navigate(['']);
                observer.next(false);
              } else {
                observer.next(true);
              }
              break;
            default:
              observer.next(true);
          }
        } else {
          this.userStorageService.signOut()
          this.router.navigate(['']);
          observer.next(false);
        }
      }, error => {
        this.router.navigate(['']);
        observer.next(false);
      });
    });
  }
}
