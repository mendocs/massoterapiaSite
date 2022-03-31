import { Component, OnInit, ViewChild } from '@angular/core';
import { NgGoogleAnalyticsTracker } from "ng-google-analytics";

@Component({
  selector: 'app-therapist',
  templateUrl: './therapist.component.html',
  styleUrls: ['./therapist.component.scss']
})
export class TherapistComponent implements OnInit {

  carrouselModalShow : boolean = false;

  features: string[] = ["Formada no Senac", "Curso com 1200 horas", "Especializada em tratamento feminino", "Ambiente acolhedor"];

  imagesTitle : string[] = ["Espaço novo em folha, feito com carinho para você",
                            "Ambiente higienizado, confortável e aconchegante",
                            "Lenções confortáveis e trocados a cada cliente",
                            "Escolha e utilização de produtos de 1° linha de marcas renomadas, livres de parabenos e petrolatos"
                           ];

  imagesIndex : number[] = [0,3,6,8];

  activeSlideIndex = 0;
  @ViewChild('lgModal') modalTherapistCarrousel: any

  constructor(public ngAnalytics: NgGoogleAnalyticsTracker) { }

  ngOnInit(): void {}

  getherapistPics(imageIndex: number) : string {
    return `assets/images/therapist/clinic/foto${imageIndex}_thumb.jpg`;
  }

  showtherapistPics(imageIndex: number) : void {
    this.ngAnalytics.eventTracker("therapist", "ShowPics","PicChose_" + imageIndex,1);
    this.activeSlideIndex = this.imagesIndex[imageIndex];
    this.carrouselModalShow = true;
    this.modalTherapistCarrousel.show();
  }

}
