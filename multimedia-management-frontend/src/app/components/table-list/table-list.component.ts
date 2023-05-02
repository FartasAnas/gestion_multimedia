import {Component, Input} from '@angular/core';
import {CategoryService} from "../../services/category/category.service";

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent {
  @Input() tableListTitle: string='';
  @Input() columns: string[] = [];
  @Input() data: any[]=[];
  constructor(private categoryService:CategoryService) {
  }
  getCategoryIconUrl(categoryId:number):string{
    return this.categoryService.getIconUrl(categoryId);
  }
}
