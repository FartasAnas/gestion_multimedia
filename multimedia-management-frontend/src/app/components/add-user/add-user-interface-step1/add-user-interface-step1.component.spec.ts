import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserInterfaceStep1Component } from './add-user-interface-step1.component';

describe('AddUserInterfaceStep1Component', () => {
  let component: AddUserInterfaceStep1Component;
  let fixture: ComponentFixture<AddUserInterfaceStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserInterfaceStep1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserInterfaceStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
