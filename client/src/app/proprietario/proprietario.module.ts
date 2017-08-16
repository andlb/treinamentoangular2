import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProprietarioComponent } from './proprietario.component';
import { PropriedadeRoutingModule } from './propriedade-routing.module';

@NgModule({
  declarations: [
    ProprietarioComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PropriedadeRoutingModule
  ]
})
export class OficinaModule { }
