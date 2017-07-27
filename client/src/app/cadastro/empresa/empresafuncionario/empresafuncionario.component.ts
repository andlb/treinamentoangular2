import { Funcionario } from './funcionario.model';
import { EmpresaService } from './../empresa.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-empresafuncionario',
  templateUrl: './empresafuncionario.component.html',
  styleUrls: ['./empresafuncionario.component.css']
})
export class EmpresafuncionarioComponent implements OnInit {
  @ViewChild('nome') nome: ElementRef;
  form: FormGroup;
  funcionarios:Funcionario[]=[];
  edit=false;
  indexFuncionario=-1;
  actinButtonValue = "Incluir"

  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm(){
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      email:['',[Validators.required,
                Validators.minLength(5),
                Validators.maxLength(30),
                Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            ]]
    });
  }

  //TODO: Verificar para não existir duplicidade de e-mail cadastrado.
  enviaFuncionario(){
    let funcionario ={
      nome:this.form.get("nome").value,
      email:this.form.get("email").value
    }
    if  (!this.edit){
      this.funcionarios.push(funcionario);
    }else{
      this.funcionarios[this.indexFuncionario]=funcionario;
    }
    this.onLimpar();
  }
  onEditItem(index){
    let funcionario = this.funcionarios[index];
    this.form.get("nome").setValue(funcionario.nome);
    this.form.get("email").setValue(funcionario.email);
    this.actinButtonValue = "Editar"
    this.edit = true;
    this.indexFuncionario=index;
  }
  onDeletar(){
    this.funcionarios.splice(this.indexFuncionario, 1);
    this.indexFuncionario = -1
    this.onLimpar();
  }

  onLimpar(){
    this.form.reset();
    this.nome.nativeElement.focus();
    this.indexFuncionario=-1;
    this.edit = false;
  }

}
