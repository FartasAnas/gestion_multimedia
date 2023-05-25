import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordLayoutComponent } from './update-password-layout.component';

describe('UpdatePasswordLayoutComponent', () => {
  let component: UpdatePasswordLayoutComponent;
  let fixture: ComponentFixture<UpdatePasswordLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePasswordLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePasswordLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
