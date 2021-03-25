import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRegisterLogoTopComponent } from './patient-register-logo-top.component';

describe('PatientRegisterLogoTopComponent', () => {
  let component: PatientRegisterLogoTopComponent;
  let fixture: ComponentFixture<PatientRegisterLogoTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientRegisterLogoTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRegisterLogoTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
