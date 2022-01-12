import { HttpErrorResponse } from '@angular/common/http';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { therapy } from 'src/app/therapy/models/therapy-model';
import { therapyCategory } from 'src/app/therapy/models/therapy-category-model';
import { TherapyDataService } from 'src/app/therapy/services/therapy-data.service';
import { PublicSiteService } from '../public-site.service';
import { BaseComponent } from 'src/app/shared-kernel/components/base-component';
import { pack } from 'src/app/therapy/models/pack-model';

@Component({
  selector: 'app-tag-cloud',
  templateUrl: './tag-cloud.component.html',
  styleUrls: ['./tag-cloud.component.scss']
})
export class TagCloudComponent extends BaseComponent implements OnInit {

    ButtonsInitialized : boolean= false;


    currentTerapia :string = "";

    therapies : therapyCategory[] ;
    packs : pack[] ;

    protocolsFile = {
    next: (_therapies : therapyCategory[]) => this.populateControlsFromTherapies(_therapies),
    error: err => this.getError(err),
    complete: () => {},
    };

    packsFile = {
      next: (_packs : pack[]) => this.populateControlsFromPacks(_packs),
      error: err => this.getError(err),
      complete: () => {},
      };

    getAllTherapiesSubscription$ : Subscription;
    getAllPacksSubscription$ : Subscription;

  constructor(private publicSiteService: PublicSiteService,
              private therapyDataService : TherapyDataService,
              private router: Router
              ) { super();  }

  logClicked(therapyId: string){
    this.publicSiteService.SetTherapy(therapyId);
  }


  ngOnInit(): void {

    this.getAllTherapiesSubscription$ =  this.therapyDataService.getAlltherapyCategories().subscribe(this.protocolsFile);

    this.getAllPacksSubscription$ =  this.therapyDataService.getAllPacks().subscribe(this.packsFile);

  }

  ngOnDestroy() : void{
    this.getAllTherapiesSubscription$?.unsubscribe();
    this.getAllPacksSubscription$?.unsubscribe();
  }


  ngAfterViewChecked_(): void {

    if(document.getElementById("divpai").children.length>1 && !this.ButtonsInitialized){ //element loaded
      this.ButtonsInitialized = true;

     var TimeoutMenu = setTimeout( function AnimateMenu(){

        if (!document.getElementById("divpai"))
        {
          clearInterval(TimeoutMenu);
          return;
        }
          for (let i = 0; i < document.getElementById("divpai").children.length; i++) {

            const element = document.getElementById("divpai").children[i];

            setTimeout( function()
            {
              //const elemtChildren = element.children[0].children[0].children[2];
              const elemtChildren = element.children[0].children[1];//.children[2];
              setTimeout(
                function EnableClass(){
                  elemtChildren.classList.toggle("textBigger");
                  setTimeout( function DisabelClass(){ elemtChildren.classList.toggle("textBigger")},180);
                }
                , 1000 );
            }
            ,1000 + i*155);
          }
          setTimeout(AnimateMenu, 5000)
      }, 5000) ;
    }
  }


  populateControlsFromTherapies(_therapies: therapyCategory[])
  {
    this.therapies = _therapies;
    //this.publicSiteService.SetTherapy("Modeladora",true);
  }

  populateControlsFromPacks(_packs : pack[])
  {
    console.log(_packs);
    this.packs = _packs;
  }

}
