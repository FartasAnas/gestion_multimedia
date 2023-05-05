import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import FileObject from "../../entities/FileObject";
import {Router} from "@angular/router";

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.css']
})
export class FileCardComponent implements OnInit{
  hostname=window.location.hostname
  fileUrl:string=''
  fileExtension:string=''
  testUrl:string=''
  @Input() fileObject?:FileObject
  @Input() cardWidth?:string
  @Input() cardHeight?:string
  @ViewChild('videoElement') myVideo?: ElementRef;
  isChecked:boolean=false
  @Output() checkedFilesEvent = new EventEmitter<{isChecked:boolean;checkedFile:FileObject}>();
  constructor(private router: Router) {
  }
  handleDisplayFile() {
    this.router.navigate([this.fileObject?.category?.path,'file',this.fileObject?.id]);
  }

  ngOnInit(): void {
    this.fileUrl=`http://${this.hostname}:8100/files/object/${this.fileObject?.id}/`
    this.fileExtension=this.fileObject?.fileName?.split(".")[1] as string
  }
  nameText():string{
    if(this.fileObject?.type=="DOCUMENT")
      return this.fileObject.fileName as string
    return "ID "+this.fileObject?.id
  }


  fileChecked() {
    this.isChecked=!this.isChecked
    this.checkedFilesEvent.emit({isChecked:this.isChecked,checkedFile:this.fileObject as FileObject})
  }
}
