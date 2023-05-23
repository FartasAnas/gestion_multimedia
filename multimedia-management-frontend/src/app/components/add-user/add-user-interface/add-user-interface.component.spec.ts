import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserInterfaceComponent } from './add-user-interface.component';

describe('AddUserInterfaceComponent', () => {
  let component: AddUserInterfaceComponent;
  let fixture: ComponentFixture<AddUserInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
