import {Component, Input} from '@angular/core';
import FileObject from "../../entities/FileObject";
import {Router} from "@angular/router";

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css']
})
export class ImageCardComponent{
  hostname=window.location.hostname
  @Input() fileObject?:FileObject
  imageUrl = 'http://localhost:8100/files/download/'+this.fileObject?.id as String;
  constructor(private router: Router) {
  }
  handleDisplayImage() {
    this.router.navigate(['web/images/',this.fileObject?.id]);
  }
}
