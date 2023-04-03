import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsSelectorComponent } from './keywords-selector.component';

describe('KeywordsSelectorComponent', () => {
  let component: KeywordsSelectorComponent;
  let fixture: ComponentFixture<KeywordsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeywordsSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeywordsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
