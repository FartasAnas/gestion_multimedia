import {Component, Input, NgModule, OnInit} from '@angular/core';
import {FileService} from "../../services/file/file.service";
import FileObject from "../../entities/FileObject";
import {Observable} from "rxjs";

@Component({
  selector: 'app-images-layout',
  templateUrl: './images-layout.component.html',
  styleUrls: ['./images-layout.component.css']
})
export class ImagesLayoutComponent implements OnInit{
  constructor(private fileService:FileService) {
  }
  fileObjects$: Observable<FileObject[]>= new Observable<FileObject[]>();
  ngOnInit(): void {
    this.fileObjects$=this.fileService.getUserFiles("IMAGE")
  }
  onFileUploaded(): void {
    this.fileObjects$ = this.fileService.getUserFiles("IMAGE");
  }

}
