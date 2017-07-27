import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './../../autenticar/auth.service';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable()
export class EmpresaService {
  options;
  empresa;
  processing;
  authSerSub;
  constructor(
    private authService: AuthService,
    private http: Http
  )
  { }

  domain = environment.domain;

  createAuthenticationHeader() {
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      })
    });
  }

  checkEmailEmpresa(email){
    return this.http.get(this.domain+'authentication/checkEmailEmpresa/'+email,this.options).map(res => res.json());
  }

  cadastraEmpresa() {
    this.createAuthenticationHeader();
    return this.http.post(this.domain + 'authentication/cadastraEmpresa', this.empresa, this.options).map(res => res.json());
  }

  addEmpresa(empresa){
    this.empresa={
      cadastro:empresa
    }
    console.log(empresa);
  }

  addServico(servico){
    this.empresa={
      servico:servico
    }
  }
  addFuncionario(funcionario){
    this.empresa={
      funcionario:funcionario
    }
  }

  submitEmpresa() {
    this.processing = true;
    //this.desabilitaCampos();
    this.authSerSub = this.empresa.cadastraEmpresa(this.empresa).subscribe((data) => {
      /*if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.habilitaCampo();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.processing = false; // Enable submit button
          //this.message = false; // Erase error/success message
          //this.form.reset(); // Reset all form fields
        }, 2000);

      }
      */
    });

  }
}
