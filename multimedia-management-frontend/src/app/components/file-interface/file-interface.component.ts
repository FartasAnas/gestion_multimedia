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
  filteredFileObjects:FileObject[]=[]
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
    this.fileObjects$.subscribe((fileObjects) => {
      this.filteredFileObjects=fileObjects;
      this.displayedFileObjects=fileObjects;
    });
  }

  handlePageChange(event: { currentPage: number; pageSize: number }): void {
    // this.fileObjects$.subscribe((fileObjects) => {
    //   let start = (event.currentPage - 1) * event.pageSize;
    //   let end = start + Number(event.pageSize);
    //   this.displayedFileObjects=fileObjects.slice(start, end);
    // });
    let start = (event.currentPage - 1) * event.pageSize;
    let end = start + Number(event.pageSize);
    this.displayedFileObjects=this.filteredFileObjects.slice(start, end);

  }

  handleSearchEvent(event: {fileId: string}) {
    this.fileObjects$.subscribe((fileObjects) => {
      this.filteredFileObjects=fileObjects.filter(fileObject => (fileObject.id as number).toString().startsWith(event.fileId));
      const pageSize = this.filteredFileObjects.length > this.sizeOptionIncrement ? this.sizeOptionIncrement*2 : this.filteredFileObjects.length > 0 ? this.sizeOptionIncrement : 0;
      this.handlePageChange({currentPage:1,pageSize:pageSize})
    });
  }
}
