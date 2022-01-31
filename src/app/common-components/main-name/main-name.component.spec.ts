import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNameComponent } from './main-name.component';

describe('MainNameComponent', () => {
  let component: MainNameComponent;
  let fixture: ComponentFixture<MainNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
