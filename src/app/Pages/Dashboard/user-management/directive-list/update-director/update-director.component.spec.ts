import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDirectorComponent } from './update-director.component';

describe('UpdateDirectorComponent', () => {
  let component: UpdateDirectorComponent;
  let fixture: ComponentFixture<UpdateDirectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDirectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
