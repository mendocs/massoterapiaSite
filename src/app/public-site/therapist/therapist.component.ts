import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-therapist',
  templateUrl: './therapist.component.html',
  styleUrls: ['./therapist.component.scss']
})
export class TherapistComponent implements OnInit {



  features: string[] = ["Formada no Senac", "Curso com 1200 horas", "Especializada em tratamento feminino", "Ambiente acolhedor"];

  imagesTitle : string[] = ["Espaço novo em folha, feito com carinho para você",
                            "Ambiente higienizado, confortável e aconchegante",
                            "Lenções confortáveis e trocados a cada cliente",
                            "Escolh e utilização de produtos de 1 linha de marccas renomadas, livres de parabenos e petrolatos"
                           ];

  imagesIndex : number[] = [0,3,6,8];

  activeSlideIndex = 0;
  @ViewChild('lgModal') modalTherapistCarrousel: any

  constructor() { }

  ngOnInit(): void {
  }

  getherapistPics(imageIndex: number)
  {
    return `assets/images/therapist/clinic/foto${imageIndex}_thumb.jpg`;
  }

  showtherapistPics(imageIndex: number)
  {
    this.activeSlideIndex = this.imagesIndex[imageIndex];
    this.modalTherapistCarrousel.show();
  }

}
