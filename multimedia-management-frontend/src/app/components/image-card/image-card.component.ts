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
  showImageDetail:boolean=false
  constructor(private router: Router) {
  }
  handleDisplayImage() {
    this.showImageDetail=true;
    const queryParams = { file: JSON.stringify(this.fileObject) };
    this.router.navigate(['web/images',this.fileObject?.id]);
  }
  handleCloseDetailsEvent(showImageDetail:boolean) {
    this.showImageDetail=showImageDetail

  }

  fileStateTranslate():String {
    switch (this.fileObject?.state) {
      case "PUBLISHED":
        return "Publié";
      case "PLANNED":
        return "Planifié";
      case "PENDING":
        return "En attente";
      case "UNPUBLISHED":
        return "Non publié";
      default:
        return "";
    }
  }
}
