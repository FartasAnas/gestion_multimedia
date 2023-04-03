import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import KeywordObject from "../../entities/KeywordObject";
import FileObject from "../../entities/FileObject";
import {KeywordService} from "../../services/keyword/keyword.service";
import FileInput from "../../entities/FileInput";

@Component({
  selector: 'app-keywords-selector',
  templateUrl: './keywords-selector.component.html',
  styleUrls: ['./keywords-selector.component.css']
})
export class KeywordsSelectorComponent implements OnInit{
  keywords$:Observable<KeywordObject[]> = new Observable<FileObject[]>();
  selectedKeywords:KeywordObject[] = [];
  showKeywords:boolean=false
  @Output() selectedKeywordsEvent=new EventEmitter<KeywordObject[]>();
  constructor(private keywordService:KeywordService) {
  }

  ngOnInit(): void {
    this.keywords$=this.keywordService.getKeywords();
  }

  addKeyword(Keyword:KeywordObject) {
    if (!this.selectedKeywords.includes(Keyword) && this.selectedKeywords.length<=20) {
      this.selectedKeywords.push(Keyword);
      this.selectedKeywordsEvent.emit(this.selectedKeywords)
    }
  }
  removeKeyword(Keyword:KeywordObject) {
    const index = this.selectedKeywords.indexOf(Keyword);
    if (index !== -1) {
      this.selectedKeywords.splice(index, 1);
      this.selectedKeywordsEvent.emit(this.selectedKeywords)
    }
  }
  handleShowKeywords(){
    this.showKeywords=!this.showKeywords
  }
  isChecked(Keyword:KeywordObject){
    return{
      'checked':this.selectedKeywords.includes(Keyword)
    }
  }


}
