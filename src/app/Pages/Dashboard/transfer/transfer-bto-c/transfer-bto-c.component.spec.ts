import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferBtoCComponent } from './transfer-bto-c.component';

describe('TransferBtoCComponent', () => {
  let component: TransferBtoCComponent;
  let fixture: ComponentFixture<TransferBtoCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferBtoCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferBtoCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
