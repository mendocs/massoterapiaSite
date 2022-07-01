import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WhatsappLinkMessageScheduleTemplateComponent } from './whatsapp-link-message-schedule-template.component';

describe('WhatsappLinkMessageScheduleTemplateComponent', () => {
  let component: WhatsappLinkMessageScheduleTemplateComponent;
  let fixture: ComponentFixture<WhatsappLinkMessageScheduleTemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatsappLinkMessageScheduleTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsappLinkMessageScheduleTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
