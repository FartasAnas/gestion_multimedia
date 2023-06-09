import {Injectable} from '@angular/core';
import {Resolve} from "@angular/router";
import Category from "../../entities/Category";
import {CategoryService} from "../../services/category/category.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryResolverService implements Resolve<Category[]> {
  constructor(private categoryService: CategoryService) {}

  resolve() {
    return this.categoryService.getCategories().pipe(
      map((categories) => categories.filter((category) => category.isActive))
    );
  }
}
