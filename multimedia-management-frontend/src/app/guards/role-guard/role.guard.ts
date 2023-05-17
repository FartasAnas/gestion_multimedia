import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
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
    const parentPath=next.parent?.url[0].path
    return new Observable<boolean>((observer) => {
      this.userStorageService.getRole().subscribe((role: Role) => {
        if (role && role.isActive) {
          role.actions.filter(action=>{
              return  action.category.path.toLowerCase()===parentPath?.toLowerCase()
            }
          ).map(action=>{
            switch (path?.path) {
              case 'images':
                if (!action.image.isActive) {
                  this.router.navigate(['']);
                  observer.next(false);
                } else {
                  observer.next(true);
                }
                break;
              case 'videos':
                if (!action.video.isActive) {
                  this.router.navigate(['']);
                  observer.next(false);
                } else {
                  observer.next(true);
                }
                break;
              case 'pictos':
                if (!action.pictogram.isActive) {
                  this.router.navigate(['']);
                  observer.next(false);
                } else {
                  observer.next(true);
                }
                break;
              case 'documents':
                if (!action.document.isActive) {
                  this.router.navigate(['']);
                  observer.next(false);
                } else {
                  observer.next(true);
                }
                break;
              default:
                observer.next(true);
            }
          })
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
