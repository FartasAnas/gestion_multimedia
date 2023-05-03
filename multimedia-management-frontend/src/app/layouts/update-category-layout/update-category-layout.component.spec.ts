import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategoryLayoutComponent } from './update-category-layout.component';

describe('UpdateCategoryLayoutComponent', () => {
  let component: UpdateCategoryLayoutComponent;
  let fixture: ComponentFixture<UpdateCategoryLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCategoryLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCategoryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
