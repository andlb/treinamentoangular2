import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProprietarioComponent } from './proprietario.component';
import { PropriedadeRoutingModule } from './propriedade-routing.module';
import { VeiculoComponent } from './veiculo/veiculo.component';

@NgModule({
  declarations: [
    ProprietarioComponent,
    VeiculoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PropriedadeRoutingModule
  ]
})
export class ProprietarioModule { }
