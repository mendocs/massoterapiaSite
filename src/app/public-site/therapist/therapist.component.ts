import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-therapist',
  templateUrl: './therapist.component.html',
  styleUrls: ['./therapist.component.scss']
})
export class TherapistComponent implements OnInit {



  features: string[] = ["Formada no Senac", "Curso com 1200 horas", "Especializada em tratamento feminino", "Ambiente acolhedor"];

  activeSlideIndex = 0;
  @ViewChild('lgModal') modalTherapistCarrousel: any

  constructor() { }

  ngOnInit(): void {
  }

  getherapistPics(imageIndex: number)
  {
    return `assets/images/therapist/clinic/foto${imageIndex}.jpg`;
  }

  showtherapistPics(imageIndex: number)
  {
    this.activeSlideIndex = imageIndex;
    this.modalTherapistCarrousel.show();
  }

}
