
//TODO: Testar fazer a chamada do rest através do postman.
//TODO: O botão enviar esta mostrando a label submit.
//TODO: retirar o disabled dos campos. Não é recomendado usar dessa forma.
//TODO: Quando o submit der errado, não limpar todos os campos
//TODO: Numero e complemento deve vir antes de bairro.
//TODO: Quando clica no botão enviar, esta solicitando que informe o nome fantasia.
//TODO: telefone deve aceitar somente numeros.
//TODO: quando cadastrar a razão social deve também preencher o nome fantasia.
//TODO: o campo já deve vir com o foco.
//TODO: o campo cep deve ser somente numero ou traços e quando salvar, deve retirar os traços e quando mostrar deve mostrar o traço.
//TODO: a validação do e-mail não está funcionando.
//TODO: o campo telefone está com a descrição de erro errado.

import { AuthService } from './../../autenticar/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})

export class EmpresaComponent implements OnInit {
  form: FormGroup;
  empresa;
  messageClass;
  message;
  processing = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.getEmpresa();
    this.createForm();
  }

  createForm(){
    this.form = this.formBuilder.group({
      nomefantasia: [this.empresa.nomefantasia, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      razaosocial: [this.empresa.razaosocial, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      email: [this.empresa.email,Validators.required],
      telefone: [this.empresa.telefone,Validators.required],
      celular: [this.empresa.celular,Validators.required],
      endereco: [this.empresa.endereco],
      bairro: [this.empresa.bairro],
      numero: [this.empresa.numero],
      complemento: [this.empresa.complemento],
      cidade: [this.empresa.cidade],
      estado: [this.empresa.estado],
      CEP: [this.empresa.cep]
    });
  }

  getEmpresa(){
    if (!this.empresa) {
      this.empresa = {
        nomefantasia:'',
        razaosocial:'',
        email:'',
        telefone:'',
        celular:'',
        endereco:'',
        bairro:'',
        numero:'',
        complemento:'',
        estado:'',
        cep:''
      }
    }

  }

  submitEmpresa() {
    this.processing = true;
    const empresa = {
      nomefantasia:this.form.get("nomefantasia").value,
      razaosocial:this.form.get("razaosocial").value,
      email:this.form.get("email").value,
      telefone:this.form.get("telefone").value,
      celular:this.form.get("celular").value,
      endereco: this.form.get("endereco").value,
      bairro: this.form.get("bairro").value,
      complemento: this.form.get('complemento').value,
      cidade: this.form.get('cidade').value,
      estado: this.form.get('estado').value,
      CEP: this.form.get('CEP').value
    }
    this.authService.cadastraEmpresa(empresa).subscribe((data) => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.processing = false; // Enable submit button
          this.message = false; // Erase error/success message
          this.form.reset(); // Reset all form fields
        }, 2000);
      }
    });
  }

  ngOnInit() {
  }

}
