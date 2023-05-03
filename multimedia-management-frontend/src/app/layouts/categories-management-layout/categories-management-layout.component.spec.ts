import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CategoriesManagementLayoutComponent} from './categories-management-layout.component';

describe('CategoriesManagementLayoutComponent', () => {
  let component: CategoriesManagementLayoutComponent;
  let fixture: ComponentFixture<CategoriesManagementLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesManagementLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesManagementLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
