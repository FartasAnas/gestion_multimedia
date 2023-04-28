import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent {
  @Input() tableListTitle: string='';
  @Input() columns: string[] = [];
  @Input() data: any[]=[];

}
