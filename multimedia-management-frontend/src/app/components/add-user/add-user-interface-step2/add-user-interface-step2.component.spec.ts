import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserInterfaceStep2Component } from './add-user-interface-step2.component';

describe('AddUserInterfaceStep2Component', () => {
  let component: AddUserInterfaceStep2Component;
  let fixture: ComponentFixture<AddUserInterfaceStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserInterfaceStep2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserInterfaceStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
