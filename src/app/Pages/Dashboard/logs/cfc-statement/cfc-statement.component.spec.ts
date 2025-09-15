import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfcStatementComponent } from './cfc-statement.component';

describe('CfcStatementComponent', () => {
  let component: CfcStatementComponent;
  let fixture: ComponentFixture<CfcStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfcStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfcStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
