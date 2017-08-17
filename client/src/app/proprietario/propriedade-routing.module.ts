
import { NoAuthGuard } from './../autenticar/guards/notAuth.guard';
import { AuthGuard } from './../autenticar/guards/auth.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProprietarioComponent } from './proprietario.component';

const propriedadeRoutes: Routes = [
  { path: '', component: ProprietarioComponent },
  { path: 'proprietario', component: ProprietarioComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(propriedadeRoutes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    NoAuthGuard
  ]
})
export class PropriedadeRoutingModule { }
