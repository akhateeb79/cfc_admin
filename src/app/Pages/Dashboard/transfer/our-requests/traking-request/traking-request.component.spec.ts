import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrakingRequestComponent } from './traking-request.component';

describe('TrakingRequestComponent', () => {
  let component: TrakingRequestComponent;
  let fixture: ComponentFixture<TrakingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrakingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrakingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
