import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewUnavailableComponent } from './preview-unavailable.component';

describe('PreviewUnavailableComponent', () => {
  let component: PreviewUnavailableComponent;
  let fixture: ComponentFixture<PreviewUnavailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewUnavailableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewUnavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
