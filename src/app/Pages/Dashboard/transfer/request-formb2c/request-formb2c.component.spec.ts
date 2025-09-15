import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestFormb2cComponent } from './request-formb2c.component';

describe('RequestFormb2cComponent', () => {
  let component: RequestFormb2cComponent;
  let fixture: ComponentFixture<RequestFormb2cComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestFormb2cComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestFormb2cComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
