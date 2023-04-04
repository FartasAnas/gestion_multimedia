import {Component, OnInit} from '@angular/core';
import FileObject from "../../entities/FileObject";
import {ActivatedRoute, Router} from "@angular/router";
import {FileService} from "../../services/file/file.service";

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit{
  fileObject?:FileObject
  hostname=window.location.hostname
  constructor(private fileService:FileService,private activatedRoute: ActivatedRoute,private router: Router) {
  }
  handelCloseDetailsClick() {
    this.router.navigate(['web/images']);
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getFileById(+params['id']);
    });

  }
  getFileById(id: number): void {
    this.fileService.getFileById(id)
      .subscribe(fileObject => this.fileObject = fileObject);
  }
  fileVersionTranslate():String{
    switch (this.fileObject?.version){
      case "VF":
        return "Française"
      case "VA":
        return "Arabe"
      default:
        return ""
    }
  }


}
