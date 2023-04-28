import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import Role from "../../entities/Role";
import {HttpClient} from "@angular/common/http";
import LoginObject from "../../entities/LoginObject";
import StorageObject from "../../entities/StorageObject";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private hostname=window.location.hostname
  private apiUrl = "http://"+this.hostname+":8100";
  constructor(private http:HttpClient) {

  }
  loadRoles():Observable<Role[]>{
    return  this.http.get<Role[]>(`${this.apiUrl}/roles`)
  }
  login(loginObject:LoginObject):Observable<StorageObject>{
    return this.http.post<StorageObject>(`${this.apiUrl}/login`,loginObject)
  }
}
