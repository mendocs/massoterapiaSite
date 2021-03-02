import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, ElementRef, OnInit } from '@angular/core';
import { therapy } from 'src/app/therapy/models/therapy-model';
import { TherapyDataService } from 'src/app/therapy/services/therapy-data.service';
import { PublicSiteService } from '../public-site.service';

@Component({
  selector: 'app-tag-cloud',
  templateUrl: './tag-cloud.component.html',
  styleUrls: ['./tag-cloud.component.scss']
})
export class TagCloudComponent implements OnInit {

    ButtonsInitialized : boolean= false;


    currentTerapia :string = "";

    therapies : therapy[] ;

    therapiesFile = {
    next: (_therapies : therapy[]) => this.populateControlsFromTherapies(_therapies),
    error: err => console.log(err),
    complete: () => console.log('Completo myObserverIP'),
    };

  constructor(private publicSiteService: PublicSiteService,private therapyDataService : TherapyDataService) {  }

  logClicked(therapyId: string){
    this.publicSiteService.SetTherapy(therapyId);
  }


  ngOnInit(): void {

    this.therapyDataService.getAllTherapies().subscribe(this.therapiesFile);

  }


  ngAfterViewChecked(): void {

    if(document.getElementById("divpai").children.length>1 && !this.ButtonsInitialized){ //element loaded
      this.ButtonsInitialized = true;

      setTimeout( function AnimateMenu(){

          for (let i = 0; i < document.getElementById("divpai").children.length; i++) {

            const element = document.getElementById("divpai").children[i];

            setTimeout( function()
            {
              const elemtChildren = element.children[0].children[0].children[2];
              setTimeout(
                function EnableClass(){
                  elemtChildren.classList.toggle("textBigger");
                  setTimeout( function DisabelClass(){ elemtChildren.classList.toggle("textBigger")},180);
                  //; setTimeout(EnableClass, 20000)
                }
                , 1000 );
            }
            ,1000 + i*155);
          }
          setTimeout(AnimateMenu, 5000)
      }, 5000) ;



    }
  }


  populateControlsFromTherapies(_therapies: therapy[])
  {
    this.therapies = _therapies;
    this.publicSiteService.SetTherapy(this.therapies[0].id,true);
  }

}
