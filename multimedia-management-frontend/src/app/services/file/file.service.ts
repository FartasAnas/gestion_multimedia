import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import FileObject from "../../entities/FileObject";
import {UserStorageService} from "../user-storage/user-storage.service";
import NextPreviousFilesObject from "../../entities/NextPreviousFilesObject";
import Category from "../../entities/Category";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private hostname=window.location.hostname
  private apiUrl = "http://"+this.hostname+":8100/files";
  private currentUser=this.userStorageService.getUser().username;
  constructor(private http:HttpClient,private userStorageService:UserStorageService) { }

  saveFile(file: File, fileObject: FileObject): Observable<FileObject> {
    if(fileObject.fileName!=='')
      fileObject.fileName = fileObject.fileName+'.'+file.name.split('.')[1];
    else
      fileObject.fileName=file.name
    fileObject.createdBy=this.currentUser;
    fileObject.category={ name: window.location.pathname.split('/')[1] } as Category;
    const headers = new HttpHeaders();
    const formData: FormData = new FormData();
    formData.append('file', file);
    const jsonBlob = new Blob([JSON.stringify(fileObject)], { type: 'application/json' });
    formData.append('fileObject', jsonBlob);
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<FileObject>(`${this.apiUrl}/add`, formData, { headers: headers });
  }
  getUserFiles(type:string,category:string):Observable<FileObject[]>{
    return this.http.get<FileObject[]>(`${this.apiUrl}/user/${this.currentUser}/${category}/${type}`)
  }
  getFileById(id:number):Observable<FileObject>{
    return this.http.get<FileObject>(`${this.apiUrl}/${id}`)
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
  getNextPreviousFiles(id:number):Observable<NextPreviousFilesObject>{
    return this.http.get<NextPreviousFilesObject>(`${this.apiUrl}/next-previous/${id}`)
  }
  countFileByType(type:String){
    return this.http.get<String>(`${this.apiUrl}/count/${this.currentUser}/${type}`)
  }
  removeFile(id:number){
    return this.http.delete(`${this.apiUrl}/delete/${id}`)
  }
  updateFile(id:number,fileObject:FileObject){
    return this.http.put(`${this.apiUrl}/update/${id}`,fileObject)
  }
  convertFileToBase64(fileUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(fileUrl, { responseType: 'blob' }).subscribe(
        blob => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const fileBase64 = reader.result?.toString() as string;
            resolve(fileBase64);
          };
          reader.onerror = () => {
            reject(reader.error);
          };
        },
        error => {
          reject(error);
        }
      );
    });
  }




}
