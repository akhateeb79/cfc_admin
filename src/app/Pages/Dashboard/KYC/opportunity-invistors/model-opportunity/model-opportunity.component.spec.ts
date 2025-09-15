import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelOpportunityComponent } from './model-opportunity.component';

describe('ModelOpportunityComponent', () => {
  let component: ModelOpportunityComponent;
  let fixture: ComponentFixture<ModelOpportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelOpportunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
