import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from './../empresa.service';
import { AuthService } from './../../../autenticar/auth.service';

@Component({
  selector: 'app-empresacadastro',
  templateUrl: './empresacadastro.component.html',
  styleUrls: ['./empresacadastro.component.css']
})
export class EmpresacadastroComponent implements OnInit {
  form: FormGroup;
  empresa;

  constructor(
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    //this.meuUsuario = this.authService.getMeuUsuario();
    this.getEmpresa();
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      nomefantasia: [this.empresa.nomefantasia, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      razaosocial: [this.empresa.razaosocial, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      nomeresponsavel: [this.empresa.nomeresponsavel, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      telefone: [this.empresa.telefone, [Validators.required, Validators.pattern(/^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/)]],
      celular: [this.empresa.celular, [Validators.required, Validators.pattern(/^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/)]],
      endereco: [this.empresa.endereco],
      bairro: [this.empresa.bairro],
      numero: [this.empresa.numero],
      complemento: [this.empresa.complemento],
      cidade: [this.empresa.cidade],
      estado: [this.empresa.estado],
      CEP: [this.empresa.cep, Validators.pattern(/\d{5}\-\d{3}/)]
    });
  }
  getEmpresa() {
    if (!this.empresa) {
      this.empresa = {};
    }
  }

  habilitaCampo() {
    this.form.controls["nomeresponsavel"].enable();
    this.form.controls["nomefantasia"].enable();
    this.form.controls["razaosocial"].enable();
    this.form.controls["telefone"].enable();
    this.form.controls["celular"].enable();
    this.form.controls["endereco"].enable();
    this.form.controls["bairro"].enable();
    this.form.controls["numero"].enable();
    this.form.controls["complemento"].enable();
    this.form.controls["estado"].enable();
    this.form.controls["cidade"].enable();
    this.form.controls["CEP"].enable();
  }

  desabilitaCampos() {
    this.form.controls["nomeresponsavel"].disable();
    this.form.controls["nomefantasia"].disable();
    this.form.controls["razaosocial"].disable();
    this.form.controls["telefone"].disable();
    this.form.controls["celular"].disable();
    this.form.controls["endereco"].disable();
    this.form.controls["bairro"].disable();
    this.form.controls["numero"].disable();
    this.form.controls["complemento"].disable();
    this.form.controls["estado"].disable();
    this.form.controls["cidade"].disable();
    this.form.controls["CEP"].disable();
  }

  addEmpresa(){
    const empresa = {
      nomeresponsavel: this.form.get("nomeresponsavel").value,
      nomefantasia: this.form.get("nomefantasia").value,
      razaosocial: this.form.get("razaosocial").value,
      telefone: this.form.get("telefone").value,
      celular: this.form.get("celular").value,
      endereco: this.form.get("endereco").value,
      bairro: this.form.get("bairro").value,
      complemento: this.form.get('complemento').value,
      cidade: this.form.get('cidade').value,
      estado: this.form.get('estado').value,
      CEP: this.form.get('CEP').value
    }
    this.empresaService.addEmpresa(empresa);


  }



}
