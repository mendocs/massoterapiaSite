import { Component, OnInit } from '@angular/core';
import { therapy } from 'src/app/therapy/models/therapy-model';
import { TherapyDataService } from 'src/app/therapy/services/therapy-data.service';
import { PublicSiteService } from '../public-site.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  therapiesFile = {
		next: (_therapies : therapy[]) => this.populateControlsFromTherapies(_therapies),
		error: err => console.log(err),
		complete: () => console.log(''),
	  };

  therapies : therapy[];

  constructor(private therapyDataService : TherapyDataService, private publicSiteService: PublicSiteService) { }

  ngOnInit(): void {
    this.therapyDataService.getAllTherapies().subscribe(this.therapiesFile);
  }

  populateControlsFromTherapies(_therapies: therapy[])
  {
    this.therapies = _therapies;
  }

  navigateTo(navigateId: string)
  {
      this.publicSiteService.SetTherapy(navigateId);
  }

}
