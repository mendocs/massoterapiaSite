import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from '../../tools/utils.service';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.scss']
})
export class SuccessMessageComponent implements OnInit {

  @Input() recordSuccess: boolean = true;

  constructor(private utilsService : UtilsService) { }

  ngOnInit(): void {
  }

  getTimeNow() : string {
    return this.utilsService.getDateFormated(new Date( Date.now()));
  }

  onClosed(dismissedAlert: any): void {
    this.recordSuccess = false;
  }

}
