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
  cadastroValido=false;
  options;
  empresa;
  processing;
  authSerSub;
  messageClass;
  message;


  constructor(
    private authService: AuthService,
    private http: Http
  )
  {

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
    this.empresaChanged.next('desabilitarcampos');

    let empresa = this.empresa.cadastro;
    empresa.convidado = this.empresa.funcionario;
    empresa.servico = this.empresa.servico;

    this.http.post(this.domain + 'authentication/cadastraEmpresa', empresa, this.options).map(res => res.json()).subscribe(
      (data) => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.empresaChanged.next('habilitarcampos');
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.empresaChanged.next('habilitarcampos');
          this.empresaChanged.next('cancelaracao');
        }, 2000);
      }
      }
    );
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

  setCadastroValido(valido){
    this.cadastroValido = valido;
    if (this.cadastroValido) {
      //informa o botão que pode ficar habilitado para cadastro.
      this.empresaChanged.next('cadastroValido');
    }

  }
}
