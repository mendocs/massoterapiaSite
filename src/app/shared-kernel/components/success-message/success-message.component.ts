import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from '../../tools/utils.service';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.scss']
})
export class SuccessMessageComponent implements OnInit {

  @Input() recordSuccess: boolean = true;
  dateSaved : Date;

  constructor(private utilsService : UtilsService) { }

  ngOnInit(): void {
  }


  ngOnChanges(): void {
    if (!this.recordSuccess)
      this.dateSaved = null;
  }


  getTimeNow() : string {
    if (!this.dateSaved)
      this.dateSaved = new Date( Date.now());

    return this.utilsService.getDateFormated(this.dateSaved);
  }

  onClosed(dismissedAlert: any): void {
    this.recordSuccess = false;
    this.dateSaved = null;
  }



}
