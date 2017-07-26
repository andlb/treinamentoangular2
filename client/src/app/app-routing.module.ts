
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './autenticar/guards/auth.guard';
import { NoAuthGuard } from './autenticar/guards/notAuth.guard';

import { ServiceComponent } from './service/service.component';
import { SurveyComponent } from './survey/survey.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './autenticar/register/register.component';
import { LoginComponent } from './autenticar/login/login.component';
import { EmpresaComponent } from './cadastro/empresa/empresa.component';
import { ProfileComponent } from './cadastro/profile/profile.component';



const appRoutes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'service', component:ServiceComponent, canActivate:[AuthGuard]},
  { path: 'empresa', component:EmpresaComponent, canActivate:[NoAuthGuard]},
  { path: 'login', component:LoginComponent,canActivate: [NoAuthGuard]},
  { path: 'profile', component:ProfileComponent,canActivate: [AuthGuard]},
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
