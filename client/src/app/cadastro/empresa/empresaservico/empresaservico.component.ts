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


  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService
  ) {
    this.createForm();
   }
  createForm(){
    this.form = this.formBuilder.group({
      descricao: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      quilometragem: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(5),Validators.pattern(/[0-9]*/)]],
      tempo: ['', [Validators.required, Validators.maxLength(5)]]
    });
  }
  ngOnInit() {
  }

  onEditItem(index){
    let servico = this.servico[index];
    this.form.get("descricao").setValue(servico.descricao);
    this.form.get("quilometragem").setValue(servico.quilometragem);
    this.form.get("tempo").setValue(servico.tempo);

  }
  onDeletar(){
    this.onLimpar();
  }

  onLimpar(){
    this.form.reset();
    this.edit=false;

  }

}
