import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvsetorAgreementComponent } from './invsetor-agreement.component';

describe('InvsetorAgreementComponent', () => {
  let component: InvsetorAgreementComponent;
  let fixture: ComponentFixture<InvsetorAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvsetorAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvsetorAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
