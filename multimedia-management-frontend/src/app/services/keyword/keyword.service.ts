import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import KeywordObject from "../../entities/KeywordObject";

@Injectable({
  providedIn: 'root'
})
export class KeywordService {
  private hostname=window.location.hostname
  private apiUrl = "http://"+this.hostname+":8100/keywords";
  constructor(private http:HttpClient) { }

  getKeywords():Observable<KeywordObject[]>{
    return this.http.get<KeywordObject[]>(this.apiUrl)
  }
}
