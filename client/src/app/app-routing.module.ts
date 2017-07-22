
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServiceComponent } from './service/service.component';
import { SurveyComponent } from './survey/survey.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './autenticar/register/register.component';
import { LoginComponent } from './autenticar/login/login.component';
import { AuthGuard } from './autenticar/guards/auth.guard';
import { NoAuthGuard } from './autenticar/guards/notAuth.guard';


const appRoutes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'service', component:ServiceComponent, canActivate:[AuthGuard]},
  { path: 'login', component:LoginComponent,canActivate: [NoAuthGuard]},
  { path: 'survey', component:SurveyComponent, canActivate:[AuthGuard]},
  { path: 'register',component:RegisterComponent,canActivate: [NoAuthGuard]},
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