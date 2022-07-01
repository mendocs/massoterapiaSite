import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InputErrorMsgComponent } from './input-error-msg.component';

describe('InputErrorMsgComponent', () => {
  let component: InputErrorMsgComponent;
  let fixture: ComponentFixture<InputErrorMsgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InputErrorMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputErrorMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
