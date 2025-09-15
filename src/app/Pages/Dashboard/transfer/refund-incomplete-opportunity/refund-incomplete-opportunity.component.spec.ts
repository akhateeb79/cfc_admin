import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundIncompleteOpportunityComponent } from './refund-incomplete-opportunity.component';

describe('RefundIncompleteOpportunityComponent', () => {
  let component: RefundIncompleteOpportunityComponent;
  let fixture: ComponentFixture<RefundIncompleteOpportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundIncompleteOpportunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundIncompleteOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
