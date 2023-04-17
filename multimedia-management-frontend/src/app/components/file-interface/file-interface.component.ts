import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {FileService} from "../../services/file/file.service";
import FileObject from "../../entities/FileObject";
import FileInterfaceInput from "../../entities/FileInterfaceInput";

@Component({
  selector: 'app-file-interface',
  templateUrl: './file-interface.component.html',
  styleUrls: ['./file-interface.component.css']
})
export class FileInterfaceComponent implements OnInit{
  @Input() fileInterfaceInput?:FileInterfaceInput
  constructor(private fileService: FileService) {}
  fileObjects$: Observable<FileObject[]> = new Observable<FileObject[]>();

  ngOnInit(): void {
    if(this.fileInterfaceInput) {
      this.fileInterfaceInput.fileCategory = window.location.pathname.split('/')[1].toUpperCase()
      this.getUserFiles()
    }
  }

  onFileUploaded(): void {
    this.getUserFiles()
  }
  getUserFiles(){
    this.fileObjects$ = this.fileService.getUserFiles(this.fileInterfaceInput?.fileType as string,this.fileInterfaceInput?.fileCategory as string);
  }
}
