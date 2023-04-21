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
  showInputs:boolean=false
  inputsList:any[]=[]
  @Output() selectedInputsEvent=new EventEmitter<any[]>();
  constructor(private keywordService:KeywordService) {
  }

  ngOnInit(): void {
    if (this.listType === 'keyword') {
      this.keywordService.getKeywords().subscribe(
        keywords=>{this.inputsList=keywords},
        error => {console.log("Error Calling the keywords List:"+error)})
    }else if(this.listType === 'status'){
      this.inputsList=Object.values([{id:1,name:"PUBLISHED",color:'#D1EEDB'},{id:2,name:"PLANNED",color:'#DDD8FF'},
                                        {id:3,name:"PENDING",color:'#FFE9C5'},{id:4,name:"UNPUBLISHED",color:'#FCD9BD'}])
    }else if(this.listType === 'version'){
      this.inputsList=Object.values([{id:"VF",name:"Version française"},{id:"VA",name:"Version arabe"}])
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
  isChecked(input:any){
    const selectedInput = this.selectedInputs.find(i => i.id === input.id);
    return {
      'checked': !!selectedInput
    };
  }


}
