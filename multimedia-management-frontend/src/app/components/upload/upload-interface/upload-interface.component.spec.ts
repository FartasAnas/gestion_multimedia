import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UploadInterfaceComponent} from './upload-interface.component';

describe('UploadInterfaceComponent', () => {
  let component: UploadInterfaceComponent;
  let fixture: ComponentFixture<UploadInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
