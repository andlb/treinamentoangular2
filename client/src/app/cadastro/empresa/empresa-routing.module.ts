

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
    { path: '', component: EmpresalistaComponent },
    { path: 'lista', component: EmpresalistaComponent},
    { path: 'cadastro', component: EmpresacadastroComponent},
    { path: 'funcionario', component: EmpresafuncionarioComponent },
    { path: 'servico', component: EmpresaservicoComponent},
    { path: 'pergunta', component: EmpresaperguntaComponent},
    { path: ':id', component: EmpresacadastroComponent},
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
