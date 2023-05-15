import {Component, Input, OnInit} from '@angular/core';
import Category from "../../entities/Category";
import Role from "../../entities/Role";
import {RoleService} from "../../services/role/role.service";
import {CategoryService} from "../../services/category/category.service";
import Action from "../../entities/Action";

@Component({
  selector: 'app-role-category-list',
  templateUrl: './role-category-list.component.html',
  styleUrls: ['./role-category-list.component.css']
})
export class RoleCategoryListComponent implements OnInit{
  categories: Category[]=[];
  selectedActions:Action[]=[];
  @Input() roleObject?:Role;
  @Input() isDisabled: boolean=false;
  hoveredCategory?:Category;
  constructor(private categoryService:CategoryService) {
  }
  ngOnInit(): void {
    if(this.roleObject){
        this.selectedActions=Array.from(this.roleObject.actions);
    }
    this.loadCategories();
  }
  private loadCategories(){
    this.categoryService.getCategories().subscribe(
      (categories)=>{
        this.categories=categories;
      }
    )
  }
  handleHoveredCategory(category:Category) {
    this.hoveredCategory=this.hoveredCategory!==category?category:undefined;
  }
  isCategorySelected(category: Category) {
    if((this.roleObject as Role).actions.find(action=>action.category.id===category.id)){
      return true
    }
    return false
  }
  isActionSelected(category: Category, action: 'image' | 'video' | 'pictogram' | 'document') {
    if((this.roleObject as Role).actions.find(actionObject=>actionObject.category.id===category.id && actionObject[action])){
      return true
    }
    return false
  }
  handleSelectedCategories(status: boolean, category: Category) {
    if (status) {
      const actionIndex=this.selectedActions.findIndex(action=>action.category.id===category.id);
      const action = {
        id: actionIndex===-1?new Date().getTime():this.selectedActions[actionIndex].id,
        category: category,
        image: true,
        video: true,
        pictogram: true,
        document: true
      };
      (this.roleObject as Role).actions.push(action);
    } else {
      (this.roleObject as Role).actions = (this.roleObject as Role).actions.filter(
        (action) => action.category.id !== category.id
      );
    }
  }
  handleChangeStatus(status: boolean, attributeName: 'imageAction'|'videoAction'|'pictogramAction'|'documentAction',category:Category) {
    if(!((this.roleObject as Role).actions.find(action=>action.category.id===category.id)) && (this.roleObject as Role).actions.length===0){
      const action = {
        id: new Date().getTime(),
        category: category,
        image: false,
        video: false,
        pictogram: false,
        document: false
      };
      (this.roleObject as Role).actions.push(action);
    }
    const actionIndex=(this.roleObject as Role).actions.findIndex(action=>action.category.id===category.id);
    switch (attributeName) {
      case 'imageAction':
        (this.roleObject as Role).actions[actionIndex].image = status;
        break;
      case 'videoAction':
        (this.roleObject as Role).actions[actionIndex].video = status;
        break;
      case 'pictogramAction':
        (this.roleObject as Role).actions[actionIndex].pictogram = status;
        break;
      case 'documentAction':
        (this.roleObject as Role).actions[actionIndex].document = status;
        break;
      default:
        break;
    }
  }

}
