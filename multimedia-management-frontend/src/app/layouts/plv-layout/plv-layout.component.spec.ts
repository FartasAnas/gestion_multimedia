import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlvLayoutComponent } from './plv-layout.component';

describe('PlvLayoutComponent', () => {
  let component: PlvLayoutComponent;
  let fixture: ComponentFixture<PlvLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlvLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlvLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
