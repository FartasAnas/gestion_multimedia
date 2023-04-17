import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampagnesLayoutComponent } from './campagnes-layout.component';

describe('CampagnesLayoutComponent', () => {
  let component: CampagnesLayoutComponent;
  let fixture: ComponentFixture<CampagnesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampagnesLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampagnesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
