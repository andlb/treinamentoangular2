import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './../../autenticar/auth.service';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable()
export class EmpresaService {
  options;
  empresa;
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

}
