import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementLayoutComponent } from './user-management-layout.component';

describe('UserManagementLayoutComponent', () => {
  let component: UserManagementLayoutComponent;
  let fixture: ComponentFixture<UserManagementLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserManagementLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
