import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.css']
})
export class DocumentViewerComponent {
  @Input() fileBase64:string=""
  zoom = 0.98;
  zoomMax = 2;
  zoomMin = 0.5;
  zoomAmt = 0.2;
  setZoom(type: 'in'|'reset'|'out'): void {
    if (type === 'in') {
      this.zoom = Math.min(this.zoomMax, this.zoom + this.zoomAmt);
    } else if (type === 'reset') {
      this.zoom = 0.98;
    } else if (type === 'out') {
      this.zoom = Math.max(this.zoomMin, this.zoom - this.zoomAmt);
    }
  }
}
