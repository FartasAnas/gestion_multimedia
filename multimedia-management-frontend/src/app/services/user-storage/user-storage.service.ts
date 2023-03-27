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
    return sessionStorage.getItem(USER_KEY)
  }
  public signOut(): void {
    window.sessionStorage.clear();
  }
}
