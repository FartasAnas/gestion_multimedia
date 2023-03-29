import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadInterfaceStep1Component } from './upload-interface-step1.component';

describe('UploadInterfaceStep1Component', () => {
  let component: UploadInterfaceStep1Component;
  let fixture: ComponentFixture<UploadInterfaceStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadInterfaceStep1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadInterfaceStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
