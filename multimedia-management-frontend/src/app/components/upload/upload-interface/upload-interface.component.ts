import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import FileInput from "../../../entities/FileInput";
import {FileService} from "../../../services/file/file.service";
import FileObject from "../../../entities/FileObject";

@Component({
  selector: 'app-upload-interface',
  templateUrl: './upload-interface.component.html',
  styleUrls: ['./upload-interface.component.css']
})
export class UploadInterfaceComponent {
    @Input() showInterface?:boolean
    @Input() text?:String
    @Output() closeUploadEvent=new EventEmitter<boolean>();
    @ViewChild('uploadInput') uploadInput?:ElementRef<HTMLInputElement>;

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
      if (this.uploadInput) {
        this.uploadInput.nativeElement.value = '';
      }
    }

    uploadFile() {
      this.uploadInput?.nativeElement.click()
    }

    handleUploadInput(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const files = inputElement.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.size <= 50 * 1024 * 1024) { // exclude files larger than 50MB
          this.selectedFile = {
            file: file,
            fileUrl: URL.createObjectURL(file)
          };
        }
        console.log(this.selectedFile);
      }
    }

    handleRemoveFile(fileInput: FileInput) {
      this.selectedFile = undefined;
    }

    handleUploadFile() {
      if(this.selectedFile?.file){
        console.log("Uploading.....")
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
