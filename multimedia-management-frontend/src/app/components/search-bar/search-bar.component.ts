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
  fileStatus:any[]=[]
  fileVersion:any[]=[]
  fileExtension:any[]=[]
  startDate?:Date
  endDate?:Date
  @Input() fileType:string=''
  @Output() searchEvent=new EventEmitter<{fileId: string;fileName:string;fileKeywords:KeywordObject[];fileStatus:any[];fileVersion:any[];fileExtension:any[];startDate:Date;endDate:Date}>();

  handleInputChanges() {
    this.searchEvent.emit({fileId:this.fileId,fileName:this.fileName,fileKeywords:this.fileKeywords,fileStatus:this.fileStatus,fileVersion:this.fileVersion,fileExtension:this.fileExtension,startDate:(this.startDate as Date),endDate:(this.endDate as Date)})
  }

  handleSelectedStatusEvent(selectedStatus:any[]) {
    this.fileStatus={...selectedStatus}
    this.handleInputChanges()
  }

  handleSelectedKeywords(selectedKeywords: KeywordObject[]) {
    this.fileKeywords={...selectedKeywords}
    this.handleInputChanges()
  }

  handleSelectedVersionEvent(selectedVersion: any[]) {
    this.fileVersion={...selectedVersion}
    this.handleInputChanges()
  }

  handleSelectedExtension(selectedExtension: any[]) {
    this.fileExtension={...selectedExtension}
    this.handleInputChanges()
  }

  handleSelectedDateRange(event: { startDate: Date; endDate: Date }) {
      this.startDate=event.startDate
      this.endDate=event.endDate
    this.handleInputChanges()
  }
}
