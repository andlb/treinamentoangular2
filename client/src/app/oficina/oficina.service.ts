import { EmpresaService } from './../cadastro/empresa/empresa.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './../autenticar/auth.service';
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from './../../environments/environment';
import { Subject } from "rxjs/Subject";
import { ErroMessage } from './../share/erro.model';

@Injectable()
export class OficinaService implements OnDestroy {

  options;
  domain = environment.domain;

  empresaid;
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
        anoModelo : String
    },
    servicosRealizar: [{}],
    servicosRealizado: [{}]
  };

  constructor(
    private authService: AuthService,
    private empresaService:EmpresaService,
    private http: Http
  ) {
    authService.loadToken();
    let usuario = JSON.parse(authService.usuarioToken);
    console.log(usuario.empresa);
    this.empresaid = usuario.empresa
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

  getProprietario() {
    return this.cadastroProprietario.proprietario;
  }

  getVeiculo() {
    return this.cadastroProprietario.veiculo;
  }
  atualizarDados() {
    this.createAuthenticationHeader();

    let oficina = {
        marca : this.cadastroProprietario.veiculo.marca,
        modelo : this.cadastroProprietario.veiculo.modelo,
        placa : this.cadastroProprietario.veiculo.placa,
        ano : this.cadastroProprietario.veiculo.ano,
        anoModelo : this.cadastroProprietario.veiculo.anoModelo,
        cpf:this.cadastroProprietario.proprietario.cpf,
        nome:this.cadastroProprietario.proprietario.nome,
        email:this.cadastroProprietario.proprietario.email,
        dtnascimento:this.cadastroProprietario.proprietario.dtnascimento,
    }
    return this.http.post(this.domain + 'oficina/updateOficina', oficina, this.options).map(res => res.json());
  }

  ngOnDestroy(): void {
    console.log("saiu da oficina");
  }

}
