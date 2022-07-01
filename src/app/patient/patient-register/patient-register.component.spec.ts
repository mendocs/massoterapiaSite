import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientRegisterComponent } from './patient-register.component';

describe('PatientRegisterComponent', () => {
  let component: PatientRegisterComponent;
  let fixture: ComponentFixture<PatientRegisterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
