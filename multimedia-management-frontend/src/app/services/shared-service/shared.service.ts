import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private categoryIdSource = new BehaviorSubject<number | undefined>(undefined);
  private hostname=window.location.hostname
  private apiUrl = "http://"+this.hostname+":8100";
  categoryId$ = this.categoryIdSource.asObservable();

  constructor(private http:HttpClient) { }

  setCategoryId(categoryId: number | undefined): void {
    this.categoryIdSource.next(categoryId);
  }

  deleteItem(dataType:string,id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${dataType}/delete/${id}`);
  }

  toTitleCase(str: string): string {
    return str.toLowerCase().split(' ').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }
}
