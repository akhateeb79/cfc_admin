import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesMatrixComponent } from './fees-matrix.component';

describe('FeesMatrixComponent', () => {
  let component: FeesMatrixComponent;
  let fixture: ComponentFixture<FeesMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
