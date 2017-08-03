import { NoAuthGuard } from './../autenticar/guards/notAuth.guard';
import { AuthGuard } from './../autenticar/guards/auth.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OficinacadastroComponent } from './oficinacadastro/oficinacadastro.component';
import { SurveyComponent } from './survey/survey.component';
import { ServiceComponent } from './service/service.component';
import { OficinalistComponent } from './oficinalist/oficinalist.component';

const oficinaRoutes: Routes = [
    { path: '', component:OficinalistComponent, children: [
      { path: '', component: SurveyComponent },
      { path: 'cadastro', component: OficinacadastroComponent },
      { path: 'pesquisa', component: SurveyComponent },
      { path: 'service', component: ServiceComponent },

  ]}
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
export class OficinaRoutingModule {}
