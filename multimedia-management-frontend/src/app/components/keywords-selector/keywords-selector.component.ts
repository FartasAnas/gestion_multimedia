import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {map, Observable} from "rxjs";
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
  searchedKeyword:string=''
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

  onSearch(event:KeyboardEvent){
    if (this.searchedKeyword !== '') {
      const keyword = this.keywords$.pipe(
        map(keywords => keywords.find(k => (k as KeywordObject).name?.toLowerCase().startsWith(this.searchedKeyword.toLowerCase())))
      );
      keyword.subscribe(k => {
        if(this.searchedKeyword.length===3){
          if (k) {
            if(!(this.selectedKeywords.find(key => key.name?.toLowerCase() === k.name?.toLowerCase()))){
              this.addKeyword(k);
              this.searchedKeyword = '';
            }
          }
        }
        if(event.key==='Enter'){
          if(!(this.selectedKeywords.find(key => key.name?.toLowerCase() === this.searchedKeyword.toLowerCase()))){
            const newKeyword = {id: new Date().getTime(),name: this.searchedKeyword};
            this.addKeyword(newKeyword);
            this.searchedKeyword = '';
          }
        }
      });
    }
  }


}
