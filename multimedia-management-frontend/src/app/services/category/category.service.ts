import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import Category from "../../entities/Category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private hostname=window.location.hostname
  private apiUrl = "http://"+this.hostname+":8100/categories";
  constructor(private http:HttpClient) { }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl)
  }
}
