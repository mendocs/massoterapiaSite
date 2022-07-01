import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PackageMenuComponent } from './package-menu.component';

describe('PackageMenuComponent', () => {
  let component: PackageMenuComponent;
  let fixture: ComponentFixture<PackageMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
