import {Component, Input, ViewChild} from '@angular/core';
import {FileService} from "../../services/file/file.service";
import {Router} from "@angular/router";
import FileObject from "../../entities/FileObject";
import {EditFileComponent} from "../edit-file/edit-file.component";

@Component({
  selector: 'app-file-details-bar',
  templateUrl: './file-details-bar.component.html',
  styleUrls: ['./file-details-bar.component.css']
})
export class FileDetailsBarComponent {
  @Input() fileObject?: FileObject;
  @ViewChild(EditFileComponent) editFileComponent!: EditFileComponent;
  showEditInterface = false;
  showConfirmation = false;

  constructor(private router: Router,private fileService:FileService) {
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
}
