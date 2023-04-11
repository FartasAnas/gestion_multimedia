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
    this.fileObjects$ = this.fileService.getUserFiles(this.fileInterfaceInput?.fileType as string);
  }

  onFileUploaded(): void {
    this.fileObjects$ = this.fileService.getUserFiles(this.fileInterfaceInput?.fileType as string);
  }
}
