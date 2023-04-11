import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';

@Component({
  selector: 'app-file-video-card',
  templateUrl: './file-video-card.component.html',
  styleUrls: ['./file-video-card.component.css']
})
export class FileVideoCardComponent{
  @Input() fileUrl?:string
  @ViewChild('videoElement') myVideo?: ElementRef;

  loadVideo(){
    const video = this.myVideo?.nativeElement;
    video.load()
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
