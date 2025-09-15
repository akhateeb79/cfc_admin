import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurRequestsComponent } from './our-requests.component';

describe('OurRequestsComponent', () => {
  let component: OurRequestsComponent;
  let fixture: ComponentFixture<OurRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
