import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SurveyComponent } from './survey/survey.component';
import { OficinacadastroComponent } from './oficinacadastro/oficinacadastro.component';
import { OficinalistComponent } from './oficinalist/oficinalist.component';
import { OficinaRoutingModule } from './oficina-routing.module';

@NgModule({
  declarations: [
    OficinacadastroComponent,
    OficinalistComponent,
    SurveyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OficinaRoutingModule
  ]
})
export class OficinaModule { }
