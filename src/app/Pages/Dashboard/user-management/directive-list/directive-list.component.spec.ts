import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectiveListComponent } from './directive-list.component';

describe('DirectiveListComponent', () => {
  let component: DirectiveListComponent;
  let fixture: ComponentFixture<DirectiveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectiveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
