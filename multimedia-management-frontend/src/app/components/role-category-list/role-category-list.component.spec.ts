import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleCategoryListComponent } from './role-category-list.component';

describe('RoleCategoryListComponent', () => {
  let component: RoleCategoryListComponent;
  let fixture: ComponentFixture<RoleCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleCategoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
