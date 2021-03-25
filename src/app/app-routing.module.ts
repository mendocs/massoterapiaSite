import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './public-site/page-not-found/page-not-found.component';
import { MainContainerComponent } from './public-site/main-container/main-container.component';


const routes: Routes = [
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  {path: 'areacliente', loadChildren: () => import('./patient/patient.modeule').then(m => m.PatientModule) },
  {path: 'paginanaoencontrada', component: PageNotFoundComponent },
  {path: '', component: MainContainerComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
