import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsBorrowerComponent } from './reports-borrower.component';

describe('ReportsBorrowerComponent', () => {
  let component: ReportsBorrowerComponent;
  let fixture: ComponentFixture<ReportsBorrowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsBorrowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsBorrowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
