import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import KeywordObject from "../../entities/KeywordObject";
import {KeywordService} from "../../services/keyword/keyword.service";

@Component({
  selector: 'app-input-selector',
  templateUrl: './input-selector.component.html',
  styleUrls: ['./input-selector.component.css']
})
export class InputSelectorComponent{
  @Input() selectedInputs:any[] = [];
  @Input() listType:string=''
  @Input() placeholder:string=''
  @Input() fileType:string=''
  showInputs:boolean=false
  inputsList:any[]=[]
  @Output() selectedInputsEvent=new EventEmitter<any[]>();
  constructor(private keywordService:KeywordService) {
  }

  ngOnInit(): void {
    switch (this.listType) {
      case 'keyword':
        this.loadKeywords();
        break;
      case 'status':
        this.loadStatuses();
        break;
      case 'version':
        this.loadVersions();
        break;
      case 'extension':
        this.loadExtensions();
        break;
    }
  }


  addInput(input: any) {
    const selectedInput = this.selectedInputs.find(i => i.id === input.id);
    if (!selectedInput && this.selectedInputs.length < 20) {
      this.selectedInputs.push(input);
      this.selectedInputsEvent.emit(this.selectedInputs);
    } else if (selectedInput) {
      this.removeInput(selectedInput);
    }
  }
  removeInput(input: any) {
    const index = this.selectedInputs.findIndex(i => i.id === input.id);
    if (index !== -1) {
      this.selectedInputs.splice(index, 1);
      this.selectedInputsEvent.emit(this.selectedInputs);
    }
  }
  handleShowInputs(){
    this.showInputs=!this.showInputs
  }
  handleInputSelectorBlur() {
    this.showInputs = false;
  }
  isChecked(input:any){
    const selectedInput = this.selectedInputs.find(i => i.id === input.id);
    return {
      'checked': !!selectedInput
    };
  }
  selectAllInputs() {
    if(!this.isAllSelected())
      this.selectedInputs = [...this.inputsList];
    else
      this.selectedInputs=[]
  }
  isAllSelected(): boolean {
    return this.selectedInputs.length === this.inputsList.length;
  }


  private loadKeywords(): void {
    this.keywordService.getKeywords().subscribe(
      keywords => { this.inputsList = keywords; },
      error => { console.log("Error Calling the keywords List:" + error); }
    );
  }

  private loadStatuses(): void {
    this.inputsList = [
      { id: 1, name: "PUBLISHED", color: '#D1EEDB' },{ id: 2, name: "PLANNED", color: '#DDD8FF' },
      { id: 3, name: "PENDING", color: '#FFE9C5' },{ id: 4, name: "UNPUBLISHED", color: '#FCD9BD' }
    ];
  }

  private loadVersions(): void {
    this.inputsList = [
      { id: "VF", name: "Version française" },
      { id: "VA", name: "Version arabe" }
    ];
  }

  private loadExtensions(): void {
    switch (this.fileType) {
      case 'IMAGE':
        this.inputsList = [
          { id: 1, name: "WebP" }, { id: 2, name: "TIFF" }, { id: 3, name: "PSD" }, { id: 4, name: "PNG" },
          { id: 5, name: "GIF" }, { id: 6, name: "INDD" }, { id: 7, name: "JPG" }, { id: 8, name: "AI" }, { id: 9, name: "ZIP" }
        ];
        break;
      case 'VIDEO':
        this.inputsList = [
          { id: 1, name: "MOV" }, { id: 2, name: "MP4" }, { id: 3, name: "AVI" },
          { id: 4, name: "WMF" }, { id: 5, name: "FLV" }, { id: 6, name: "WebM" }
        ];
        break;
      case 'DOCUMENT':
        this.inputsList = [
          { id: 1, name: "DOCX" }, { id: 2, name: "PPTX" }, { id: 3, name: "XLSX" }, { id: 4, name: "PDF" }
        ];
        break;
    }
  }
}
