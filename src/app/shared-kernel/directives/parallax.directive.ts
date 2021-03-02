import { Directive, Input, ElementRef, HostListener, OnInit } from '@angular/core';


@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective implements OnInit {

	@Input('ratio') parallaxRatio : number = 1
	@Input('BackGround') parallaxBackGround : boolean = false;
	@Input('BackGroundHorizontallPosition') parallaxBackGroundVerticalPosition : number = 0;
	@Input('BackGroundImageHeigth') parallaxBackGroundImageHeigth : number = 0;

	initialTop : number = 0;
	initialposition : string[] ;
	initialleft : number;
	AlturaImagem : number = 500;

	constructor(private eleRef : ElementRef) {	}

	ngOnInit(): void {

		this.initialTop = this.eleRef.nativeElement.getBoundingClientRect().top;
	}


	@HostListener("window:scroll", ["$event"])
	onWindowScroll(event){


		const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
		let posicao = this.eleRef.nativeElement.getBoundingClientRect().top;

		if (this.parallaxBackGround){

			if(posicao < vh){

				let diferencaAltura = (this.parallaxBackGroundImageHeigth != 0 ? ((vh- this.parallaxBackGroundImageHeigth)) : 0);

				let alturaCalulada = ((vh - posicao  ) * this.parallaxRatio) + diferencaAltura; //- 100;

				this.eleRef.nativeElement.style.backgroundPosition = `${this.parallaxBackGroundVerticalPosition}%  ${ alturaCalulada }px`

			}
			else
				this.eleRef.nativeElement.style.backgroundPosition =  `${this.parallaxBackGroundVerticalPosition}% 100%`;
		}
		else{
			this.eleRef.nativeElement.style.top = (this.initialTop - (window.scrollY * this.parallaxRatio)) + 'px'
		}
	}

}
