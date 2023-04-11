import {Component, Input, ViewChild} from '@angular/core';
import {FileService} from "../../services/file/file.service";
import {ActivatedRoute, Router} from "@angular/router";
import FileObject from "../../entities/FileObject";
import {EditFileComponent} from "../edit-file/edit-file.component";
import { Location } from '@angular/common';

@Component({
  selector: 'app-file-details-bar',
  templateUrl: './file-details-bar.component.html',
  styleUrls: ['./file-details-bar.component.css']
})
export class FileDetailsBarComponent {
  @Input() fileObject?:FileObject
  @ViewChild(EditFileComponent) editFileComponent!: EditFileComponent;
  showEditInterface:boolean=false

  constructor(private router: Router,private fileService:FileService) {
  }
  handelCloseDetailsClick() {
    const type=this.fileObject?.type
    const category=this.fileObject?.category
    if(type=='IMAGE'){
      this.router.navigate([category?.toLowerCase(),'images'])
    }else if(type=='VIDEO'){
      this.router.navigate([category?.toLowerCase(),'videos'])
    }else {
      this.router.navigate(['home'])
    }
  }

  fileVersionTranslate():String{
    switch (this.fileObject?.version){
      case "VF":
        return "Française"
      case "VA":
        return "Arabe"
      default:
        return ""
    }
  }

  handleDeleteFile() {
    if(this.fileObject?.id){
      this.fileService.removeFile(this.fileObject?.id).subscribe(
        () => {
          console.log(`File with ID ${this.fileObject?.id} deleted successfully`);
          this.handelCloseDetailsClick()
        },
        error => console.error(`Error deleting file with ID ${this.fileObject?.id}: ${error}`)
      );
    }
  }

  handleEditFile() {
    this.editFileComponent.toggleVisibility(true)
  }

  handleFileObjectChange(newFileObject:FileObject) {
    this.fileObject= {...newFileObject}
  }
}
