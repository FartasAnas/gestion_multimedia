import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FileInterfaceComponent} from './file-interface.component';

describe('FileInterfaceComponent', () => {
  let component: FileInterfaceComponent;
  let fixture: ComponentFixture<FileInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
