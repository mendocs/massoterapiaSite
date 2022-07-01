import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TherapyCategoryMenuComponent } from './therapy-category-menu.component';

describe('TherapyCategoryMenuComponent', () => {
  let component: TherapyCategoryMenuComponent;
  let fixture: ComponentFixture<TherapyCategoryMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TherapyCategoryMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapyCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
