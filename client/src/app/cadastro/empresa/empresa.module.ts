import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa.component';
import { EmpresaService } from './empresa.service';
import { EmpresacadastroComponent } from './empresacadastro/empresacadastro.component';
import { EmpresaservicoComponent } from './empresaservico/empresaservico.component';
import { EmpresafuncionarioComponent } from './empresafuncionario/empresafuncionario.component';
import { EmpresalistaComponent } from './empresalista/empresalista.component';
import { EmpresaperguntaComponent } from './empresapergunta/empresapergunta.component';

@NgModule({
  declarations: [
    EmpresaComponent,
    EmpresacadastroComponent,
    EmpresaservicoComponent,
    EmpresafuncionarioComponent,
    EmpresalistaComponent,
    EmpresaperguntaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmpresaRoutingModule
  ]
})
export class EmpresaModule {}
