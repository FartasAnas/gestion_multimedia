import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-list-action-button',
  templateUrl: './list-action-button.component.html',
  styleUrls: ['./list-action-button.component.css']
})
export class ListActionButtonComponent {
  @Input() imageUrl: string='';
  @Input() btnBorder: string='';

}
