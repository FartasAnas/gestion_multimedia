import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-popup-message',
  templateUrl: './confirmation-popup-message.component.html',
  styleUrls: ['./confirmation-popup-message.component.css']
})
export class ConfirmationPopupMessageComponent {
  @Output() confirmed = new EventEmitter<boolean>();
  @Input() transformX:string=''
  constructor() { }

  onNoClick(): void {
    this.confirmed.emit(false);
  }

  onYesClick(): void {
    this.confirmed.emit(true);
  }
}
