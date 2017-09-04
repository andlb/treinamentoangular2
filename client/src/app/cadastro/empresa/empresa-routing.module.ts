

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../../autenticar/guards/auth.guard';
import { NoAuthGuard } from './../../autenticar/guards/notAuth.guard';

import { EmpresaComponent } from './empresa.component';
import { EmpresaservicoComponent } from './empresaservico/empresaservico.component';
import { EmpresafuncionarioComponent } from './empresafuncionario/empresafuncionario.component';
import { EmpresacadastroComponent } from './empresacadastro/empresacadastro.component';
import { EmpresalistaComponent } from './empresalista/empresalista.component';
import { EmpresaperguntaComponent } from './empresapergunta/empresapergunta.component';

const empresaRoutes: Routes = [
  { path: '', component: EmpresaComponent, children: [
    { path: '', component: EmpresalistaComponent,canActivate: [AuthGuard] },
    { path: 'lista', component: EmpresalistaComponent,canActivate: [AuthGuard]},
    { path: 'cadastro', component: EmpresacadastroComponent,canActivate: [AuthGuard]},
    { path: 'funcionario', component: EmpresafuncionarioComponent,canActivate: [AuthGuard] },
    { path: 'servico', component: EmpresaservicoComponent,canActivate: [AuthGuard]},
    { path: 'pergunta', component: EmpresaperguntaComponent,canActivate: [AuthGuard]},
    { path: 'cadastro/:id', component: EmpresacadastroComponent,canActivate: [AuthGuard]},
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(empresaRoutes)
  ],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    NoAuthGuard
  ]
})
export class EmpresaRoutingModule {}
