import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import FileObject from "../../entities/FileObject";
import {Router} from "@angular/router";

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.css']
})
export class FileCardComponent implements OnInit{
  hostname=window.location.hostname
  fileType?:String
  fileUrl?:String
  @Input() fileObject?:FileObject
  @ViewChild('videoElement') myVideo?: ElementRef;
  constructor(private router: Router) {
  }
  handleDisplayFile() {
    this.router.navigate(['web/file/',this.fileObject?.id]);
  }

  ngOnInit(): void {
    this.fileType=this.fileObject?.type
    this.fileUrl=`http://${this.hostname}:8100/files/object/${this.fileObject?.id}/`
  }

  playVideo() {
    const video = this.myVideo?.nativeElement;
    if (video) {
      video.muted = true;
      video.play();
    }
  }

  pauseVideo() {
    const video = this.myVideo?.nativeElement;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }
}
