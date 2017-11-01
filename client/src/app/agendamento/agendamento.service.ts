import { Http, Headers, RequestOptions } from "@angular/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./../autenticar/auth.service";
import { environment } from "./../../environments/environment";

@Injectable()
export class AgendamentoService {
  options;
  domain = environment.domain;
  constructor(private authService: AuthService, private http: Http) {}

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

  agendarPlaca(placa) {
    let agendamento = {
      placa:placa
    };
    this.createAuthenticationHeader();
    return this.http
      .post(this.domain + "agendamento/placa", agendamento)
      .map(res => res.json());
  }

}
