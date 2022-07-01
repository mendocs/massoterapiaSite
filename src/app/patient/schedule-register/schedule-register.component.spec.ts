import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScheduleRegisterComponent } from './schedule-register.component';

describe('ScheduleRegisterComponent', () => {
  let component: ScheduleRegisterComponent;
  let fixture: ComponentFixture<ScheduleRegisterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
