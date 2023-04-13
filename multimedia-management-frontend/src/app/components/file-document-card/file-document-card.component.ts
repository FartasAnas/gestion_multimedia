import {Component, Input, OnInit} from '@angular/core';
import {FileService} from "../../services/file/file.service";

@Component({
  selector: 'app-file-document-card',
  templateUrl: './file-document-card.component.html',
  styleUrls: ['./file-document-card.component.css']
})
export class FileDocumentCardComponent{
  @Input() fileExtension:string=''
  @Input() fileUrl:string=''
  constructor(private fileService:FileService) {
  }

}
