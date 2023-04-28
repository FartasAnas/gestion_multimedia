import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UploadInterfaceStep2Component} from './upload-interface-step2.component';

describe('UploadInterfaceStep2Component', () => {
  let component: UploadInterfaceStep2Component;
  let fixture: ComponentFixture<UploadInterfaceStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadInterfaceStep2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadInterfaceStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
