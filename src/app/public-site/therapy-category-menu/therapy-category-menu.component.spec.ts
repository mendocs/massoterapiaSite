import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapyCategoryMenuComponent } from './therapy-category-menu.component';

describe('TherapyCategoryMenuComponent', () => {
  let component: TherapyCategoryMenuComponent;
  let fixture: ComponentFixture<TherapyCategoryMenuComponent>;

  beforeEach(async(() => {
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
