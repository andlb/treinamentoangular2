import { EmpresaService } from "./../cadastro/empresa/empresa.service";
import { Http, Headers, RequestOptions } from "@angular/http";
import { AuthService } from "./../autenticar/auth.service";
import { Injectable, OnDestroy } from "@angular/core";
import { environment } from "./../../environments/environment";
import { Subject } from "rxjs/Subject";
import { ErroMessage } from "./../share/erro.model";

@Injectable()
export class OficinaService {
  options;
  domain = environment.domain;

  empresaid;
  ordemservicoid;
  usuarioid;
  finalizar = false;
  cadastroProprietario = {
    proprietario: {
      cpf: '',
      nome: '',
      email: '',
      datanascimento: ''
    },
    veiculo: {
      marca: '',
      modelo: '',
      placa: '',
      ano: '',
      anomodelo:'',
      quilometragem: ''
    },
    servicosRealizar: [{}],
    servicosRealizado: [{}]
  };

  constructor(
    private authService: AuthService,
    private empresaService: EmpresaService,
    private http: Http
  ) {
    this.authService.loadToken();
    let usuario = JSON.parse(this.authService.usuarioToken);
    if (usuario.empresa) {
      this.empresaid = usuario.empresa._id;
    }
    this.usuarioid = usuario.usuarioid;
    this.finalizar = false;
  }

  createAuthenticationHeader() {
    this.authService.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: this.authService.authToken
      })
    });
  }

  setProprietario(proprietario) {
    if (!proprietario) return;
    var datanascimento = '';
    if (proprietario.datanascimento) {
      var tdatanascimento = proprietario.datanascimento.split('T');
      if (tdatanascimento.length > 1){
        tdatanascimento = tdatanascimento[0].split('-');
        datanascimento = tdatanascimento[2]+'/'+tdatanascimento[1]+'/'+tdatanascimento[0];
      }else {
        datanascimento = proprietario.datanascimento;
      }
    }
    this.cadastroProprietario.proprietario = {
      cpf: proprietario.cpf,
      nome: proprietario.nome,
      email: proprietario.email,
      datanascimento: datanascimento,
    };
  }

  setVeiculo(veiculo,ordemservico:any=null) {
    if (!veiculo) return;
    var quilometragem = '';
    if (ordemservico) {
      quilometragem = ordemservico.quilometragem;
    }else {
      quilometragem = veiculo.quilometragem;
    }

    this.cadastroProprietario.veiculo = {
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      placa:veiculo.placa,
      ano: veiculo.ano,
      anomodelo:veiculo.anomodelo,
      quilometragem: quilometragem
    }
  }
  setOrdemservicoid(ordemservicoid) {
    this.ordemservicoid = ordemservicoid;
  }

  setServicosRealizado(servicosRealizado) {
    this.cadastroProprietario.servicosRealizado = servicosRealizado;
  }

  setFinalizar(finalizar:boolean){
    this.finalizar = finalizar;
  }

  getProprietario() {
    return this.cadastroProprietario.proprietario;
  }

  getVeiculo() {
    return this.cadastroProprietario.veiculo;
  }

  getServicosRealizado() {
    return this.cadastroProprietario.servicosRealizado;
  }

  inativaOrdemServico(){
    this.createAuthenticationHeader();
    let oficina = {
      ordemservicoid:this.ordemservicoid,
      cpf: this.cadastroProprietario.proprietario.cpf,
      empresaid: this.empresaid,
    };
    return this.http
      .post(this.domain + "ordemservico/deletar", oficina, this.options)
      .map(res => res.json());
  }

  atualizarDados() {
    this.createAuthenticationHeader();
    console.log("ordem servico id");
    console.log(this.ordemservicoid);

    let oficina = {
      ordemservicoid:this.ordemservicoid,
      marca: this.cadastroProprietario.veiculo.marca,
      modelo: this.cadastroProprietario.veiculo.modelo,
      placa: this.cadastroProprietario.veiculo.placa,
      ano: this.cadastroProprietario.veiculo.ano,
      anomodelo: this.cadastroProprietario.veiculo.anomodelo,
      quilometragem: this.cadastroProprietario.veiculo.quilometragem,
      cpf: this.cadastroProprietario.proprietario.cpf,
      nome: this.cadastroProprietario.proprietario.nome,
      email: this.cadastroProprietario.proprietario.email,
      datanascimento: this.cadastroProprietario.proprietario.datanascimento,
      empresaid: this.empresaid,
      servicorealizado: this.cadastroProprietario.servicosRealizado,
      finalizar:this.finalizar
    };
    return this.http
      .post(this.domain + "ordemservico/cadastra", oficina, this.options)
      .map(res => res.json());
  }

  //TODO:pesquisa de placa.
  pesquisaVeiculo(placa) {
    this.createAuthenticationHeader();
    return this.http
      .get(this.domain + "ordemservico/placa/" + placa, this.options)
      .map(res => res.json());
  }

  getSurvey(ordemservicoid) {
    this.createAuthenticationHeader();
    return this.http
      .get(
        this.domain + "ordemservico/getAvaliacao/" + ordemservicoid,
        this.options
      )
      .map(res => res.json());
  }

  getTodosVeiculos() {
    this.createAuthenticationHeader();
    const path =
      this.domain +
      "ordemservico/getAllOrdemServico/" +
      this.empresaid +
      "/" +
      this.usuarioid;
    return this.http.get(path, this.options).map(res => res.json());
  }

  getAtendimento(ordemservicoid) {
    this.createAuthenticationHeader();
    let path =
      this.domain +
      "ordemservico/getOrdemservico/" +
      ordemservicoid +
      "/" +
      this.empresaid;
    return this.http.get(path, this.options).map(res => res.json());
  }

  enviaQuestionario(respostas) {
    return this.http
      .post(
        this.domain + "ordemservico/salvarAvaliacao",
        respostas,
        this.options
      )
      .map(res => res.json());
  }
}
