import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnChanges{
  @Input() fileUrl?:string
  ngOnChanges(changes: SimpleChanges): void {
    if ('fileUrl' in changes) {
      const video = document.querySelector('video');
      if (video) {
        video.load();
      }
    }
  }
}
