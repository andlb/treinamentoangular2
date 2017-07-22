
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServiceComponent } from './service/service.component';
import { SurveyComponent } from './survey/survey.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './autenticar/register/register.component';
import { LoginComponent } from './autenticar/login/login.component';
import { AuthGuard } from './autenticar/guards/auth.guard';


const appRoutes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'service', component:ServiceComponent},
  { path: 'login', component:LoginComponent},
  { path: 'survey', component:SurveyComponent},
  { path: 'register',component:RegisterComponent},
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