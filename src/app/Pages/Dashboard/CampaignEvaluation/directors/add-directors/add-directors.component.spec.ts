import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDirectorsComponent } from './add-directors.component';

describe('AddDirectorsComponent', () => {
  let component: AddDirectorsComponent;
  let fixture: ComponentFixture<AddDirectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDirectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDirectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
