import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-upload-btn',
  templateUrl: './upload-btn.component.html',
  styleUrls: ['./upload-btn.component.css']
})
export class UploadBtnComponent {
  @Input() text?:String
  @Input() fileType?:String
  clicked:boolean=false
  handleClick() {
    this.clicked = !this.clicked;
  }
  handleCloseUploadEvent(showInterface: boolean) {
    this.clicked = showInterface;
  }
}
