import {Component, EventEmitter, Input, Output} from '@angular/core';
import KeywordObject from "../../entities/KeywordObject";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  spreadSearchInputs:boolean=false
  fileId:string=''
  fileName:string=''
  fileKeywords:KeywordObject[]=[]
  @Input() fileType:string=''
  @Output() searchEvent=new EventEmitter<{fileId: string;fileName:string;fileKeywords:KeywordObject[]}>();

  handleInputChanges() {
    this.searchEvent.emit({fileId:this.fileId,fileName:this.fileName,fileKeywords:this.fileKeywords})
  }

  handleSelectedInputsEvent(selectedKeywords:KeywordObject[]) {
    this.fileKeywords={...selectedKeywords}
    this.handleInputChanges()
  }
}
