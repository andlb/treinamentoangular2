import { OficinaRoutingModule } from './oficina-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ServiceComponent } from './service/service.component';
import { SurveyComponent } from './survey/survey.component';
import { OficinaComponent } from './oficina.component';
import { OficinacadastroComponent } from './oficinacadastro/oficinacadastro.component';

@NgModule({
  declarations: [
    ServiceComponent,
    SurveyComponent,
    OficinaComponent,
    OficinacadastroComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OficinaRoutingModule
  ]
})
export class OficinaModule { }
