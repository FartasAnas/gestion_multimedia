import {Component, OnInit} from '@angular/core';
import {FileService} from "../../services/file/file.service";
import {Observable} from "rxjs";
import FileObject from "../../entities/FileObject";

@Component({
  selector: 'app-videos-layout',
  templateUrl: './videos-layout.component.html',
  styleUrls: ['./videos-layout.component.css']
})
export class VideosLayoutComponent implements OnInit{
  constructor(private fileService:FileService) {
  }
  fileObjects$: Observable<FileObject[]>= new Observable<FileObject[]>();
  ngOnInit(): void {
    this.fileObjects$=this.fileService.getUserFiles("VIDEO")
  }
  onFileUploaded(): void {
    this.fileObjects$ = this.fileService.getUserFiles("VIDEO");
  }

}
