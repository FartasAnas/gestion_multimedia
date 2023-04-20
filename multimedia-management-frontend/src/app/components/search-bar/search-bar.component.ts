import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  spreadSearchInputs:boolean=false
  fileId:string=''
  @Output() searchEvent=new EventEmitter<{fileId: string}>();

  handleInputChanges() {
      this.searchEvent.emit({fileId:this.fileId})
  }
}
