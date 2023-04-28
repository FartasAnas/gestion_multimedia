import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import KeywordObject from "../../entities/KeywordObject";
import FileObject from "../../entities/FileObject";
import {KeywordService} from "../../services/keyword/keyword.service";

@Component({
  selector: 'app-keywords-selector',
  templateUrl: './keywords-selector.component.html',
  styleUrls: ['./keywords-selector.component.css']
})
export class KeywordsSelectorComponent implements OnInit{
  keywords$:Observable<KeywordObject[]> = new Observable<FileObject[]>();
  @Input() selectedKeywords:KeywordObject[] = [];
  @Input() inSearchBar:boolean=false
  showKeywords:boolean=false
  @Output() selectedKeywordsEvent=new EventEmitter<KeywordObject[]>();
  constructor(private keywordService:KeywordService) {
  }

  ngOnInit(): void {
    this.keywords$=this.keywordService.getKeywords();
  }


  addKeyword(keyword: KeywordObject) {
    const selectedKeyword = this.selectedKeywords.find(k => k.id === keyword.id);
    if (!selectedKeyword && this.selectedKeywords.length < 20) {
      this.selectedKeywords.push(keyword);
      this.selectedKeywordsEvent.emit(this.selectedKeywords);
    } else if (selectedKeyword) {
      this.removeKeyword(selectedKeyword);
    }
  }
  removeKeyword(keyword: KeywordObject) {
    const index = this.selectedKeywords.findIndex(k => k.id === keyword.id);
    if (index !== -1) {
      this.selectedKeywords.splice(index, 1);
      this.selectedKeywordsEvent.emit(this.selectedKeywords);
    }
  }
  handleShowKeywords(){
    this.showKeywords=!this.showKeywords
  }
  isChecked(keyword:KeywordObject){
    const selectedKeyword = this.selectedKeywords.find(k => k.id === keyword.id);
    return {
      'checked': !!selectedKeyword
    };
  }
}
