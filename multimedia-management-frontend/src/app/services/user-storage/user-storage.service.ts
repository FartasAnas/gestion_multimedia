import {Injectable} from '@angular/core';
import StorageObject from "../../entities/StorageObject";
import Role from "../../entities/Role";
import {RoleService} from "../role/role.service";
import {Observable} from "rxjs";

const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor(private roleService:RoleService) { }

  public saveUser(user:StorageObject):void{
    window.sessionStorage.removeItem(USER_KEY)
    window.sessionStorage.setItem(USER_KEY,JSON.stringify(user))
  }
  public getUser(): any {
    const user = sessionStorage.getItem(USER_KEY);
    if (!user) {
      return null;
    }
    return {
      ...JSON.parse(user),
    };
  }
  public signOut(): void {
    window.sessionStorage.clear();
  }
  public getUsername():String{
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user).username;
    }
    return ""
  }
  public getRole():Observable<Role>{
    const user = sessionStorage.getItem(USER_KEY);
    return  this.roleService.getRoleByName(JSON.parse(user as string).roles[0].authority)
  }
  public getFullName():string{
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user).fullName;
    }
    return ""
  }
  public getUserEmail():string{
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user).email;
    }
    return ""
  }
  public getUserInfo():any{
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      return {
        "fullName":JSON.parse(user).fullName,
        "email":JSON.parse(user).email,
        "role":JSON.parse(user).role
      }
    }
    return ""
  }
}
