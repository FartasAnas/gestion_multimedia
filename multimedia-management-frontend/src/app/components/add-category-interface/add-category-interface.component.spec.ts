import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryInterfaceComponent } from './add-category-interface.component';

describe('AddCategoryInterfaceComponent', () => {
  let component: AddCategoryInterfaceComponent;
  let fixture: ComponentFixture<AddCategoryInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCategoryInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCategoryInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
