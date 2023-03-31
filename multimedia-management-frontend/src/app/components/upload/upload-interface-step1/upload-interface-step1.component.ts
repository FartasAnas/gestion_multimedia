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
  @Input() selectedFile?: FileInput | undefined;

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
        this.fileEvent.emit(this.selectedFile)
      }
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

