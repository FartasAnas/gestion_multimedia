import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import Category from "../../entities/Category";
import {NgForm} from "@angular/forms";
import {CategoryService} from "../../services/category/category.service";

@Component({
  selector: 'app-update-category-layout',
  templateUrl: './update-category-layout.component.html',
  styleUrls: ['./update-category-layout.component.css']
})
export class UpdateCategoryLayoutComponent implements OnInit{
  btnText = 'Modifier la catégorie';
  btnIconUrl = 'assets/PencilSimpleLineWhite.svg';
  isUpdating:boolean=false
  categoryObject?:Category
  categoryStatus:boolean=false
  @ViewChild('updateCategoryForm') updateCategoryForm!: NgForm;
  constructor(private categoryService:CategoryService,private activatedRoute: ActivatedRoute) {
  }

  handleUpdateBtn() {
    if(this.isUpdating){
      const updatedCategory:Category={
        id:this.updateCategoryForm.value.id,
        name:this.updateCategoryForm.value.name,
        path:this.updateCategoryForm.value.path,
        description:this.updateCategoryForm.value.description,
        isActive:this.categoryStatus
      }
      console.log(updatedCategory)
      this.categoryService.updateCategory(this.categoryObject?.id,updatedCategory).subscribe(
            ()=>{
                this.isUpdating=false
                window.location.reload();
            }
        )
    }
    this.isUpdating=true

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getCategory(+params['id']);
    });
  }

  private getCategory(id: number) {
    this.categoryService.getCategoryById(id).subscribe(
      category=>{
        this.categoryObject=category;
        this.categoryStatus=category.isActive;
      }
    )
  }

  handleCancelBtn() {
    this.isUpdating=false
    if (this.categoryObject) {
      this.updateCategoryForm.reset({
        name: this.categoryObject.name,
        path: this.categoryObject.path,
        description: this.categoryObject.description
      });
      this.categoryStatus=this.categoryObject.isActive;
    }
  }

  handleChangeStatus(status: boolean) {
    if(this.isUpdating){
      this.categoryStatus=status;
    }
  }
}
