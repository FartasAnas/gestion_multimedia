import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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
  updateSideBar=false;
  categoryObject?:Category
  categoryStatus:boolean=false
  @ViewChild('updateCategoryForm') updateCategoryForm!: NgForm;
  showConfirmation=false;
  constructor(private categoryService:CategoryService,private activatedRoute: ActivatedRoute,private router:Router) {
  }

  handleUpdateBtn() {
    if(this.isUpdating){
      const updatedCategory:Category={
        id:this.updateCategoryForm.value.id,
        label:this.updateCategoryForm.value.name,
        path:this.updateCategoryForm.value.path,
        description:this.updateCategoryForm.value.description,
        isActive:this.categoryStatus
      }
      this.categoryService.updateCategory(this.categoryObject?.id,updatedCategory).subscribe(
            ()=>{
              this.isUpdating=false
              this.updateSideBar=true;
            }
        )
    }
    this.isUpdating=true
    this.updateSideBar=false;
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
        name: this.categoryObject.label,
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

  handleConfirmation(confirmed: boolean) {
    if(confirmed){
      this.categoryService.deleteCategory((this.categoryObject as Category).id).subscribe(data=>{
        this.router.navigate(['/categories'])
      })
    }
    this.showConfirmation = false;
  }
}
