import { Injectable } from '@angular/core';
import StorageObject from "../../entities/StorageObject";

const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

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
  public getFullName():string{
    const user = sessionStorage.getItem(USER_KEY);
    console.log(user)
    if (user) {
      return JSON.parse(user).fullName;
    }
    return ""
  }
}
