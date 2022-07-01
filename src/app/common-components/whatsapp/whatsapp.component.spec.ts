import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WhatsappComponent } from './whatsapp.component';

describe('WhatsappComponent', () => {
  let component: WhatsappComponent;
  let fixture: ComponentFixture<WhatsappComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
