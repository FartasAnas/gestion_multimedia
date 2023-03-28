import {Component, EventEmitter, Input, Output} from '@angular/core';
import FileInput from "../../../entities/FileInput";

@Component({
  selector: 'app-upload-progress',
  templateUrl: './upload-progress.component.html',
  styleUrls: ['./upload-progress.component.css']
})
export class UploadProgressComponent {
    @Input() fileContent?:FileInput
    @Output() removeFile=new EventEmitter<FileInput>();


    handleRemoveFile() {
      this.removeFile.emit(this.fileContent)
    }

    getFileSize(bytes: number) {
      if (bytes == 0) {
        return "0 KB";
      }
      const k = 1024; // 1 KB = 1024 bytes
      const sizes = ["KB", "MB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      const size = parseFloat((bytes / Math.pow(k, i)).toFixed(1));
      return `${size} ${sizes[i-1]}`;
    }

}
