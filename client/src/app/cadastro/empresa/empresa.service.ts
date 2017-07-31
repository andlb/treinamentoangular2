import { Servico } from './empresaservico/servico.model';
import { Funcionario } from './empresafuncionario/funcionario.model';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './../../autenticar/auth.service';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Subject } from "rxjs/Subject";
import { ErroMessage } from './../../share/erro.model';

@Injectable()
export class EmpresaService {
  private cadastroValido=false;
  private empresa;
  empresaChanged = new Subject();
  empresaMessage = new Subject();
  options;
  domain = environment.domain;

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


  createAuthenticationHeader() {
    this.authService.loadToken();
    console.log('token: == '+this.authService.authToken);
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authService.authToken
      })
    });
  }

  cancelarAcao(){
    this.empresa = {
      cadastro:{},
      servico:[],
      funcionario:[]
    };
    this.empresaChanged.next('cancelaracao');
  }

  //verifica se os dados dos cadastros estão valido
  verificaDadosValido(){
    if (!this.cadastroValido) {
      return false;
    }
    return true
  }

  cadastraEmpresa() {
    this.createAuthenticationHeader();
    let empresa = this.empresa.cadastro;
    empresa.convidado = this.empresa.funcionario;
    empresa.servico = this.empresa.servico;
    return this.http.post(this.domain + 'empresa/cadastraEmpresa', empresa, this.options).map(res => res.json());
  }

  getTodasEmpresas() {
    this.createAuthenticationHeader();
    console.log(this.domain+'empresa/getTodasEmpresas');
    return this.http.get(this.domain + 'empresa/getTodasEmpresas',this.options).map(res => res.json());
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
  }
  //
  setMensagemErro(message:ErroMessage) {
    this.empresaMessage.next(message);
  }
}
