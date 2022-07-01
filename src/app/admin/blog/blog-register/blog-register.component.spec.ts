import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlogRegisterComponent } from './blog-register.component';

describe('BlogRegisterComponent', () => {
  let component: BlogRegisterComponent;
  let fixture: ComponentFixture<BlogRegisterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
