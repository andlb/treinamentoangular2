import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from './../../environments/environment';

@Injectable()
export class AuthService {
  private usuario;
  empresaChanged = new Subject();
  domain = environment.domain;
  authToken;
  usuarioToken;
  options;
  dadosAtivo = "active";
  usuarioId;
  usuarioNome;
  empresaId;
  empresaNome;
  constructor(
    private http: Http
  ) { }

  registerUser(usuario){
    return this.http.post(this.domain+'authentication/register',usuario).map(res => res.json());
  }

  checkEmailUsuario(email){
    return this.http.get(this.domain+'authentication/checkEmailUsuario/'+email).map(res => res.json());
  }

  login(usuario){
    return this.http.post(this.domain+'authentication/login',usuario).map(res => res.json());
  }

  getMeuUsuario() {
    this.createAuthenticationHeader();
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    var usuarioid = usuario.usuarioid;
    return this.http.get(this.domain+'authentication/getUsuario/'+usuarioid, this.options).map(res => res.json());
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
    this.usuarioToken = localStorage.getItem('usuario');
  }

  logout(){
    this.authToken = null;
    this.usuarioToken = null;
    localStorage.clear();
    this.empresaChanged.next('empresaalterada');
  }
  //verifica se o toke é invalido
  verTokenValido(token){
    if (token) {
      this.logout();
      return false;
    }
    return true;
  }
  storeUserData(token,usuario){
    localStorage.setItem('token',token);
    localStorage.setItem('usuario',JSON.stringify(usuario));
    this.authToken = token;
    this.usuarioToken = usuario;
    this.usuarioId = usuario._id;
    if (usuario.empresa) {
      this.empresaId = usuario.empresa._id;
      this.empresaNome = usuario.empresa.nomefantasia;
    }
    this.empresaChanged.next('empresaalterada');
  }

  getUsuarioIdFromStorage(){
    var usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      return usuario.usuarioid;
    }
    return null;
  }

  getEmpresaFromStorage() {
    var usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      if (usuario.empresa) {
        this.empresaId = usuario.empresa._id;
        this.empresaNome = usuario.empresa.nomefantasia;
      }
    }
    return {empresaid:this.empresaId, empresanome:this.empresaNome};
  }

  getUsuarioNome(){
    var usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      this.usuarioNome = usuario.usuarionome;
      return this.usuarioNome;
    }
    return null;
  }

  loggedIn(){
    return tokenNotExpired();
  }

  atualizaUsuario(usuario) {
    this.createAuthenticationHeader();
    return this.http.post(this.domain+'authentication/editProfile',usuario,this.options).map(res => res.json());
  }

  enviarEmailSenha(senha){
    return this.http.post(this.domain+'authentication/esquecisenha',senha).map(res => res.json());
  }

  alterarSenha(usuario) {
    return this.http.post(this.domain+'authentication/alterarsenha',usuario).map(res => res.json());
  }


}
