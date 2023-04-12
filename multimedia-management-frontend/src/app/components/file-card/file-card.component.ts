import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import FileObject from "../../entities/FileObject";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.css']
})
export class FileCardComponent implements OnInit{
  hostname=window.location.hostname
  fileUrl:string=''
  fileType:string=''
  testUrl:string=''
  @Input() fileObject?:FileObject
  @Input() cardWidth?:string
  @ViewChild('videoElement') myVideo?: ElementRef;
  constructor(private router: Router,private http:HttpClient) {
  }
  handleDisplayFile() {
    this.router.navigate(['web/file/',this.fileObject?.id]);
  }

  ngOnInit(): void {
    this.fileUrl=`http://${this.hostname}:8100/files/object/${this.fileObject?.id}/`
    this.fileType=this.fileObject?.fileName?.split(".")[1] as string
    this.http.get(this.fileUrl, { responseType: 'blob' })
      .subscribe(response => {
        const url = URL.createObjectURL(response);
        this.testUrl=url
      });
  }
  nameText():string{
    if(this.fileObject?.type=="DOCUMENT")
      return this.fileObject.fileName as string
    return "ID"+this.fileObject?.id
  }


}
