import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientRegisterLineComponent } from './patient-register-line.component';

describe('PatientRegisterLineComponent', () => {
  let component: PatientRegisterLineComponent;
  let fixture: ComponentFixture<PatientRegisterLineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientRegisterLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRegisterLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
