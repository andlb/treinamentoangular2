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

  messageClass;
  message;
  processing = false;

  constructor(
    private formBuilder: FormBuilder,
    private AuthService: AuthService
  ) { }

  ngOnInit() {
  }

  createForm(){
    this.form = this.formBuilder.group({
      nome:['',[Validators.required,Validators.maxLength(100),Validators.minLength(5)]],
      endereco:[''],
      bairro:[''],
      complemento:[''],
      cidade:[''],
      estado:[''],
      CEP:['']
    });
  }

  updateProfile(){
    this.processing = true;
    const profile = {
      nome:this.form.get('nome').value,
      endereco:this.form.get("endereco").value,
      bairro:this.form.get("bairro").value,
      complemento:this.form.get('complemento').value,
      cidade:this.form.get('cidade').value,
      estado:this.form.get('estado').value,
      CEP:this.form.get('CEP').value
    }

  }

}
