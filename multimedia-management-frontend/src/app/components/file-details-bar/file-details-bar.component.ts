import {Component, Input, ViewChild} from '@angular/core';
import {FileService} from "../../services/file/file.service";
import {ActivatedRoute, Router} from "@angular/router";
import FileObject from "../../entities/FileObject";
import {EditFileComponent} from "../edit-file/edit-file.component";

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
    this.router.navigate(['web/images']);
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
      this.fileService.removeFile(this.fileObject?.id)
      this.router.navigate(['web/images']);
    }
  }

  handleEditFile() {
    console.log('clicked')
    this.editFileComponent.toggleVisibility(true)
  }

  handleFileObjectChange(newFileObject:FileObject) {
    this.fileObject= {...newFileObject}
  }
}
