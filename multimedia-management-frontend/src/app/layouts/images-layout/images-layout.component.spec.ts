import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesLayoutComponent } from './images-layout.component';

describe('ImagesLayoutComponent', () => {
  let component: ImagesLayoutComponent;
  let fixture: ComponentFixture<ImagesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
