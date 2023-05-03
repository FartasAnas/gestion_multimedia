import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private categoryIdSource = new BehaviorSubject<number | undefined>(undefined);
  categoryId$ = this.categoryIdSource.asObservable();

  setCategoryId(categoryId: number | undefined): void {
    this.categoryIdSource.next(categoryId);
  }
}
