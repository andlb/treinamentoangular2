
import { NgModule }             from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './autenticar/guards/auth.guard';
import { NoAuthGuard } from './autenticar/guards/notAuth.guard';


import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './autenticar/register/register.component';
import { LoginComponent } from './autenticar/login/login.component';
import { ProfileComponent } from './cadastro/profile/profile.component';

const appRoutes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'empresa', loadChildren: './cadastro/empresa/empresa.module#EmpresaModule'},
  { path: 'centroautomotivo', loadChildren: './oficina/oficina.module#OficinaModule'},
  { path: 'login', component:LoginComponent,canActivate: [NoAuthGuard]},
  { path: 'login/:acessode', component:LoginComponent,canActivate: [NoAuthGuard]},
  { path: 'register',component:RegisterComponent, canActivate:[NoAuthGuard] },
  { path: 'register/:acessode',component:RegisterComponent, canActivate:[NoAuthGuard] },
  { path: 'profile', component:ProfileComponent,canActivate: [AuthGuard]},
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
