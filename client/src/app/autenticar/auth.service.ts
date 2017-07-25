import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from './../../environments/environment';

@Injectable()
export class AuthService {

  domain = environment.domain;
  authToken;
  usuario;
  options;

  constructor(
    private http: Http
  ) { }

  registerUser(usuario){
    return this.http.post(this.domain+'/authentication/register',usuario).map(res => res.json());
  }

  checkEmail(email){
    return this.http.get(this.domain+'/authentication/checkEmail/'+email).map(res => res.json());
  }

  login(usuario){
    return this.http.post(this.domain+'/authentication/login',usuario).map(res => res.json());
  }
  createAuthenticationHeader(){
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type':'application/json',
        'authorization':this.authToken
      })
    });
  }

  loadToken(){
    this.authToken = localStorage.getItem('token');
  }

  logout(){
    this.authToken = null;
    this.usuario = null;
    localStorage.clear();
  }

  storeUserData(token,usuario){
    localStorage.setItem('token',token);
    localStorage.setItem('usuario',JSON.stringify(usuario));
    this.authToken = token;
    this.usuario = usuario;
  }

  loggedIn(){

    return tokenNotExpired();
  }

}
