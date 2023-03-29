import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-upload-interface-step2',
  templateUrl: './upload-interface-step2.component.html',
  styleUrls: ['./upload-interface-step2.component.css']
})
export class UploadInterfaceStep2Component {
  @Input() showInterface?:boolean
  @Input() text?:String
  @Output() closeUploadEvent=new EventEmitter<boolean>();

  handelCloseInterfaceClick() {
    this.showInterface = false;
    this.closeUploadEvent.emit(this.showInterface);
  }
}
