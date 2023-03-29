import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import FileObject from "../../../entities/FileObject";
import FileInput from "../../../entities/FileInput";
import {FileService} from "../../../services/file/file.service";
import {UploadInterfaceStep1Component} from "../upload-interface-step1/upload-interface-step1.component";

@Component({
  selector: 'app-upload-interface',
  templateUrl: './upload-interface.component.html',
  styleUrls: ['./upload-interface.component.css']
})
export class UploadInterfaceComponent {
  @Input() showInterface?:boolean
  @Input() text?:String
  @Output() closeUploadEvent=new EventEmitter<boolean>();
  @ViewChild (UploadInterfaceStep1Component) childComponent?: UploadInterfaceStep1Component;

  fileObject:FileObject={
    createdBy:"fartasanas",
    fileName:"",
    description:"From Front",
    type:"IMAGE",
    version:"VF",
    state:"PUBLISHED"
  }
  selectedFile?: FileInput | undefined;
  constructor(private fileService:FileService) {
  }

  handelCloseInterfaceClick() {
    this.showInterface = false;
    this.closeUploadEvent.emit(this.showInterface);
    this.selectedFile=undefined
    this.childComponent?.clearInputValue()
  }
  handleFileEvent(fileInput: FileInput) {
    this.selectedFile=fileInput;
  }
  handleRemoveFile(fileInput: FileInput) {
    this.selectedFile = undefined;
  }

  handleUploadFile() {
    console.log("Uploading......",this.selectedFile)
    if(this.selectedFile?.file){
      this.fileService.saveFile(this.selectedFile?.file,this.fileObject).subscribe(
        data=>{
          console.log(data)
        },
        error => {
          console.error('Login error:', error.status);
        }
      )
    }
  }



}
