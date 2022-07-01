import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TherapySectionComponent } from './therapy-section.component';

describe('TherapySectionComponent', () => {
  let component: TherapySectionComponent;
  let fixture: ComponentFixture<TherapySectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TherapySectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
