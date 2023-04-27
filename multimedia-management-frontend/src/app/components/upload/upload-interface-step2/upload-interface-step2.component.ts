import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import FileObject from "../../../entities/FileObject";
import KeywordObject from "../../../entities/KeywordObject";

@Component({
  selector: 'app-upload-interface-step2',
  templateUrl: './upload-interface-step2.component.html',
  styleUrls: ['./upload-interface-step2.component.css']
})
export class UploadInterfaceStep2Component{
  @Input() fileObject?:FileObject
  @Output() fileObjectChange = new EventEmitter<FileObject>();
  @Output() selectedKeywordsEvent=new EventEmitter<KeywordObject[]>();
  selectedKeywords:KeywordObject[] = [];

  handleSelectedKeywords(newSelectedKeywords:KeywordObject[]) {
    this.selectedKeywordsEvent.emit(newSelectedKeywords)
  }
  ngOnInit(): void {
  }
}
