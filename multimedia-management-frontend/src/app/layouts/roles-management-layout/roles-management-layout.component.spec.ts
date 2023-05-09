import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesManagementLayoutComponent } from './roles-management-layout.component';

describe('RolesManagementLayoutComponent', () => {
  let component: RolesManagementLayoutComponent;
  let fixture: ComponentFixture<RolesManagementLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesManagementLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesManagementLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
