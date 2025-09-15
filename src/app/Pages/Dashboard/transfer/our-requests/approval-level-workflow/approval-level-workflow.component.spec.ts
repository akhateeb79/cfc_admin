import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalLevelWorkflowComponent } from './approval-level-workflow.component';

describe('ApprovalLevelWorkflowComponent', () => {
  let component: ApprovalLevelWorkflowComponent;
  let fixture: ComponentFixture<ApprovalLevelWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalLevelWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalLevelWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
