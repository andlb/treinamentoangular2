import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Servico } from './servico.model';
import { EmpresaService } from './../empresa.service';

@Component({
  selector: 'app-empresaservico',
  templateUrl: './empresaservico.component.html',
  styleUrls: ['./empresaservico.component.css']
})
export class EmpresaservicoComponent implements OnInit {
  @ViewChild('nome') nome: ElementRef;
  form: FormGroup;
  servico:Servico[]=[];
  edit=false;
  indexFuncionario=-1;
  actinButtonValue = "Incluir"

  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
  }

  onEditItem(index){
  }
  onDeletar(){
    this.onLimpar();
  }

  onLimpar(){

  }

}
