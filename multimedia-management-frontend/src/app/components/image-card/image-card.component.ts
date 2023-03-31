import {Component, Input} from '@angular/core';
import FileObject from "../../entities/FileObject";

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css']
})
export class ImageCardComponent{
  hostname=window.location.hostname
  @Input() fileObject?:FileObject
  imageUrl = 'http://localhost:8100/files/download/'+this.fileObject?.id as String;
  fileStateTranslate():String {
    switch (this.fileObject?.state) {
      case "PUBLISHED":
        return "publié";
      case "PLANNED":
        return "planifié";
      case "PENDING":
        return "en attente";
      case "UNPUBLISHED":
        return "non publié";
      default:
        return "";
    }
  }
}
