import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictosLayoutComponent } from './pictos-layout.component';

describe('PictosLayoutComponent', () => {
  let component: PictosLayoutComponent;
  let fixture: ComponentFixture<PictosLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictosLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictosLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
