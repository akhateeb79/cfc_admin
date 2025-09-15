import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityInvistorsComponent } from './opportunity-invistors.component';

describe('OpportunityInvistorsComponent', () => {
  let component: OpportunityInvistorsComponent;
  let fixture: ComponentFixture<OpportunityInvistorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityInvistorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityInvistorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
