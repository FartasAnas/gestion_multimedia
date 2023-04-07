import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import FileObject from "../../entities/FileObject";
import KeywordObject from "../../entities/KeywordObject";
import {FileService} from "../../services/file/file.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.css']
})
export class EditFileComponent implements OnInit{
  isVisible:boolean=false
  hostname=window.location.hostname
  @Input() fileObject?:FileObject
  fileObjectCopy?:FileObject
  @Output() fileObjectChange = new EventEmitter<FileObject>();
  selectedKeywords:KeywordObject[]=[]

  ngOnInit(): void {
    this.fileObjectCopy=Object.assign({}, this.fileObject)
    this.selectedKeywords=Object.assign([], this.fileObject?.keywords);
  }
  constructor(private fileService:FileService) {
  }
  toggleVisibility(toggle:boolean): void {
    if(!toggle){
      this.fileObjectCopy= {...this.fileObject}
    }
    this.isVisible = toggle;
  }

  handleSubmit(form:NgForm) {

    this.fileObject={...this.fileObjectCopy}
    this.fileObject.keywords=[...this.selectedKeywords]
    const fileId=this.fileObject?.id
    if(fileId && this.fileObject) {
      this.fileService.updateFile(fileId, this.fileObject).subscribe(
        () => {
          console.log(`File with ID ${fileId} deleted successfully`)
          this.fileObjectChange.emit(this.fileObject)
          this.toggleVisibility(false)
        },
        error => console.error(`Error deleting file with ID ${fileId}: ${error}`)
      );
    }
  }
}
