import { NoAuthGuard } from './../autenticar/guards/notAuth.guard';
import { AuthGuard } from './../autenticar/guards/auth.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OficinacadastroComponent } from './oficinacadastro/oficinacadastro.component';

import { OficinalistComponent } from './oficinalist/oficinalist.component';
import { SurveyComponent } from './survey/survey.component';

const oficinaRoutes: Routes = [
  { path: '', component: OficinalistComponent },
  { path: 'lista', component: OficinalistComponent },
  { path: 'lista/:edit', component: OficinalistComponent },
  { path: 'cadastro', component: OficinacadastroComponent },
  { path: 'cadastro/:id', component: OficinacadastroComponent },
  { path: 'survey/:id', component: SurveyComponent }
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
