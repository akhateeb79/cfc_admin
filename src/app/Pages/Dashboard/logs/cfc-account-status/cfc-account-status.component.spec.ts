import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfcAccountStatusComponent } from './cfc-account-status.component';

describe('CfcAccountStatusComponent', () => {
  let component: CfcAccountStatusComponent;
  let fixture: ComponentFixture<CfcAccountStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfcAccountStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfcAccountStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
