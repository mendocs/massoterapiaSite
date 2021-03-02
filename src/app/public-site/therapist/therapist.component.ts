import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-therapist',
  templateUrl: './therapist.component.html',
  styleUrls: ['./therapist.component.scss']
})
export class TherapistComponent implements OnInit {



  features: string[] = ["Formada no Senac", "Especializada em tratamento feminino", "Curso com 1600 horas", "Ambiente higienzado"];

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
