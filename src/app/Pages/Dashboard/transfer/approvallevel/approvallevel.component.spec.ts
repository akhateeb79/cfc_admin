import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovallevelComponent } from './approvallevel.component';

describe('ApprovallevelComponent', () => {
  let component: ApprovallevelComponent;
  let fixture: ComponentFixture<ApprovallevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovallevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovallevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
