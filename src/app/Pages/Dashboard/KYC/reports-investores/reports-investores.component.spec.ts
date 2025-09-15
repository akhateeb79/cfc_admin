import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsInvestoresComponent } from './reports-investores.component';

describe('ReportsInvestoresComponent', () => {
  let component: ReportsInvestoresComponent;
  let fixture: ComponentFixture<ReportsInvestoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsInvestoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsInvestoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
