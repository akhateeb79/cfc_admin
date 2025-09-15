import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundProcessingComponent } from './fund-processing.component';

describe('FundProcessingComponent', () => {
  let component: FundProcessingComponent;
  let fixture: ComponentFixture<FundProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
