import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServiceComponent } from './service/service.component';
import { SurveyComponent } from './survey/survey.component';
import { HomeComponent } from './home/home.component';


const appRoutes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'service', component:ServiceComponent},
  { path: 'survey', component:SurveyComponent},
  { path: '**', component:HomeComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes      
    )
  ],
  exports: [
    RouterModule
  ]  
})
export class AppRoutingModule { }