import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsDetailsComponent } from './programs-details.component';

describe('ProgramsDetailsComponent', () => {
  let component: ProgramsDetailsComponent;
  let fixture: ComponentFixture<ProgramsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
