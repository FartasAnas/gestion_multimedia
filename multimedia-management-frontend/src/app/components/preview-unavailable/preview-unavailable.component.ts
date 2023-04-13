import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-preview-unavailable',
  templateUrl: './preview-unavailable.component.html',
  styleUrls: ['./preview-unavailable.component.css']
})
export class PreviewUnavailableComponent {
  @Input() fileUrl:string=""
}
