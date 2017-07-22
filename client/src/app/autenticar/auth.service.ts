import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from './../../environments/environment';

@Injectable()
export class AuthService {

  domain = environment.domain;  
  authToken;
  user;
  options;

  constructor(
    private http: Http
  ) { }
  
  registerUser(user){    
    return this.http.post(this.domain+'/authentication/register',user).map(res => res.json());    
  }
  
  checkEmail(email){
    return this.http.get(this.domain+'/authentication/checkEmail/'+email).map(res => res.json());    
  }

  login(user){
    return this.http.post(this.domain+'/authentication/login',user).map(res => res.json());    
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
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token,user){
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  
  loggedIn(){
    return tokenNotExpired();
  }



}
