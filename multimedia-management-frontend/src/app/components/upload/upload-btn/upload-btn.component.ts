import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-upload-btn',
  templateUrl: './upload-btn.component.html',
  styleUrls: ['./upload-btn.component.css']
})
export class UploadBtnComponent {
  @Input() text?:string
  @Input() fileType?:string
  @Input() categoryId?:number
  @Output() fileUploaded = new EventEmitter();
  clicked:boolean=false
  handleClick() {
    this.clicked = !this.clicked;
  }
  handleCloseUploadEvent(showInterface: boolean) {
    this.clicked = showInterface;
  }
  onFileUploaded(): void {
    this.fileUploaded.emit()
  }
}
