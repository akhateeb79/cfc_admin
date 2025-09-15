import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransSetupComponent } from './trans-setup.component';

describe('TransSetupComponent', () => {
  let component: TransSetupComponent;
  let fixture: ComponentFixture<TransSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
