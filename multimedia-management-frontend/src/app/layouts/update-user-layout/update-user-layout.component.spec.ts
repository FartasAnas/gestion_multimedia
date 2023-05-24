import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserLayoutComponent } from './update-user-layout.component';

describe('UpdateUserLayoutComponent', () => {
  let component: UpdateUserLayoutComponent;
  let fixture: ComponentFixture<UpdateUserLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
