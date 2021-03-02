import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('classParentSquares') classParentSquares: any

  constructor() { }

  ngOnInit(): void {

    var myvar = document.getElementById("squareContainer");

    //console.log(myvar);

    console.log(window.getComputedStyle(myvar).display);
  }

  ngAfterViewInit1() : void
  {

    //console.log(document.getElementById("squareContainer").style);

    var myvar = document.getElementById("squareContainer");

    //console.log(myvar);

    console.log(window.getComputedStyle(myvar).display);


  }

  verifyDisplayMD(): boolean
  {
    var myvar = document.getElementById("verifyDisplay");

    return (window.getComputedStyle(myvar).display === "none" )
  }

}
