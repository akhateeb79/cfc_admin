import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferB2BComponent } from './transferB2B.component';

describe('TransferB2BComponent', () => {
  let component: TransferB2BComponent;
  let fixture: ComponentFixture<TransferB2BComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferB2BComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferB2BComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
