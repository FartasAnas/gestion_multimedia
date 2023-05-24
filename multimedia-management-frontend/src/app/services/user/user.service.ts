import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import UserObject from "../../entities/UserObject";
import AddUserObject from "../../entities/AddUserObject";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private hostname=window.location.hostname
  private apiUrl = "http://"+this.hostname+":8100/users";
  constructor(private http:HttpClient) { }
  getUserByEmail(email:string):Observable<UserObject>{
    return this.http.get<UserObject>(`${this.apiUrl}/email/${email}`)
  }
  getUsers():Observable<UserObject[]>{
    return this.http.get<UserObject[]>(this.apiUrl)
  }

  saveUser(userObject: AddUserObject):Observable<AddUserObject>{
    return this.http.post<AddUserObject>(`${this.apiUrl}/add`,userObject);
  }

  getUserById(id: number):Observable<UserObject> {
    return this.http.get<UserObject>(`${this.apiUrl}/${id}`)
  }

  deleteUser(id: number):Observable<UserObject> {
    return this.http.delete<UserObject>(`${this.apiUrl}/delete/${id}`)
  }

  updateUser(userObject: UserObject):Observable<UserObject> {
    return this.http.put<UserObject>(`${this.apiUrl}/update/${userObject.id}`,userObject);
  }
}
