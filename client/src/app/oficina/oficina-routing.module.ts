import { OficinaComponent } from './oficina.component';
import { NoAuthGuard } from './../autenticar/guards/notAuth.guard';
import { AuthGuard } from './../autenticar/guards/auth.guard';

import { ServiceComponent } from './service/service.component';
import { SurveyComponent } from './survey/survey.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const oficinaRoutes: Routes = [
    { path: '', component: OficinaComponent, children: [
    { path: '', component:  OficinaComponent}
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
