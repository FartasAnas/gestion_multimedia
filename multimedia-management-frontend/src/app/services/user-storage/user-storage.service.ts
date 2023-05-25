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

  private roles$:Observable<Role>=new Observable<Role>();

  public saveUser(user:StorageObject):void {
    window.sessionStorage.removeItem(USER_KEY)
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user))
    if(!user.forgotPassword){
      this.stockRoles();
    }

  }
  private stockRoles():void {
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      this.roles$ = this.roleService.getRoleByName(JSON.parse(user as string).roles[0].authority)
    }
  }
  public getUser(): any {
    const user = sessionStorage.getItem(USER_KEY);
    if (!user) {
      return undefined;
    }
    return {
      ...JSON.parse(user),
    };
  }
  public signOut(): void {
    window.sessionStorage.clear();
  }
  public getUsername():String{
    return this.getUser().username;
  }
  public getRole():Observable<Role>{
    const user = sessionStorage.getItem(USER_KEY);
    return this.roleService.getRoleByName(JSON.parse(user as string).roles[0].authority)
  }
  public getFullName():string{
    return this.getUser().fullName;
  }
  public getUserEmail():string{
    return this.getUser().email;
  }
  public isUserActive():boolean{
    return this.getUser().isActive;
  }
  public getUserInfo():any{
    if(this.getUser()!== undefined){
      return {
        "fullName":this.getUser().fullName,
        "email":this.getUser().email,
        "role":this.getUser().role
      }
    }
    return ""
  }
  public async isWriteAllowed(categoryPath: string, action: string): Promise<boolean> {
    const role = await this.getRole().toPromise();
    const actionObj = (role as Role).actions.find(actionObj => actionObj.category.path.toLowerCase() === categoryPath.toLowerCase());
    if (actionObj) {
      if (action === 'images' || action === 'image') {
        return actionObj.image.write;
      } else if (action === 'videos' || action === 'video') {
        return actionObj.video.write;
      } else if (action === 'pictos' || action ==='pictogram') {
        return actionObj.pictogram.write;
      } else if (action === 'documents' || action ==='document') {
        return actionObj.document.write;
      }
    }
    return false;
  }
}
