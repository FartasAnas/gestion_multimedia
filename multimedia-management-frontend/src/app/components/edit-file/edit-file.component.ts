import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import FileObject from "../../entities/FileObject";
import KeywordObject from "../../entities/KeywordObject";
import {FileService} from "../../services/file/file.service";
import {NgForm} from "@angular/forms";
import {FileVideoCardComponent} from "../file-video-card/file-video-card.component";

@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.css']
})
export class EditFileComponent implements OnInit,OnChanges{
  isVisible:boolean=false
  hostname=window.location.hostname
  //same for this class even if the fileObject changes the values in form does not change
  @Input() fileObject?:FileObject
  fileObjectCopy?:FileObject
  @Output() fileObjectChange = new EventEmitter<FileObject>();
  selectedKeywords:KeywordObject[]=[]
  fileUrl?:string
  @ViewChild(FileVideoCardComponent) videoCard?:FileVideoCardComponent

  ngOnInit(): void {
    this.fileObjectCopy=Object.assign({}, this.fileObject)
    this.selectedKeywords=Object.assign([], this.fileObject?.keywords);
    this.fileUrl=`http://${this.hostname}:8100/files/object/${this.fileObject?.id}/`
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

  ngOnChanges(changes: SimpleChanges): void {
    if ('fileObject' in changes) {
      this.updateEditInterface()
    }
  }

  updateEditInterface() {
    this.fileObjectCopy = Object.assign({}, this.fileObject);
    this.fileUrl = `http://${this.hostname}:8100/files/object/${this.fileObject?.id}/`;
    this.selectedKeywords=Object.assign([], this.fileObject?.keywords)
  }
}
