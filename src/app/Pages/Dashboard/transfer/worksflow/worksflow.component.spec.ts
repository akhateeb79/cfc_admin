import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksflowComponent } from './worksflow.component';

describe('WorksflowComponent', () => {
  let component: WorksflowComponent;
  let fixture: ComponentFixture<WorksflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
