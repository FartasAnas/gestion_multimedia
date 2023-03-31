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

  handleUploadInput(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    if (file.size <= 50 * 1024 * 1024) {
      reader.onload = (e: any) => {
        this.selectedFile = {
          file: file,
          fileUrl: file.type.startsWith('image/') ? e.target.result : null
        };
      };
      reader.readAsDataURL(file);
      this.fileEvent.emit(this.selectedFile)
    }
  }
  handleRemoveFile(fileInput: FileInput) {
    this.selectedFile = undefined;
    this.fileEvent.emit(this.selectedFile)
    this.clearInputValue()
  }
  handleSelectFile() {
    this.uploadInput?.nativeElement.click()
  }
  clearInputValue(){
    if (this.uploadInput) {
      this.uploadInput.nativeElement.value = '';
    }
  }

}

