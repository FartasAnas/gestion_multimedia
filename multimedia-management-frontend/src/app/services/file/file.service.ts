import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import FileObject from "../../entities/FileObject";
import {UserStorageService} from "../user-storage/user-storage.service";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private hostname=window.location.hostname
  private apiUrl = "http://"+this.hostname+":8100/files";
  private currentUser=this.userStorageService.getUser().username;
  constructor(private http:HttpClient,private userStorageService:UserStorageService) { }

  saveFile(file: File, fileObject: FileObject): Observable<FileObject> {
    console.log(window.location.pathname.split('/')[1])
    fileObject.fileName = file.name;
    fileObject.createdBy=this.currentUser;
    fileObject.category = window.location.pathname.split('/')[1].toUpperCase();
    const headers = new HttpHeaders();
    const formData: FormData = new FormData();
    formData.append('file', file);
    const jsonBlob = new Blob([JSON.stringify(fileObject)], { type: 'application/json' });
    formData.append('fileObject', jsonBlob);
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<FileObject>(`${this.apiUrl}/add`, formData, { headers: headers });
  }
  getUserFiles(type:String):Observable<FileObject[]>{
    return this.http.get<FileObject[]>(`${this.apiUrl}/user/${this.currentUser}/${type}`)
  }
  getFileSize(bytes: number) {
    if (bytes == 0) {
      return "0 KB";
    }
    const k = 1024; // 1 KB = 1024 bytes
    const sizes = ["Kb", "Mb"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = parseFloat((bytes / Math.pow(k, i)).toFixed(1));
    return `${size} ${sizes[i-1]}`;
  }
  countFileByType(type:String){
    return this.http.get<String>(`${this.apiUrl}/count/${this.currentUser}/${type}`)
  }

}
