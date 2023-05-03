import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import FileObject from "../../entities/FileObject";
import {Route, Router} from "@angular/router";
import {LibraryLayoutComponent} from "../../layouts/library-layout/library-layout.component";
import {FileDetailsLayoutComponent} from "../../layouts/file-details-layout/file-details-layout.component";

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
  constructor(private router: Router) {
  }
  handleDisplayFile() {
    const routes: Route[] = [];
    const fileDetailsRoute: Route = {
      path: this.fileObject?.category?.path,
      component: LibraryLayoutComponent,
      children: [{ path: 'file/:id', component: FileDetailsLayoutComponent }]
    };
    routes.push(fileDetailsRoute);
    this.router.config.unshift(...routes)
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
    console.log("Check File Id:"+this.fileObject?.id)
  }
}
