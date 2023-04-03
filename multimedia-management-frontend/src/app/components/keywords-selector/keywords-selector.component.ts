import { Component } from '@angular/core';

@Component({
  selector: 'app-keywords-selector',
  templateUrl: './keywords-selector.component.html',
  styleUrls: ['./keywords-selector.component.css']
})
export class KeywordsSelectorComponent {
  keywords:String[] = ['Person', 'Animal', 'Place', 'Object'];
  selectedKeywords:String[] = [];
  showKeywords:boolean=false
  addKeyword(tag:String) {
    if (!this.selectedKeywords.includes(tag) && this.selectedKeywords.length<=20) {
      this.selectedKeywords.push(tag);
    }
  }
  removeKeyword(tag:String) {
    const index = this.selectedKeywords.indexOf(tag);
    if (index !== -1) {
      this.selectedKeywords.splice(index, 1);
    }
  }
  handleShowKeywords(){
    this.showKeywords=!this.showKeywords
  }
  isChecked(tag:String){
    return{
      'checked':this.selectedKeywords.includes(tag)
    }
  }
}
