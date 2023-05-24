import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserInterfaceStep3Component } from './add-user-interface-step3.component';

describe('AddUserInterfaceStep3Component', () => {
  let component: AddUserInterfaceStep3Component;
  let fixture: ComponentFixture<AddUserInterfaceStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserInterfaceStep3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserInterfaceStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
