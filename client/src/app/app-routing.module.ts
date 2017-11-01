import { AgendamentoComponent } from './agendamento/agendamento.component';
import { EsquecisenhaComponent } from './autenticar/login/esquecisenha.component';
import { ReinicializarsenhaComponent } from './autenticar/login/reinicializarsenha.component';

import { NgModule }             from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './autenticar/guards/auth.guard';
import { NoAuthGuard } from './autenticar/guards/notAuth.guard';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './autenticar/register/register.component';
import { LoginComponent } from './autenticar/login/login.component';
import { ProfileComponent } from './cadastro/profile/profile.component';


const appRoutes: Routes = [

  { path: 'empresa', loadChildren: './cadastro/empresa/empresa.module#EmpresaModule'},
  { path: 'centroautomotivo', loadChildren: './oficina/oficina.module#OficinaModule'},
  { path: 'areaproprietario', loadChildren: './proprietario/proprietario.module#ProprietarioModule'},
  { path: 'login', component:LoginComponent,canActivate: [NoAuthGuard]},
  { path: 'reinializarsenha', component: ReinicializarsenhaComponent,canActivate: [NoAuthGuard]},
  { path: 'esquecisenha', component: EsquecisenhaComponent,canActivate: [NoAuthGuard]},
  { path: 'login/:acessode', component:LoginComponent,canActivate: [NoAuthGuard]},
  { path: 'agendamento/:placa', component:AgendamentoComponent,canActivate: [NoAuthGuard]},
  { path: 'register',component:RegisterComponent, canActivate:[NoAuthGuard] },
  { path: 'register/:acessode',component:RegisterComponent, canActivate:[NoAuthGuard] },
  { path: 'profile/:id/:local', component:ProfileComponent,canActivate: [AuthGuard]},
  { path: '', component:HomeComponent, pathMatch: 'full'},
  { path: '**', component:HomeComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,
      {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
