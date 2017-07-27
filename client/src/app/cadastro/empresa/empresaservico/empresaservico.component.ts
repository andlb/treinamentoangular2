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
  servicos:Servico[]=[];
  edit=false;
  indexServico=-1;


  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService
  ) {
    this.createForm();
   }
  createForm(){
    this.form = this.formBuilder.group({
      descricao: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      quilometragem: ['', [Validators.required, Validators.maxLength(15),Validators.pattern(/[0-9]*/)]],
      tempo: ['', [Validators.required, Validators.maxLength(5)]]
    });
  }
  ngOnInit() {
  }

  onEditItem(index){
    let servico = this.servicos[index];
    this.form.get("descricao").setValue(servico.descricao);
    this.form.get("quilometragem").setValue(servico.quilometragem);
    this.form.get("tempo").setValue(servico.tempo);
    this.edit=true;
    this.indexServico = index;

  }
  onDeletar(){
    this.onLimpar();
  }

  onLimpar(){
    this.form.reset();
    this.edit=false;
  }

  onEnviarServico(){
    let servico ={
      descricao:this.form.get("descricao").value,
      quilometragem:this.form.get("quilometragem").value,
      tempo:this.form.get("tempo").value
    }
    if  (!this.edit){
      this.servicos.push(servico);
    }else{
      this.servicos[this.indexServico]=servico;
    }
    //this.empresaService.empre
    this.onLimpar();
  }
}
