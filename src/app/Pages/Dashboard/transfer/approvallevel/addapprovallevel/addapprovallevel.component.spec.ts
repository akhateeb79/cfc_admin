import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddapprovallevelComponent } from './addapprovallevel.component';

describe('AddapprovallevelComponent', () => {
  let component: AddapprovallevelComponent;
  let fixture: ComponentFixture<AddapprovallevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddapprovallevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddapprovallevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
