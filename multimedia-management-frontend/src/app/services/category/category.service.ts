import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
  getIconUrl(id:number):string {
      return "http://"+this.hostname+":8100/categories/icon/"+id;
  }
  saveCategory(file : File | undefined,category:Category):Observable<Category>{
    console.log(file)
    const headers = new HttpHeaders();
    const formData: FormData = new FormData();
    headers.append('Content-Type', 'multipart/form-data');
    if(file)
      formData.append('icon', file);
    const jsonBlob = new Blob([JSON.stringify(category)], { type: 'application/json' });
    formData.append('category', jsonBlob);
    return this.http.post<Category>(`${this.apiUrl}/add`,formData,{headers:headers})
  }
  getCategoryById(id:number):Observable<Category>{
    return this.http.get<Category>(`${this.apiUrl}/${id}`)
  }

  updateCategory(id: number | undefined, category: Category) {
    return this.http.put(`${this.apiUrl}/update/${id}`, category);
  }
  deleteCategory(id: number | undefined) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

}
