import { AuthService } from './../../autenticar/auth.service';
///TODO:formatar cep
///TODO: Padronizar estado.
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  form: FormGroup;
  usuario;
  messageClass;
  message;
  processing = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.getUsuario();
    this.createForm();
  }

  getUsuario(){
    this.usuario = this.authService.getMeuUsuario();
    if (!this.usuario) {
      this.usuario = {
        nome:'',
        endereco:'',
        bairro:'',
        numero:'',
        complemento:'',
        estado:'',
        cep:''
      }
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      nome: [this.usuario.nome, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
      endereco: [this.usuario.endereco],
      bairro: [this.usuario.bairro],
      numero: [this.usuario.numero],
      complemento: [this.usuario.complemento],
      cidade: [this.usuario.cidade],
      estado: [this.usuario.estado],
      CEP: [this.usuario.cep]
    });
  }

  updateProfile() {
    this.processing = true;
    const usuario = {
      nome: this.form.get('nome').value,
      endereco: this.form.get("endereco").value,
      bairro: this.form.get("bairro").value,
      complemento: this.form.get('complemento').value,
      cidade: this.form.get('cidade').value,
      estado: this.form.get('estado').value,
      CEP: this.form.get('CEP').value
    }
    this.authService.atualizaUsuario(usuario).subscribe((data) => {
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
    });

  }
  ngOnInit() {

  }

}
