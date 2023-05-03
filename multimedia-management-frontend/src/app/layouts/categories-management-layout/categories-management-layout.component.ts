import {Component, OnInit} from '@angular/core';
import Category from "../../entities/Category";
import {CategoryService} from "../../services/category/category.service";

@Component({
  selector: 'app-categories-management-layout',
  templateUrl: './categories-management-layout.component.html',
  styleUrls: ['./categories-management-layout.component.css']
})
export class CategoriesManagementLayoutComponent implements OnInit{
  categories:Category[]=[];
  columns: string[] = [];
  showAddCategoryInterface: boolean=false;
  readonly hostname = window.location.hostname;
  constructor(private categoryService:CategoryService) {
  }
  ngOnInit(): void {
    this.loadCategories();
  }
  private loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
        this.columns = Object.keys(this.categories[0]);
        console.log(this.categories)
      }
    )
  }
  handleCloseUploadEvent(showInterface: boolean) {
    this.showAddCategoryInterface = showInterface;
  }

  onFileUploaded() {
    this.loadCategories();
    window.location.reload()
  }
}
