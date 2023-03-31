import {Component, EventEmitter, Input, Output} from '@angular/core';
import FileObject from "../../../entities/FileObject";

@Component({
  selector: 'app-upload-interface-step2',
  templateUrl: './upload-interface-step2.component.html',
  styleUrls: ['./upload-interface-step2.component.css']
})
export class UploadInterfaceStep2Component {
  @Input() fileObject?:FileObject
  @Output() fileObjectChange = new EventEmitter<FileObject>();

}
