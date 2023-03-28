import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private hostname=window.location.hostname
  private apiUrl = "http://"+this.hostname+":8100/files";
  constructor(private http:HttpClient) { }

  saveFile(file: File, fileData: FormData): Observable<File> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<File>(`${this.apiUrl}/add`, fileData, { headers: headers });
  }

}
