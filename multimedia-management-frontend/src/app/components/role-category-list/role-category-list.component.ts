import {Component, Input, OnInit} from '@angular/core';
import Category from "../../entities/Category";
import Role from "../../entities/Role";
import {CategoryService} from "../../services/category/category.service";
import Action from "../../entities/Action";
import Access from "../../entities/Access";

@Component({
  selector: 'app-role-category-list',
  templateUrl: './role-category-list.component.html',
  styleUrls: ['./role-category-list.component.css']
})
export class RoleCategoryListComponent implements OnInit{
  categories: Category[] = [];
  selectedActions: Action[] = [];
  @Input() roleObject?: Role;
  @Input() isDisabled = false;
  hoveredCategory?: Category;
  accessDefaultValue: Access = {
    isActive: false,
    read: false,
    write: false
  };
  hoveredAction = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.selectedActions = this.roleObject?.actions ? [...this.roleObject.actions] : [];
    this.loadCategories();
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      }
    );
  }

  handleHoveredCategory(category: Category): void {
    this.hoveredCategory = this.hoveredCategory !== category ? category : undefined;
  }

  isCategorySelected(category: Category): boolean {
    return (this.roleObject?.actions ?? []).some(action => action.category.id === category.id && (action.image.isActive || action.video.isActive || action.pictogram.isActive || action.document.isActive));
  }

  isActionSelected(category: Category, action: 'image' | 'video' | 'pictogram' | 'document'): boolean {
    return (this.roleObject?.actions ?? []).some(actionObject => actionObject.category.id === category.id && actionObject[action].isActive && (actionObject[action].read || actionObject[action].write));
  }

  handleSelectedCategories(status: boolean, category: Category): void {
    if (status) {
      const actionIndex = this.selectedActions.findIndex(action => action.category.id === category.id);
      const action = {
        id: actionIndex === -1 ? new Date().getTime() : this.selectedActions[actionIndex].id,
        category: category,
        image: Object.assign({}, {isActive: status,read: true, write: true}),
        video: Object.assign({}, {isActive: status,read: true, write: true}),
        pictogram: Object.assign({}, {isActive: status,read: true, write: true}),
        document: Object.assign({}, {isActive: status,read: true, write: true}),
      };
      this.roleObject?.actions.push(action);
    } else {
      this.roleObject!.actions = (this.roleObject?.actions ?? []).filter((action) => action.category.id !== category.id);
    }
  }

  handleChangeStatus(status: boolean, attributeName: 'imageAction'|'videoAction'|'pictogramAction'|'documentAction', category: Category): void {
    const actions = this.roleObject?.actions ?? [];
    let actionIndex = actions.findIndex(action => action.category.id === category.id);
    if (actionIndex === -1) {

      const action = {
        id: new Date().getTime(),
        category: category,
        image: Object.assign({}, this.accessDefaultValue),
        video: Object.assign({}, this.accessDefaultValue),
        pictogram: Object.assign({}, this.accessDefaultValue),
        document: Object.assign({}, this.accessDefaultValue),
      };
      actions.push(action);
      actionIndex=actions.findIndex(action => action.category.id === category.id)
    }
    switch (attributeName) {
      case 'imageAction':
        actions[actionIndex].image.isActive = status;
        actions[actionIndex].image.read = status;
        actions[actionIndex].image.write = status;
        break;
      case 'videoAction':
        actions[actionIndex].video.isActive = status;
        actions[actionIndex].image.read = status;
        actions[actionIndex].image.write = status;
        break;
      case 'pictogramAction':
        actions[actionIndex].pictogram.isActive = status;
        actions[actionIndex].image.read = status;
        actions[actionIndex].image.write = status;
        break;
      case 'documentAction':
        actions[actionIndex].document.isActive = status;
        actions[actionIndex].image.read = status;
        actions[actionIndex].image.write = status;
        break;
      default:
        break;
    }
    this.roleObject!.actions = actions.filter(action => action.image.isActive || action.video.isActive || action.pictogram.isActive || action.document.isActive || action.category.id !== category.id);
  }

  isAccessSelected(category: Category, action: 'image' | 'video' | 'pictogram' | 'document', access: 'read' | 'write'): boolean | undefined {
    return (this.roleObject?.actions ?? []).some(actionObject => actionObject.category.id === category.id && actionObject[action][access]);
  }

  handleHoveredAction(): string {
    return this.hoveredAction = this.hoveredAction !== 'image' ? 'image' : '';
  }

  private affectAccess(accessObject:Access, status: boolean, access: 'read' | 'write'): void {
    if (access === 'read') {
      accessObject.read = status;
      accessObject.isActive = status;
      accessObject.write = !status && accessObject.write? false:accessObject.write;
    } else if (access === 'write') {
      console.log(status)
      accessObject.write = status;
      accessObject.read = status ? status : accessObject.read;
      accessObject.isActive = status ? status : accessObject.isActive;
    }
  }

  handleChangeAccess(status: boolean, category: Category, action: 'image' | 'video' | 'pictogram' | 'document', access: 'read' | 'write'): void {
    const actions = this.roleObject?.actions ?? [];
    let actionIndex = actions.findIndex(action => action.category.id === category.id);
    if (actionIndex === -1) {
      const action = {
        id: new Date().getTime(),
        category: category,
        image: Object.assign({}, this.accessDefaultValue),
        video: Object.assign({}, this.accessDefaultValue),
        pictogram: Object.assign({}, this.accessDefaultValue),
        document: Object.assign({}, this.accessDefaultValue),
      };
      actions.push(action);
      actionIndex=actions.findIndex(action => action.category.id === category.id)
    }
    switch (action) {
      case 'image':
        this.affectAccess(actions[actionIndex].image, status, access);
        break;
      case 'video':
        this.affectAccess(actions[actionIndex].video, status, access);
        break;
      case 'pictogram':
        this.affectAccess(actions[actionIndex].pictogram, status, access);
        break;
      case 'document':
        this.affectAccess(actions[actionIndex].document, status, access);
        break;
      default:
        break;
    }
    this.roleObject!.actions = actions.filter(action => action.image.isActive || action.video.isActive || action.pictogram.isActive || action.document.isActive || action.category.id !== category.id);
  }
}
