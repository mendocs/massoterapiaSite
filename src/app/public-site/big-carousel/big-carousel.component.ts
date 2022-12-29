import { Component, OnInit } from '@angular/core';
import { PublicSiteService } from '../public-site.service';
import {slide} from "./models/slide" ;

@Component({
  selector: 'app-big-carousel',
  templateUrl: './big-carousel.component.html',
  styleUrls: ['./big-carousel.component.scss']
})
export class BigCarouselComponent implements OnInit {


  public slides :slide[] =
  [
    { titulo: "O espaço",
      resumido: "Mais saúde, bem-estar e qualidade de vida com Nel Zen em espaço exclusivamente feminino",
      detalhado: "Um espaço voltado para o público feminino que tem como objetivo oferecer um serviço de alta qualidade em massoterapia e técnicas integrativas a fim de proporcionar bem-estar, saúde e qualidade de vida",
      image : "therapist" ,
      link : "therapist_spied"
    },
    { titulo: "Terapias",
      resumido: "Massagem relaxante, terapêutica, modeladora, drenagem linfática, Shiatsu, reflexologia, aromaterapia e mais...",
      detalhado: "Aqui você encontra técnicas de massagem relaxante, massagem terapêutica, massagem modeladora, massagem desportiva, drenagem linfática, Shiatsu, Tui Na, escalda-pés, reflexologia podal, reflexologia manual, auriculoterapia, ventosaterapia, moxaterapia, termoterapia, bambuterapia, cromoterapia e aromaterapia",
      image : "therapy" ,
      link : "tag_cloud_spied"
    },
    { titulo: "Benefícios",
      resumido: "Benefícios da massagem: relaxamento, tratamento da dor, apoio à prática esportiva, estética, edema, reequilíbrio fisiológico, energético e emocional,  consciência corporal,  e mais...",
      detalhado: "A massoterapia atua em diversas áreas que envolvem a promoção, prevenção e  recuperação da saúde e bem-estar. Desta forma, atua sobre aspectos como o relaxamento, o apoio à prática esportiva, tratamento da dor, estética, cuidados pré e pós-cirúrgicos, consciência corporal, reequilíbrio fisiológico, energético e emocional.",
      image : "home" ,
      link : "about"
    }
  ]



  slideAtivo:number = 2;
  constructor(private publicSiteService: PublicSiteService) { }

  ngOnInit(): void {
  }


  slideClick(destination : string): void {
    //this.publicSiteService.triggerScrollTo(destination);

    if (destination.includes("spied"))
      this.publicSiteService.triggerScrollTo(destination);
    else
    {
      this.publicSiteService.SetTherapy(destination);
    }


  }


}
