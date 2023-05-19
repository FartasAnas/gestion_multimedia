import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateRoleLayoutComponent} from './create-role-layout.component';

describe('CreateRoleLayoutComponent', () => {
  let component: CreateRoleLayoutComponent;
  let fixture: ComponentFixture<CreateRoleLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRoleLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRoleLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
