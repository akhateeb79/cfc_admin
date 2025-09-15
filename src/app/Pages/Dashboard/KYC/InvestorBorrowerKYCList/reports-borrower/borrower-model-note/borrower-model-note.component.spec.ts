import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowerModelNoteComponent } from './borrower-model-note.component';

describe('BorrowerModelNoteComponent', () => {
  let component: BorrowerModelNoteComponent;
  let fixture: ComponentFixture<BorrowerModelNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowerModelNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowerModelNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
