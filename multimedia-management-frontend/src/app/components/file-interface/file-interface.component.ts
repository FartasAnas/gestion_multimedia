import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {FileService} from "../../services/file/file.service";
import FileObject from "../../entities/FileObject";
import FileInterfaceInput from "../../entities/FileInterfaceInput";
import KeywordObject from "../../entities/KeywordObject";
import {PaginationBarComponent} from "../pagination-bar/pagination-bar.component";
import {UserStorageService} from "../../services/user-storage/user-storage.service";

@Component({
  selector: 'app-file-interface',
  templateUrl: './file-interface.component.html',
  styleUrls: ['./file-interface.component.css']
})
export class FileInterfaceComponent implements OnInit{
  @Input() fileInterfaceInput?:FileInterfaceInput
  constructor(private fileService: FileService,private userStorage: UserStorageService) {}
  fileObjects$: Observable<FileObject[]> = new Observable<FileObject[]>();
  displayedFileObjects:FileObject[]=[];
  filteredFileObjects:FileObject[]=[];
  checkedFiles:FileObject[]=[];
  sizeOptionIncrement:number=5
  checkAllFiles=false;

  @ViewChild(PaginationBarComponent) paginationBar?:PaginationBarComponent
  showConfirmation=false;
  hasWriteAccess=false;
  uploadingFile=false;
   async ngOnInit() {
    if(this.fileInterfaceInput) {
      this.fileInterfaceInput.fileCategory = window.location.pathname.split('/')[1]
      this.getUserFiles()
    }
    if (this.fileInterfaceInput?.fileType==='PICTOGRAM') {
      this.sizeOptionIncrement = 7;
    } else if (this.fileInterfaceInput?.fileType==='DOCUMENT') {
      this.sizeOptionIncrement = 4;
    }

    this.hasWriteAccess=await this.checkWriteAccess();
  }

  onFileUploaded(): void {
    this.getUserFiles()
    this.uploadingFile=false
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

  handleSearchEvent(event: {fileId: string, fileName: string, fileKeywords: KeywordObject[],fileStatus:any[],fileVersion:any[],fileExtension:any[],startDate:Date,endDate:Date}) {
    this.fileObjects$.subscribe((fileObjects) => {
      this.filteredFileObjects = fileObjects.filter(fileObject => {
        const idMatches = (fileObject.id as number).toString().startsWith(event.fileId);
        const nameMatches = (fileObject.fileName as string).toLowerCase().includes(event.fileName.toLowerCase());
        const keywordMatches = Object.values(event.fileKeywords).every(keyword => (fileObject.keywords as KeywordObject[]).some(fileKeyword => fileKeyword.id === keyword.id && fileKeyword.name === keyword.name));
        const statusMatches = Object.values(event.fileStatus).length === 0 || Object.values(event.fileStatus).some(status => status.name === fileObject.state);
        const versionMatches = Object.values(event.fileVersion).length === 0 || Object.values(event.fileVersion).some(version => version.id === fileObject.version);
        const extensionMatches= Object.values(event.fileExtension).length === 0 || Object.values(event.fileExtension).some(extension => extension.name.toLowerCase() === (fileObject.fileName as string).split(".")[1]);
        const dateMatches = (!event.startDate || !event.endDate || !fileObject.creationDate) ? true : (new Date(fileObject.creationDate as Date).getTime() >= event.startDate.getTime() && new Date(fileObject.creationDate as Date).getTime() <= event.endDate.getTime() + 86400000);

        return idMatches && nameMatches && keywordMatches && statusMatches && versionMatches && extensionMatches && dateMatches;
      });

      this.handlePageChange({currentPage:1,pageSize:this.paginationBar?.calculatePageSize() as number})
    });
  }


  handleCheckedFiles(event: { checkedFile: FileObject }) {
    if(event.checkedFile.isChecked){
      if(!this.checkedFiles.find(checkedFile => checkedFile.id === event.checkedFile.id)){
        this.checkedFiles.push(event.checkedFile)
      }
      console.log(this.checkedFiles)
    }
    else {
      this.checkedFiles = this.checkedFiles.filter(checkedFile => checkedFile.id !== event.checkedFile.id)
    }
  }

  handleActionClick(action: 'delete' | 'download') {
    if (action === 'delete') {
      this.showConfirmation = !this.showConfirmation;
    } else if (action === 'download') {
      this.checkedFiles.forEach((checkedFile, index) => {
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = this.fileService.getFileUrl(checkedFile.id as number);
          link.download = checkedFile.fileName as string;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, index * 350);
      });
      this.checkedFiles.forEach((checkedFile) => {
        checkedFile.isChecked = false;
      });
      this.checkAllFiles = false;
      this.checkedFiles = [];
    }
  }

  handleSelectAll() {
    this.checkAllFiles=!this.checkAllFiles
    if(!this.checkAllFiles){
      this.checkedFiles=[]
    }
  }

  handleConfirmation(confirmation: boolean) {
    if (confirmation) {
      this.checkedFiles.forEach(checkedFile => {
        this.fileService.removeFile(checkedFile.id as number).subscribe(
          () => {
            this.displayedFileObjects=this.displayedFileObjects.filter(fileObject => fileObject.id !== checkedFile.id)
            this.filteredFileObjects=this.filteredFileObjects.filter(fileObject => fileObject.id !== checkedFile.id)

          },
          error => console.error(`Error deleting file with ID ${checkedFile.id as number}: ${error}`)
        );
        this.showConfirmation = false;
      })
      this.checkedFiles = [];
    } else {
      this.showConfirmation = false;
    }
  }

  async checkWriteAccess(): Promise<boolean> {
    const categoryPath = window.location.pathname.split('/')[1];
    const action = window.location.pathname.split('/')[2];
    return await this.userStorage.isWriteAllowed(categoryPath, action);
  }


}
