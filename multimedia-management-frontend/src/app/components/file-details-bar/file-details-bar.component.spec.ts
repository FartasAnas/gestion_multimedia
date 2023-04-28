import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FileDetailsBarComponent} from './file-details-bar.component';

describe('FileDetailsBarComponent', () => {
  let component: FileDetailsBarComponent;
  let fixture: ComponentFixture<FileDetailsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDetailsBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileDetailsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
