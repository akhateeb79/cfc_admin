import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpVerificationDialogComponent } from './otp-verification-dialog.component';

describe('OtpVerificationDialogComponent', () => {
  let component: OtpVerificationDialogComponent;
  let fixture: ComponentFixture<OtpVerificationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpVerificationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpVerificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
