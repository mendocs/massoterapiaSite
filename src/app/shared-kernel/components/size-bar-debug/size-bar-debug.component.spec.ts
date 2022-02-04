import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeBarDebugComponent } from './size-bar-debug.component';

describe('SizeBarDebugComponent', () => {
  let component: SizeBarDebugComponent;
  let fixture: ComponentFixture<SizeBarDebugComponent>;

  beforeEach(async(() => {
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
