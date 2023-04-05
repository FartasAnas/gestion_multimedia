import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  scaleValue:number=1;
  @ViewChild('imageContainer', { static: false }) imageContainer?: ElementRef;
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

  scaleImage(scale: 'up' | 'down' | 'original'): void {
    const scaleFactor = scale === 'up' ? 1.1 : 0.909;
    const minScale = 1;
    const maxScale = 4;
    if (scale === 'original') {
      this.scaleValue = 1;
    } else {
      const newScale = this.scaleValue * scaleFactor;
      this.scaleValue = Math.min(Math.max(newScale, minScale), maxScale);
    }
  }
}
