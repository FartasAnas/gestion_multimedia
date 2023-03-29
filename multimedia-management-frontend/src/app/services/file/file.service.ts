import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import FileObject from "../../entities/FileObject";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private hostname=window.location.hostname
  private apiUrl = "http://"+this.hostname+":8100/files";
  constructor(private http:HttpClient) { }

  saveFile(file: File, fileObject: FileObject): Observable<FileObject> {
    fileObject.fileName = file.name;
    const headers = new HttpHeaders();
    const formData: FormData = new FormData();
    formData.append('file', file);
    const jsonBlob = new Blob([JSON.stringify(fileObject)], { type: 'application/json' });
    formData.append('fileObject', jsonBlob);
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<FileObject>(`${this.apiUrl}/add`, formData, { headers: headers });
  }

}
