import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileVideoCardComponent } from './file-video-card.component';

describe('FileVideoCardComponent', () => {
  let component: FileVideoCardComponent;
  let fixture: ComponentFixture<FileVideoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileVideoCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileVideoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
