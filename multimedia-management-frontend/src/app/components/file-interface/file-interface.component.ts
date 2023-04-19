import {Component, Input, OnInit} from '@angular/core';
import {Observable, take} from "rxjs";
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
  displayedFileObjects:FileObject[]=[];
  sizeOptionIncrement:number=5
  ngOnInit(): void {
    if(this.fileInterfaceInput) {
      this.fileInterfaceInput.fileCategory = window.location.pathname.split('/')[1].toUpperCase()
      this.getUserFiles()
    }
    if (this.fileInterfaceInput?.fileType==='PICTOGRAM') {
      this.sizeOptionIncrement = 7;
    } else if (this.fileInterfaceInput?.fileType==='DOCUMENT') {
      this.sizeOptionIncrement = 4;
    }
  }

  onFileUploaded(): void {
    this.getUserFiles()
  }
  getUserFiles(){
    this.fileObjects$ = this.fileService.getUserFiles(this.fileInterfaceInput?.fileType as string,this.fileInterfaceInput?.fileCategory as string);
  }

  handlePageChange(event: { currentPage: number; pageSize: number }): void {
    this.fileObjects$.subscribe((fileObjects) => {
      let start = (event.currentPage - 1) * event.pageSize;
      let end = start + Number(event.pageSize);
      this.displayedFileObjects=fileObjects.slice(start, end);
    });
  }
}
