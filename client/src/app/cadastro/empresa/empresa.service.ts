import { Servico } from './empresaservico/servico.model';
import { Funcionario } from './empresafuncionario/funcionario.model';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './../../autenticar/auth.service';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Subject } from "rxjs/Subject";

@Injectable()
export class EmpresaService {
  empresaChanged = new Subject();
  options;
  empresa;
  processing;
  authSerSub;
  constructor(
    private authService: AuthService,
    private http: Http
  )
  {
    console.log('constriuu o service');
    this.empresa = {
      cadastro:{},
      servico:[],
      funcionario:[]
    };
  }

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

  cancelarAcao(){
    this.empresa = {
      cadastro:{},
      servico:[],
      funcionario:[]
    };
    this.empresaChanged.next('cancelaracao');
  }

  cadastraEmpresa() {
    this.createAuthenticationHeader();
    return this.http.post(this.domain + 'authentication/cadastraEmpresa', this.empresa, this.options).map(res => res.json());
  }

  addEmpresa(empresa){
    this.empresa.cadastro = empresa
  }

  getEmpresa(){
    return this.empresa.cadastro;
  }

  getServico(){
    return this.empresa.servico;
  }

  addServico(servico){
    this.empresa.servico = servico;
  }

  getFuncionario(){
    return this.empresa.funcionario;
  }

  addFuncionario(funcionario){
    this.empresa.funcionario=funcionario;
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
