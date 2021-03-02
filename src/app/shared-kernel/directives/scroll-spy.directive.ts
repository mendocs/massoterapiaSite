import { Directive , Input, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollSpy]'
})
export class ScrollSpyDirective {
    @Input() public spiedTags = [];
    @Output() public sectionChange = new EventEmitter<string>();
	private currentSection: string;
	private vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);


    constructor(private eleRef: ElementRef) {}

    @HostListener('window:scroll', ['$event'])
    onScroll(event) {

        let currentSection: string;
		    const children = this.eleRef.nativeElement.children;
        const scrollTop = document.documentElement.scrollTop; //event.target.scrollTop; ditancia do elemento parent
        const parentOffset = this.eleRef.nativeElement.parentNode.offsetTop ;// event.target.offsetTop; // distancia do top para o parent


        for (let i = 0; i < children.length; i++) {
			    const element = children[i];

          if ( element.id.includes("spied") ) {

            if (scrollTop >= ((element.offsetTop + parentOffset)  - this.vh / 3 * 2)) {

                currentSection = element.id;
            }
          }
        }
        if (currentSection !== this.currentSection) {
            this.currentSection = currentSection;
            this.sectionChange.emit(this.currentSection);
        }
	}

}
