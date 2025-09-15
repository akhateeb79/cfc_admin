import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRequestFormb2PrtnerComponent } from './app-request-formb2-prtner.component';

describe('AppRequestFormb2PrtnerComponent', () => {
  let component: AppRequestFormb2PrtnerComponent;
  let fixture: ComponentFixture<AppRequestFormb2PrtnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppRequestFormb2PrtnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRequestFormb2PrtnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
