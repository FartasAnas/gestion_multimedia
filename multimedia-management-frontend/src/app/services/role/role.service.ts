import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import Role from "../../entities/Role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private hostname=window.location.hostname
  private apiUrl = "http://"+this.hostname+":8100/roles";
  constructor(private http:HttpClient) { }
  getRoles():Observable<Role[]>{
    return this.http.get<Role[]>(this.apiUrl);
  }
  saveRole(role:Role):Observable<Role>{
    return this.http.post<Role>(`${this.apiUrl}/add`,role);
  }
}
