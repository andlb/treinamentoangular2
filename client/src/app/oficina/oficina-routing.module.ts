import { LoginComponent } from './../autenticar/login/login.component';
import { NoAuthGuard } from './../autenticar/guards/notAuth.guard';
import { AuthGuard } from './../autenticar/guards/auth.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OficinacadastroComponent } from './oficinacadastro/oficinacadastro.component';

import { OficinalistComponent } from './oficinalist/oficinalist.component';
import { SurveyComponent } from './survey/survey.component';

const oficinaRoutes: Routes = [
  { path: ''  , component: OficinalistComponent,canActivate: [AuthGuard] },
  { path: 'lista', component: OficinalistComponent,canActivate: [AuthGuard] },
  { path: 'lista/:edit', component: OficinalistComponent,canActivate: [AuthGuard] },
  { path: 'cadastro', component: OficinacadastroComponent,canActivate: [AuthGuard] },
  { path: 'cadastro/:id', component: OficinacadastroComponent ,canActivate: [AuthGuard]},
  { path: 'survey/:id', component: SurveyComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(oficinaRoutes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    NoAuthGuard
  ]
})
export class OficinaRoutingModule { }
