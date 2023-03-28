import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import FileInput from "../../../entities/FileInput";

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
    selectedFiles: FileInput[] = [];

  handelCloseInterfaceClick() {
    console.log(this.selectedFiles.length)
    this.showInterface = false;
    this.closeUploadEvent.emit(this.showInterface);
    this.selectedFiles=[]
  }

  uploadFile() {
    this.uploadInput?.nativeElement.click()
  }

  handleUploadInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    //https://poe.com/s/m1QNVDY47OLxUUk1nVkD
    if (files) {
      Array.from(files).forEach(file => {
        if (file.size <= 50 * 1024 * 1024) { // exclude files larger than 50MB
          const fileObject: FileInput = {
            file: file,
            fileUrl: URL.createObjectURL(file)
          };
          this.selectedFiles.push(fileObject);
        }
      });
      console.log(this.selectedFiles);
    }
  }

  handleRemoveFile(fileInput: FileInput) {
    this.selectedFiles = this.selectedFiles.filter(file => file !== fileInput);
  }
}
