import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
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
  @Input() check=false
  @Output() checkedFilesEvent = new EventEmitter<{checkedFile:FileObject}>();
  constructor(private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['check'].currentValue === true) {
      setTimeout(() => {
        (this.fileObject as FileObject).isChecked = true;
        this.checkedFilesEvent.emit({ checkedFile: this.fileObject as FileObject });
      }, 0);
    } else {
      (this.fileObject as FileObject).isChecked = false;
    }
  }
  handleDisplayFile() {
    this.router.navigate([this.fileObject?.category?.path,'file',this.fileObject?.id]);
  }

  ngOnInit(): void {
    this.fileUrl=`http://${this.hostname}:8100/files/object/${this.fileObject?.id}/`
    this.fileExtension=this.fileObject?.fileName?.split(".")[1] as string
    (this.fileObject as FileObject).isChecked=false
  }
  nameText():string{
    if(this.fileObject?.type=="DOCUMENT")
      return this.fileObject.fileName as string
    return "ID "+this.fileObject?.id
  }


  fileChecked() {
    (this.fileObject as FileObject).isChecked=!(this.fileObject as FileObject).isChecked
    this.checkedFilesEvent.emit({checkedFile:this.fileObject as FileObject})
  }
}
