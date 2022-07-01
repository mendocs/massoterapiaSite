import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BigCarouselComponent } from './big-carousel.component';

describe('BigCarouselComponent', () => {
  let component: BigCarouselComponent;
  let fixture: ComponentFixture<BigCarouselComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BigCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
