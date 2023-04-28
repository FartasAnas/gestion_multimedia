import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FileDetailsLayoutComponent} from './file-details-layout.component';

describe('FileDetailsLayoutComponent', () => {
  let component: FileDetailsLayoutComponent;
  let fixture: ComponentFixture<FileDetailsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDetailsLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileDetailsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
