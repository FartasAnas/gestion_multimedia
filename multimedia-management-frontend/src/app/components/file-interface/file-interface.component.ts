import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable, take} from "rxjs";
import {FileService} from "../../services/file/file.service";
import FileObject from "../../entities/FileObject";
import FileInterfaceInput from "../../entities/FileInterfaceInput";
import KeywordObject from "../../entities/KeywordObject";
import {PaginationBarComponent} from "../pagination-bar/pagination-bar.component";

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
  @ViewChild(PaginationBarComponent) paginationBar?:PaginationBarComponent
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
    let start = (event.currentPage - 1) * event.pageSize;
    let end = start + Number(event.pageSize);
    this.displayedFileObjects=this.filteredFileObjects.slice(start, end);

  }

  handleSearchEvent(event: {fileId: string, fileName: string, fileKeywords: KeywordObject[],fileStatus:any[],fileVersion:any[],fileExtension:any[]}) {
    console.log(event.fileStatus)
    this.fileObjects$.subscribe((fileObjects) => {
      this.filteredFileObjects = fileObjects.filter(fileObject => {
        const idMatches = (fileObject.id as number).toString().startsWith(event.fileId);
        const nameMatches = (fileObject.fileName as string).toLowerCase().includes(event.fileName.toLowerCase());
        const keywordMatches = Object.values(event.fileKeywords).every(keyword => (fileObject.keywords as KeywordObject[]).some(fileKeyword => fileKeyword.id === keyword.id && fileKeyword.name === keyword.name));
        const statusMatches = Object.values(event.fileStatus).length === 0 || Object.values(event.fileStatus).some(status => status.name === fileObject.state);
        const versionMatches = Object.values(event.fileVersion).length === 0 || Object.values(event.fileVersion).some(version => version.id === fileObject.version);
        const extensionMatches= Object.values(event.fileExtension).length === 0 || Object.values(event.fileExtension).some(extension => extension.name.toLowerCase() === (fileObject.fileName as string).split(".")[1]);
        return idMatches && nameMatches && keywordMatches && statusMatches && versionMatches && extensionMatches;
      });

      this.handlePageChange({currentPage:1,pageSize:this.paginationBar?.calculatePageSize() as number})
    });
  }







}
