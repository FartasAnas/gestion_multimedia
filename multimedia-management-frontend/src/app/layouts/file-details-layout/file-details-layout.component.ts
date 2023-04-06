import {Component, ElementRef, ViewChild} from '@angular/core';
import FileObject from "../../entities/FileObject";
import {FileService} from "../../services/file/file.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-file-details-layout',
  templateUrl: './file-details-layout.component.html',
  styleUrls: ['./file-details-layout.component.css']
})
export class FileDetailsLayoutComponent {
  fileObject?:FileObject
  hostname=window.location.hostname
  scaleValue:number=1;
  fileUrl?:String
  @ViewChild('fileContainer', { static: false }) fileContainer?: ElementRef;
  constructor(private fileService:FileService,private activatedRoute: ActivatedRoute,private router: Router) {
  }
  handelCloseDetailsClick() {
    this.router.navigate(['web/images']);
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getFileById(+params['id']);
      this.fileUrl=`http://${this.hostname}:8100/files/object/${+params['id']}/`
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

  handleCopyFile() {
    const img = new Image();
    img.crossOrigin="anonymous"
    img.src = this.fileUrl as string;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const context = canvas.getContext('2d')!;
      context.drawImage(img, 0, 0);
      canvas.toBlob(blob => {
        if (blob) {
          const item = new ClipboardItem({ 'image/png': blob });
          navigator.clipboard.write([item]).then(() => {
            console.log('Image copied to clipboard');
          }, error => {
            console.error('Failed to copy image to clipboard: ', error);
          });
        }
      }, 'image/png');
    };
  }


}
