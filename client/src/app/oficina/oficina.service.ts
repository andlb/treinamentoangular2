import { EmpresaService } from './../cadastro/empresa/empresa.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './../autenticar/auth.service';
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from './../../environments/environment';
import { Subject } from "rxjs/Subject";
import { ErroMessage } from './../share/erro.model';

@Injectable()
export class OficinaService {

  options;
  domain = environment.domain;

  empresaid;
  usuarioid;
  cadastroProprietario = {
    proprietario: {
      cpf:String,
      nome:String,
      email:String,
      dtnascimento:String
    },
    veiculo: {
        marca : String,
        modelo: String,
        placa: String,
        ano : String,
        anomodelo : String,
        quilometragem: String
    },
    servicosRealizar: [{}],
    servicosRealizado: [{}]
  };

  constructor(
    private authService: AuthService,
    private empresaService:EmpresaService,
    private http: Http
  ) {
    this.authService.loadToken();
    let usuario = JSON.parse(this.authService.usuarioToken);
    this.empresaid = usuario.empresa;
    this.usuarioid = usuario.usuarioid;
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

  setProprietario(proprietario) {
    this.cadastroProprietario.proprietario = proprietario;
  }

  setVeiculo(veiculo) {
    this.cadastroProprietario.veiculo = veiculo;
  }

  setServicosRealizar(servicosRealiar) {
    this.cadastroProprietario.servicosRealizar = servicosRealiar;
  }

  getProprietario() {
    return this.cadastroProprietario.proprietario;
  }

  getVeiculo() {
    return this.cadastroProprietario.veiculo;
  }

  getServicosRealizar(){
    return this.cadastroProprietario.servicosRealizar;
  }


  atualizarDados() {
    this.createAuthenticationHeader();
    let oficina = {
        marca : this.cadastroProprietario.veiculo.marca,
        modelo : this.cadastroProprietario.veiculo.modelo,
        placa : this.cadastroProprietario.veiculo.placa,
        ano : this.cadastroProprietario.veiculo.ano,
        anomodelo : this.cadastroProprietario.veiculo.anomodelo,
        quilometragem : this.cadastroProprietario.veiculo.quilometragem,
        cpf:this.cadastroProprietario.proprietario.cpf,
        nome:this.cadastroProprietario.proprietario.nome,
        email:this.cadastroProprietario.proprietario.email,
        dtnascimento:this.cadastroProprietario.proprietario.dtnascimento,
    }
    return this.http.post(this.domain + 'oficina/updateOficina', oficina, this.options).map(res => res.json());
  }

  //TODO:pesquisa de placa.
  pesquisaVeiculo(placa){
    this.createAuthenticationHeader();
    return this.http.get(this.domain + 'oficina/pesquisaplaca/'+placa, this.options).map(res => res.json());
  }

  getTodosVeiculos(){
    this.createAuthenticationHeader();
    console.log('empresaid ' + this.empresaid + ' usuarioid ' + this.usuarioid );
    return this.http.get(this.domain + 'oficina/getTodosVeiculos/'+this.empresaid+"/"+this.usuarioid, this.options).map(res => res.json());

  }

  getAtendimento(atendimentoid){
    this.createAuthenticationHeader();

  }


}
