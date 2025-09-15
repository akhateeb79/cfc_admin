import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDirectorComponent } from './delete-director.component';

describe('DeleteDirectorComponent', () => {
  let component: DeleteDirectorComponent;
  let fixture: ComponentFixture<DeleteDirectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDirectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
