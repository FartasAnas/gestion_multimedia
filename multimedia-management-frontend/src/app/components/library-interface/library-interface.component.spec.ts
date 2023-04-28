import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LibraryInterfaceComponent} from './library-interface.component';

describe('LibraryInterfaceComponent', () => {
  let component: LibraryInterfaceComponent;
  let fixture: ComponentFixture<LibraryInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
