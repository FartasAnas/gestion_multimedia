import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FileService} from "../../services/file/file.service";
import {Router} from "@angular/router";
import FileObject from "../../entities/FileObject";
import {EditFileComponent} from "../edit-file/edit-file.component";
import {UserStorageService} from "../../services/user-storage/user-storage.service";

@Component({
  selector: 'app-file-details-bar',
  templateUrl: './file-details-bar.component.html',
  styleUrls: ['./file-details-bar.component.css']
})
export class FileDetailsBarComponent implements OnInit{
  @Input() fileObject?: FileObject;
  @ViewChild(EditFileComponent) editFileComponent!: EditFileComponent;
  showEditInterface = false;
  showConfirmation = false;
  hasWriteAccess=false;
  async ngOnInit(){
    this.hasWriteAccess=await this.checkWriteAccess();
  }
  constructor(private router: Router,private fileService:FileService,private userStorage: UserStorageService) {
  }
  handelCloseDetailsClick() {
    const type = this.fileObject?.type;
    const category = this.fileObject?.category;
    switch (type) {
      case 'IMAGE':
        this.router.navigate([category?.path, 'images']);
        break;
      case 'VIDEO':
        this.router.navigate([category?.path, 'videos']);
        break;
      case 'DOCUMENT':
        this.router.navigate([category?.path, 'documents']);
        break;
      case 'PICTOGRAM':
        this.router.navigate([category?.path, 'pictos']);
        break;
      default:
        this.router.navigate(['home']);
    }
  }

  fileVersionTranslate(): String {
    switch (this.fileObject?.version) {
      case 'VF':
        return 'Française';
      case 'VA':
        return 'Arabe';
      default:
        return '';
    }
  }

  handleEditFile() {
    this.editFileComponent.toggleVisibility(true);
  }

  handleFileObjectChange(newFileObject: FileObject) {
    this.fileObject = { ...newFileObject };
  }

  detailInfoTitle(): string {
    if (this.fileObject?.type === 'DOCUMENT' || this.fileObject?.type === 'PICTOGRAM')
      return this.fileObject.fileName?.split('.')[0] as string;
    return 'ID ' + this.fileObject?.id;
  }

  handleConfirmation(confirmed: boolean) {
    if (confirmed) {
      if(this.fileObject?.id) {
        this.fileService.removeFile(this.fileObject?.id).subscribe(
          () => {
            console.log(`File with ID ${this.fileObject?.id} deleted successfully`);
            this.handelCloseDetailsClick()
          },
          error => console.error(`Error deleting file with ID ${this.fileObject?.id}: ${error}`)
        );
      }
    }
    this.showConfirmation = false;
  }
  async checkWriteAccess(): Promise<boolean> {
    const categoryPath = window.location.pathname.split('/')[1];
    const action = this.fileObject?.type?.toLowerCase();

    console.log(categoryPath, action)
    return await this.userStorage.isWriteAllowed(categoryPath, action as string);
  }

}
