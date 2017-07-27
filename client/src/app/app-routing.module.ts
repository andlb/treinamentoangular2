
import { NgModule }             from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './autenticar/guards/auth.guard';
import { NoAuthGuard } from './autenticar/guards/notAuth.guard';

import { ServiceComponent } from './service/service.component';
import { SurveyComponent } from './survey/survey.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './autenticar/register/register.component';
import { LoginComponent } from './autenticar/login/login.component';
import { ProfileComponent } from './cadastro/profile/profile.component';

const appRoutes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'service', component:ServiceComponent, canActivate:[AuthGuard]},
  { path: 'empresa', loadChildren: './cadastro/empresa/empresa.module#EmpresaModule'},
  { path: 'login', component:LoginComponent,canActivate: [NoAuthGuard]},
  { path: 'login/:acessode', component:LoginComponent,canActivate: [NoAuthGuard]},
  { path: 'register',component:RegisterComponent, canActivate:[NoAuthGuard] },
  { path: 'register/:acessode',component:RegisterComponent, canActivate:[NoAuthGuard] },
  { path: 'profile', component:ProfileComponent,canActivate: [AuthGuard]},
  { path: 'survey', component:SurveyComponent, canActivate:[AuthGuard]},

  { path: '**', component:HomeComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
