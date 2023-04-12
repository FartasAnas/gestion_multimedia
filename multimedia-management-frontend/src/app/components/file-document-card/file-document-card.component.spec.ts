import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDocumentCardComponent } from './file-document-card.component';

describe('FileDocumentCardComponent', () => {
  let component: FileDocumentCardComponent;
  let fixture: ComponentFixture<FileDocumentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDocumentCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileDocumentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
