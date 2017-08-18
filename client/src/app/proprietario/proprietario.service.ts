
import { Http, Headers, RequestOptions } from "@angular/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { AuthService } from "./../autenticar/auth.service";
import { ErroMessage } from "./../share/erro.model";
import { EmpresaService } from "./../cadastro/empresa/empresa.service";
import { environment } from "./../../environments/environment";


@Injectable()
export class ProprietarioService {
  options;
  domain = environment.domain;
  proprietarioid;
  usuarioid;

  constructor(
    private authService: AuthService,
    private empresaService: EmpresaService,
    private http: Http
  ) {
  }

  ////servicos/:proprietarioid
  createAuthenticationHeader() {
    this.authService.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        "Content-Type": "application/json",
        authorization: this.authService.authToken
      })
    });
  }

  getDadosProprietario(proprietarioid) {
    this.createAuthenticationHeader();
    return this.http
      .get(this.domain + "proprietario/servicos/" + proprietarioid, this.options)
      .map(res => res.json());
  }

  getDadosVeiculo(veiculoid) {
    this.createAuthenticationHeader();
    return this.http
      .get(this.domain + "proprietario/getveiculo/" + veiculoid, this.options)
      .map(res => res.json());
  }

  enviarDadosVeiculo(veiculo){
    console.log(veiculo);
    this.createAuthenticationHeader();
    return this.http
      .post(this.domain + "proprietario/salvarVeiculo", veiculo, this.options)
      .map(res => res.json());
  }

}
