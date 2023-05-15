import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdateRoleLayoutComponent} from './update-role-layout.component';

describe('UpdateRoleLayoutComponent', () => {
  let component: UpdateRoleLayoutComponent;
  let fixture: ComponentFixture<UpdateRoleLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRoleLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRoleLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
