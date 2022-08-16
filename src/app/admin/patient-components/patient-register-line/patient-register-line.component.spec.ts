import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRegisterLineComponent } from './patient-register-line.component';

describe('PatientRegisterLineComponent', () => {
  let component: PatientRegisterLineComponent;
  let fixture: ComponentFixture<PatientRegisterLineComponent>;

  beforeEach(async(() => {
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
