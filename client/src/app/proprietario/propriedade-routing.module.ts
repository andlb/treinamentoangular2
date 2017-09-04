import { NoAuthGuard } from './../autenticar/guards/notAuth.guard';
import { AuthGuard } from './../autenticar/guards/auth.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProprietarioComponent } from './proprietario.component';
import { VeiculoComponent } from './veiculo/veiculo.component';

const propriedadeRoutes: Routes = [
  { path: '', component: ProprietarioComponent,canActivate: [AuthGuard] },
  { path: 'proprietario', component: ProprietarioComponent,canActivate: [AuthGuard] },
  { path: 'veiculo/:id', component: VeiculoComponent,canActivate: [AuthGuard] }
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
