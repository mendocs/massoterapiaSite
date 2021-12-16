import { Component, OnInit, Directive, Optional } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Directive()
export abstract class BaseComponent implements OnInit {

  isError : boolean = false;
  isLoading : boolean = false;
  messageError: string;
  recordSuccess: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  getError(err : HttpErrorResponse): void{

    this.isError = true;
    //this.messageError = err.message;
    this.isLoading = false;

    if (err.statusText.includes("Unknown Error") )
      this.messageError =  `Sem conexão com o servidor (${err.message})`;
    else
      this.messageError = err.status==400 ? JSON.stringify(err.error) : err.message;


  }





}
