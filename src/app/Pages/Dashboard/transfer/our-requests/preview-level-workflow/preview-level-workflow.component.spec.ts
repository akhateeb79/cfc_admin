import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewLevelWorkflowComponent } from './preview-level-workflow.component';

describe('PreviewLevelWorkflowComponent', () => {
  let component: PreviewLevelWorkflowComponent;
  let fixture: ComponentFixture<PreviewLevelWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewLevelWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewLevelWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
