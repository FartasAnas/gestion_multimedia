import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import FileInput from "../../../entities/FileInput";

@Component({
  selector: 'app-upload-interface-step1',
  templateUrl: './upload-interface-step1.component.html',
  styleUrls: ['./upload-interface-step1.component.css']
})
export class UploadInterfaceStep1Component {
  @Output() fileEvent=new EventEmitter<FileInput>();
  @ViewChild('uploadInput') uploadInput?:ElementRef<HTMLInputElement>;
  @Input() selectedFile?: FileInput;
  @Input() fileType?:string


  handleUploadInput(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    let allowedTypes: string[] = [];
    switch (this.fileType) {
      case 'IMAGE':
        allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml'];
        break;
      case 'VIDEO':
        allowedTypes = ['video/mp4', 'video/mpeg', 'video/avi'];
        break;
      case 'DOCUMENT':
        allowedTypes = ['application/pdf', 'application/msword', 'text/plain'];
        break;
      default:
        allowedTypes = [];
        break;
    }

    if (allowedTypes.includes(file.type) && file.size <= 50 * 1024 * 1024) {
      reader.onload = (e: any) => {
        this.selectedFile = {
          file: file,
          fileUrl: file.type.startsWith('image/') ? e.target.result : null
        };
        this.fileEvent.emit(this.selectedFile);
      };
      reader.readAsDataURL(file);
    } else {
      console.log('Invalid file type or size');
    }
  }

  handleRemoveFile(fileInput: FileInput) {
    this.selectedFile = undefined;
    this.fileEvent.emit(this.selectedFile)
    this.clearInputValue()
  }
  handleSelectFile() {
    if(!this.selectedFile) {
      this.uploadInput?.nativeElement.click()
    }
  }
  clearInputValue(){
    if (this.uploadInput) {
      this.uploadInput.nativeElement.value = '';
    }
  }

}

