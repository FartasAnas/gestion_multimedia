import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import UserObject from "../../entities/UserObject";

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
}
