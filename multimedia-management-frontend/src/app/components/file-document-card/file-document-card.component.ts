import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-file-document-card',
  templateUrl: './file-document-card.component.html',
  styleUrls: ['./file-document-card.component.css']
})
export class FileDocumentCardComponent {
  @Input() fileExtension:string=''
  @Input() fileUrl:string=''
}
