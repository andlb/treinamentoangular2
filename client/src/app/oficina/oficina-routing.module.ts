import { NoAuthGuard } from './../autenticar/guards/notAuth.guard';
import { AuthGuard } from './../autenticar/guards/auth.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OficinacadastroComponent } from './oficinacadastro/oficinacadastro.component';
import { OficinaComponent } from './oficina.component';
import { SurveyComponent } from './survey/survey.component';
import { ServiceComponent } from './service/service.component';

const oficinaRoutes: Routes = [
    { path: '', component:OficinacadastroComponent, children: [
      { path: '', component: SurveyComponent },
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
