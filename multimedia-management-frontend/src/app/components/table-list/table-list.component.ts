import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CategoryService} from "../../services/category/category.service";
import {Router} from "@angular/router";
import Category from "../../entities/Category";
import {SharedService} from "../../services/shared-service/shared.service";

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent {
  @Input() tableListTitle: string='';
  @Input() columns: string[] = [];
  @Input() data: any[]=[];
  @Input() path:string=""
  @Output() reloadItems=new EventEmitter();
  showConfirmation=false;
  itemId?:number;
  constructor(private categoryService:CategoryService,private router: Router,private sharedService:SharedService) {
  }
  getCategoryIconUrl(categoryId:number):string{
    return this.categoryService.getIconUrl(categoryId);
  }


  displayCategoryUpdateInterface(id: number) {
    this.router.navigate([this.path+'/update/',id]);
  }

  handleDeleteBtn(id: number) {
    this.itemId=id;
    this.showConfirmation = true;
  }
  handleConfirmation(confirmed: boolean) {
    if(confirmed){
      this.sharedService.deleteItem(this.path,this.itemId as number).subscribe(data=>{
        this.reloadItems.emit()
      })
    }
    this.showConfirmation = false;
  }

  getTableTile(column: string) : string {
    return column === 'isActive' ? 'statut' :
      column==='icon' ? '' :
          column === 'email' ? 'e-mail' :
            column==='roles' ? 'RÔLE' :
              column
  }

  getTableContent(item: any, column: string) {
    return column==='nom & prénom' ? this.sharedService.toTitleCase(item['firstName']+' '+item['lastName']) :
        column==='roles' ? item['roles'][0]?.name : item[column]
  }
}
