import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TherapyDataService} from "./services/therapy-data.service";




@NgModule({
  declarations: [],
  imports: [

    CommonModule
  ],
  providers : [TherapyDataService]
})
export class TherapyModule { }
