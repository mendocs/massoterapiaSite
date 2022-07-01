import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SizeBarDebugComponent } from './size-bar-debug.component';

describe('SizeBarDebugComponent', () => {
  let component: SizeBarDebugComponent;
  let fixture: ComponentFixture<SizeBarDebugComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeBarDebugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeBarDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
