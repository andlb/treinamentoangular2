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
  private cadastroValido = false;
  private empresa;
  private empresaid;
  empresaChanged = new Subject();
  empresaMessage = new Subject();
  options;
  domain = environment.domain;

  constructor(
    private authService: AuthService,
    private http: Http
  ) {

    this.empresa = {
      cadastro: {},
      servico: [],
      funcionario: []
    };
  }


  createAuthenticationHeader() {
    this.authService.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authService.authToken
      })
    });
  }

  cancelarAcao() {
    this.empresa = {
      cadastro: {},
      servico: [],
      funcionario: []
    };
    this.empresaChanged.next('cancelaracao');
  }

  //verifica se os dados dos cadastros estão valido
  verificaDadosValido() {
    if (!this.cadastroValido) {
      return false;
    }
    return true
  }

  atualizaEmpresa() {
    this.createAuthenticationHeader();
    let empresa = this.empresa.cadastro;
    empresa.convidado = this.empresa.funcionario;
    empresa.servico = this.empresa.servico;
    empresa.pergunta = this.empresa.pergunta;
    if (this.empresaid) {
      empresa.id = this.empresaid;
    }
    return this.http.post(this.domain + 'empresa/updateEmpresa', empresa, this.options).map(res => res.json());
  }


  getEmpresa(empresaid) {
    this.createAuthenticationHeader();
    return this.http.get(this.domain + 'empresa/getEmpresa/' + empresaid, this.options).map(res => res.json());
  }

  getTodasEmpresas() {
    this.createAuthenticationHeader();
    return this.http.get(this.domain + 'empresa/getTodasEmpresas', this.options).map(res => res.json());
  }

  setEmpresaid(empresaid) {
    this.empresaid = empresaid
    this.empresaChanged.next("edicao");
  }

  addEmpresa(empresa) {
    this.empresa.cadastro = {
      razaosocial: empresa.razaosocial,
      nomefantasia: empresa.nomefantasia,
      nomeresponsavel: empresa.nomeresponsavel,
      telefone: empresa.telefone,
      celular: empresa.celular,
      email: empresa.email,
      endereco: empresa.endereco.endereco,
      bairro: empresa.endereco.bairro,
      numero: empresa.endereco.numero,
      complemento: empresa.endereco.complemento,
      cidade: empresa.endereco.cidade,
      estado: empresa.endereco.estado,
      cep: empresa.endereco.cep
    };
    this.empresa.servico = empresa.servicos;
    this.empresa.funcionario = empresa.convidados;

  }

  addCadastro(cadastro) {
    this.empresa.cadastro = cadastro
  }

  getCadastro() {
    return this.empresa.cadastro;
  }

  getServico() {
    return this.empresa.servico;
  }

  addServico(servico) {
    this.empresa.servico = servico;
  }

  getFuncionario() {
    return this.empresa.funcionario;
  }

  addFuncionario(funcionario) {
    this.empresa.funcionario = funcionario;
  }

  getPergunta() {
    return this.empresa.pergunta;
  }

  addPergunta(pergunta) {
    this.empresa.pergunta = pergunta;
  }
  setCadastroValido(valido) {
    this.cadastroValido = valido;
  }
  //
  setMensagemErro(message: ErroMessage) {
    this.empresaMessage.next(message);
  }
}
